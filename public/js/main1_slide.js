      //cont1
      const cir =document.querySelectorAll(".circlebtn > .cir");
      const view = document.querySelector(".view");
      const views = document.querySelectorAll(" .s_box");
      console.log(cir)
     
      
      let count=0;
      let slides = setInterval(function(){
          nextSlides();
          slideStart();
      },3000);



      view.addEventListener("mouseenter",function(){
          clearInterval(slides)
      });

      view.addEventListener("mouseleave",function(){
          slides = setInterval(function(){
          nextSlides();
          slideStart();
      },3000);
      });



      //슬라이드 넘버 
      function nextSlides(){
          if(count == cir.length -1){
              count = 0;
          }
          else{
              count++;
          }
      }


      //슬라이드 나타나고 사라짐 
      function slideStart(){
          for(let i = 0; i < cir.length ;i++){
              cir[i].classList.remove("on");
              views[i].style.opacity=0;
              views[i].style.zIndex=4;
          }
          cir[count].classList.add("on");
          views[count].style.opacity=1;
          views[count].style.zIndex=4;
      }