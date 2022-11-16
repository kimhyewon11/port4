let listdata =[
    {
        src:"/img/meg2.jpg",
        date:"Wallpaper Uk,2019.01",
        title:"A strong cast of sharp shelves,scholastic skincare and graphic wallpaper",
        context:"Eath Library skincare boutique in Seoul is inspired by Korea's traditional apothecaries"
    },
    {
        src:"/img/meg3.jpg",
        date:"Design Anthology 2019 Asia Edition, Issue 22",
        title:"A Skincare Boutique for the Modern Traditionalist",
        context:"Teo Yang Studio redefines Korean traditions in EATH Library, where centuries-old medicines are reinterprted as contemporary skincare products"
    },
    {
        src:"/img/meg4.jpg",
        date:"Magazine B,2021.01",
        title:"THE SHOP",
        context:"SPIRIT OF THE TIMES,모던 한국 뷰티의 독보적 입지"
    },
    {
        src:"/img/meg5.jpg",
        date:"marie claire,2019.11",
        title:"남다른 한국형 스킨 케이",
        context:"한방 성분을 현대적으로 담아낸 K-뷰티, 이스 라이브러리. 지난 11월 26일 런칭한 이 제품에는 피부를 놀랍게 바꿔준 한방차를 발견한 뒤, 3년간의 기다림과 노력이 온전히 담겨있었다. 이스 라이브러리 양태오 대표와의 8문 8답."
    },
    {
        src:"/img/meg6.jpg",
        date:"marie claire,2019.01",
        title:"Let Me Dream More",
        context:"베갯잇에 내려앉은 바닐라 향기를 맡으며 잠에서 깬다. 책장을 넘기다 묵직한 송진 내음이 가득한 숲에서 사색한다. 석양을 마주한 채 흐드러진 프리지어 꽃밭에 발을 담근다. 고요한 아파트를 유영하며 감각을 일깨우는 향기들"
    }
]

let rightwrap = document.querySelector(".rightwrap");
let wrap = "";

listdata.forEach((e)=>{
    wrap += 
    `
    <div class="wrap">
            <img src="${e.src}">
            <p class="date">${e.date}</p>
            <h6>${e.title}</h6>
            <p class="context">${e.context}</p>
        </div>
    `
});

rightwrap.innerHTML = wrap;
