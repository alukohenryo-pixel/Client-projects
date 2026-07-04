/* ==========================================
   Animated Counters
========================================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 120;

        function update(){

            current += increment;

            if(current < target){

                counter.textContent =
                Math.floor(current).toLocaleString() + "+";

                requestAnimationFrame(update);

            }

            else{

                counter.textContent =
                target.toLocaleString() + "+";

            }

        }

        update();

        observer.unobserve(counter);

    });

});

counters.forEach(counter=>{

    observer.observe(counter);

});