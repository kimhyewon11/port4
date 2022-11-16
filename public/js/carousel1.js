const m3_view = document.querySelector(".m3_view");
const prev = document.querySelector(".prev_btn")
const next = document.querySelector(".next_btn")


let prevChangeMargin ;
let setMargin ; 

let browerSizeCheck = ()=>{
    if(window.matchMedia("screen and (min-width:1601px)").matches){
         //css 반응형 작업시 view의 가로값이 150%
        prevChangeMargin="-50%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin = "-25%"; // 이동 후 원위치되는 수치값
    }
    else if (window.matchMedia("screen and (max-width:1600px) and (min-width:1025px)").matches){
        //css 반응형 작업시 view의 가로값이 166.666666%
        prevChangeMargin="-66.666666%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin = "-33.333333%"; // 이동 후 원위치되는 수치값
    }
    else if  (window.matchMedia("screen and (max-width:1024px) and (min-width:767px)").matches){
         //css 반응형 작업시 view의 가로값이 300%
        prevChangeMargin="-100%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin = "-50%"; // 이동 후 원위치되는 수치값
    }
    else if(window.matchMedia("screen and (max-width:930px)").matches){
         //css 반응형 작업시 view의 가로값이 600%
        prevChangeMargin="-200%"; // 이전버튼 클릭시 이동되는 거리값
        setMargin = "-100%"; // 이동 후 원위치되는 수치값
    }
    m3_view.style.marginLeft = setMargin;
}

window.addEventListener("resize",()=>{
    browerSizeCheck(); // 웹브라우저 창 크기 조절 시 조건문 체크
});
window.addEventListener("load",()=>{
    browerSizeCheck(); //웹브라우저 화면 로딩 후 조건문 체크 
});

next.addEventListener("click",()=>{
    m3_view.style.transition = "all 0.5s";
    m3_view.style.marginLeft = prevChangeMargin;

    let fchild = m3_view.firstElementChild;

    setTimeout(()=>{//7초 뒤에 아래 기능들 실행
        //첫번재 자식요소를 마지막번째로 보내줌
        m3_view.append(fchild);
        //태그 순서 교체 후 원위치
        m3_view.style.transition = "none";
        m3_view.style.marginLeft = setMargin;
        // prev.style.display = "block";
        // next.style.display="block";
    },500);
})

prev.addEventListener("click",()=> {
    m3_view.style.transition = "all 0.5s";
    m3_view.style.marginLeft = "0%";
    // prev.style.display = "none";
    // next.style.display="none";
    //이후버튼 클릭시 마지막번째 자식요소 선택 
    let lchild = m3_view.lastElementChild;

    setTimeout(()=>{//7초 뒤에 아래 기능들 실행
        //첫번재 자식요소를 마지막번째로 보내줌
        m3_view.prepend(lchild);
        //태그 순서 교체 후 원위치
        m3_view.style.transition = "none";
        m3_view.style.marginLeft = setMargin;
        // prev.style.display = "block";
        // next.style.display="block";
    },500);
})