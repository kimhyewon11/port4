const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const moment = require("moment");
const port = process.env.PORT || 8000;
const multer  = require('multer') ; // 파일업로드 라이브러리 multer

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { render } = require("ejs");
const app = express();


app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({secret : 'secret', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


let db;

MongoClient.connect("mongodb+srv://admin:qwer1234@testdb.mopkvcj.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("port4");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});


passport.use(new LocalStrategy({
    usernameField: 'adminId', // 태그 네임값
    passwordField: 'adminPass',
    session: true,
    passReqToCallback: false,
  }, function (id, pass, done) {
                                 //작명변수//태그 네임값
    db.collection('user').findOne({ adminId: id }, function (err, result) {
      if (err) return done(err)
  
      if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
      if (pass == result.adminPass) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번이 틀렸습니다' })
      }
    })
  }));

    //처음 로그인 했을 시 해당 사용자의 아이디를 기반으로 세션을 생성함
  //  req.user
  passport.serializeUser(function (user, done) {
    done(null, user.adminId) //서버에다가 세션만들어줘 -> 사용자 웹브라우저에서는 쿠키를 만들어줘
  });
  
  // 로그인을 한 후 다른 페이지들을 접근할 시 생성된 세션에 있는 회원정보 데이터를 보내주는 처리
  // 그전에 데이터베이스 있는 아이디와 세션에 있는 회원정보중에 아이디랑 매칭되는지 찾아주는 작업
  passport.deserializeUser(function (adminId, done) {
      db.collection('user').findOne({adminId:adminId }, function (err,result) {
        done(null, result);
      })
  }); 


//파일첨부

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8') )
      }
    })
const upload = multer({ storage: storage })


//관리자 화면 로그인 페이지 
app.get("/admin",(req,res)=>{
    res.render("admin_login",{userdata:req.user}); //admin_login.ejs 파일로 응답
});

//관리자 화면 로그인
app.post("/login",passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
  res.redirect("admin/prdlist");
  //로그인 성공시 관리자 상품등록 페이지로 이동 
});

//로그인 실패시 
app.get("/fail",(req,res)=>{
    res.send("로그인 실패")
  });

//로그아웃
app.get("/logout",function(req,res){
    req.session.destroy(function(err){
        res.clearCookie("connect.sid");
        res.redirect("/");
    })
});
  

//관리자 상품 등록
app.get("/admin/prdlist",function(req,res){
    db.collection("prdlist").find({}).toArray(function(err,result){
        res.render("admin_prdlist",{prdData:result,userData:req.user,userdata:req.user});
    })
});



//상품을 db 에 넣기 
app.post("/add/prdlist",upload.single('thumbnail'),(req,res)=>{
    if(req.file){
        fileTest=req.file.originalname;
    }
    else { 
        fileTest=null;
    }
    db.collection("count").findOne({name:"상품등록"},(err,result)=>{
        db.collection("prdlist").insertOne({
            num:result.prdCount+1,
            name:req.body.name,
            thumbnail:fileTest,
            category:req.body.category,
            price:req.body.price,
            kind:req.body.kind
        },(err,result)=>{
            db.collection("count").updateOne({name:"상품등록"},{$inc:{prdCount:1}},(err,result)=>{
                res.redirect("/admin/prdlist");
            })
        })
    })
})

//관리자 매장등록 페이지 경로
app.get("/admin/storelist",(req,res)=>{
    //모든 매장리스트 다 보여줌
    db.collection("storelist").find({}).toArray((err,result)=>{
        res.render("admin_store",{storeData:result,userdata:req.user});
    })
});

//매장등록페이지에서 전송한 값 데이터베이스에 삽입
app.post("/addstore",upload.single('thumbnail'),(req,res)=>{
    db.collection("count").findOne({name:"매장등록"},(err,result1)=>{
        if(req.file){
            fileTest1=req.file.originalname;
        }
        else { 
            fileTest1=null;
        }
        db.collection("storelist").insertOne({
            num:result1.storeCount + 1,
            name:req.body.name,
            sido:req.body.city1,
            sigugun:req.body.city2,
            address:req.body.detail,
            phone:req.body.phone,
            time:req.body.time,
            context:req.body.context,
            thumbnail:fileTest1,
        },(err,result)=>{
            db.collection("count").updateOne({name:"매장등록"},{$inc:{storeCount:1}},(err,result)=>{
                res.redirect("/admin/storelist"); //매장등록 페이지로 이동
            });
        })
    });
});




//메인화면
app.get("/",function(req,res){
    res.render("index")
});

//브랜드 소개
app.get("/brand",function(req,res){
    res.render("brand");
});


//제품 리스트
app.get("/mag",function(req,res){
    res.render("magazine");
});

//all 메뉴 페이지 
app.get("/menu/all",(req,res)=>{
    db.collection("prdlist").find().toArray((err,result)=>{
        res.render("menu",{prdData:result});
    })
})

//facial 메뉴 페이지 
app.get("/menu/facial",(req,res)=>{
    db.collection("prdlist").find({category:"Facial"}).toArray((err,result)=>{
        res.render("menu",{prdData:result});
    })
})
//hand 메뉴 페이지 
app.get("/menu/hand",(req,res)=>{
    db.collection("prdlist").find({category:"Hand"}).toArray((err,result)=>{
        res.render("menu",{prdData:result});
    })
})
//life 메뉴 페이지 
app.get("/menu/life",(req,res)=>{
    db.collection("prdlist").find({category:"Life Style"}).toArray((err,result)=>{
        res.render("menu",{prdData:result});
    })
})

//매장 안내페이지
app.get("/store",(req,res)=>{
    db.collection("storelist").find({}).toArray((err,result)=>{
        res.render("store",{storeData:result});
    })
});

//매장 지역 검색 결과 페이지
app.get("/search/storelocal",(req,res)=>{
    //시/도는 선택했고 군구는 선택을 안했을 때
    if(req.query.city1 !== "" && req.query.city2 === ""){
        db.collection("storelist").find({sido:req.query.city1}).toArray((err,result)=>{
            res.render("store",{storeData:result});
        });
    }
    //시도 선택 및 군구 선택 했을 때
    else if(req.query.city1 !== "" && req.query.city2 !== ""){
        db.collection("storelist").find({sido:req.query.city1,sigugun:req.query.city2}).toArray((err,result)=>{
            res.render("store",{storeData:result});
        });
    }
    //둘다 선택 안했을 경우
    else {
        res.redirect("/store");
    }
});

//매장명 검색 결과 페이지
app.get("/search/storename",(req,res)=>{
    //atlas사이트에서 제공하는 검색기능 코드
    let search = [
        {
          $search: {
            index: "store_search",
            text: {
              query: req.query.name, //store에서 입력한 매장명 데이터
              path: "name"// storelist콜렉션에서 name 프로퍼티
            }
          }
        }
      ]

    //aggregate() 사용해서 storelist 콜렉션에서 데이터 꺼내옴
    //검색어 입력시
    if(req.query.name !== "") {
        db.collection("storelist").aggregate(search).toArray((err,result)=>{
            res.render("store",{storeData:result});
        })
    }
    //검색어 미입력시
    else{
        res.redirect("/store");
    }
})

