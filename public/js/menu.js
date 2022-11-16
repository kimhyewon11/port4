let currentPath = window.location.pathname;
let menu = document.querySelectorAll(".m_center .menu li");
let title1 = document.querySelector(".address .title");
let context1 =  document.querySelector(".address .context");

let leftText = [
    {
        title:"ALL",
        context:"페이셜 케어 제품은 이스라이브러리 특허 성분이 함유되어 피부를 근본적으로 강화시켜줍니다."
    },
    {
        title:"Facial",
        context:"페이셜 케어 제품은 이스라이브러리 특허 성분이 함유되어 피부를 근본적으로 강화시켜줍니다."
    },
    {
        title:"Hand",
        context:"핸드 케어 제품은 영양을 공급할 뿐만 아니라 향을 통해 감각적인 즐거움을 선사합니다."
    },
    {
        title:"Lifestyle",
        context:"동양의 정취와 오래된 시간들에 영감을 받아 제조된 세 가지 룸스프레이는 공간에 특별함을 더해줍니다."
    }
]

menu.forEach((item,index)=>{
    let menuChild = item.querySelector("a").getAttribute("href");
    if(currentPath === menuChild){
        item.classList.add("on");
        title1.innerHTML = leftText[index].title;
        context1.innerHTML = leftText[index].context;
    }
});
