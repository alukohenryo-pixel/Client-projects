/* ==========================================
Testimonials Slider
========================================== */

const track = document.querySelector(".testimonial-track");

const next = document.querySelector(".next");

const prev = document.querySelector(".prev");

let current = 0;

const cards = document.querySelectorAll(".testimonial-card");

function updateSlider(){

    const width = cards[0].offsetWidth + 30;

    track.style.transform =
        `translateX(-${current * width}px)`;

}

next?.addEventListener("click",()=>{

    if(current < cards.length - 1){

        current++;

    }else{

        current = 0;

    }

    updateSlider();

});

prev?.addEventListener("click",()=>{

    if(current > 0){

        current--;

    }else{

        current = cards.length - 1;

    }

    updateSlider();

});

window.addEventListener("resize",updateSlider);

setInterval(()=>{

    if(current < cards.length - 1){

        current++;

    }else{

        current = 0;

    }

    updateSlider();

},5000);