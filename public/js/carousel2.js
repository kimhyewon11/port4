const m5_view = document.querySelector(".m5_view");
const prev1 = document.querySelector(".m5_prev")
const next1 = document.querySelector(".m5_next")


let prevChangeMargin1 ;
let setMargin1 ; 

let browerSizeCheck1 = ()=>{
    if(window.matchMedia("screen and (min-width:1201px)").matches){
         //css 반응형 작업시 view의 가로값이 133.5%
        prevChangeMargin1="-66.666666%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin1= "-33.333333%"; // 이동 후 원위치되는 수치값
    }
    else if (window.matchMedia("screen and (max-width:1200px) and (min-width:931px)").matches){
        //css 반응형 작업시 view의 가로값이 300%
        prevChangeMargin1="-100%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin1 = "-50%"; // 이동 후 원위치되는 수치값
    }
    else if  (window.matchMedia("screen and (max-width:930px)").matches){
         //css 반응형 작업시 view의 가로값이 600%
        prevChangeMargin1="-200%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin1 = "-100%"; // 이동 후 원위치되는 수치값
    }
    m5_view.style.marginLeft = setMargin1;
    

}

window.addEventListener("resize",()=>{
    browerSizeCheck1(); // 웹브라우저 창 크기 조절 시 조건문 체크
});
window.addEventListener("load",()=>{
    browerSizeCheck1(); //웹브라우저 화면 로딩 후 조건문 체크 
});

next1.addEventListener("click",()=>{
    m5_view.style.transition = "all 0.5s";
    m5_view.style.marginLeft = prevChangeMargin1;

    let fchild1 = m5_view.firstElementChild;

    setTimeout(()=>{//7초 뒤에 아래 기능들 실행
        //첫번재 자식요소를 마지막번째로 보내줌
        m5_view.append(fchild1);
        //태그 순서 교체 후 원위치
        m5_view.style.transition = "none";
        m5_view.style.marginLeft = setMargin1;
        // prev.style.display = "block";
        // next.style.display="block";
        console.log(setMargin1)
    },500);
})

prev1.addEventListener("click",()=> {
    m5_view.style.transition = "all 0.5s";
    m5_view.style.marginLeft = "0%";
    // prev.style.display = "none";
    // next.style.display="none";
    //이후버튼 클릭시 마지막번째 자식요소 선택 
    let lchild1 = m5_view.lastElementChild;

    setTimeout(()=>{//7초 뒤에 아래 기능들 실행
        //첫번재 자식요소를 마지막번째로 보내줌
        m5_view.prepend(lchild1);
        //태그 순서 교체 후 원위치
        m5_view.style.transition = "none";
        m5_view.style.marginLeft = setMargin1;
        // prev.style.display = "block";
        // next.style.display="block";
    },500);
})