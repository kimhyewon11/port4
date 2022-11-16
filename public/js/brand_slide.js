
        const view = document.querySelector(".views");
        const bbox = document.querySelectorAll(".b_box")
        
        const prevbtn = document.querySelector(".prev_btn");
        const nextbtn = document.querySelector(".next_btn");

        console.log(view)
        let count=0;

        prevbtn.addEventListener("click",function(){
            prevSlides();
        });

        nextbtn.addEventListener("click",function(){
            nextSlides();
        });

        function nextSlides (){
            if(count == bbox.length -1){
                count = 0;
            }
            else {
                count++
            }
            view.style.marginLeft = -100 * count + "%";
        }

        function prevSlides (){
            if(count == 0){
                count = bbox.length -1;
            }
            else {
                count--;
            }
            view.style.marginLeft = -100 * count + "%";
        }


      
        

        

  