/* ==========================================================
   CoinsWise Testimonials Carousel
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".testimonial-wrapper");
    const track = document.querySelector(".testimonial-track");
    const cards = document.querySelectorAll(".testimonial-card");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    if (!wrapper || !track || cards.length === 0) return;

    let current = 0;
    let autoplay;

    function visibleCards() {

        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;

    }

    function cardWidth() {

        const gap =
            parseFloat(getComputedStyle(track).gap);

        return cards[0].offsetWidth + gap;

    }

    function updateSlider(animated = true) {

        if (window.innerWidth <= 768) {

            track.style.transform = "none";
            return;

        }

        track.style.transition = animated
            ? "transform .55s ease"
            : "none";

        track.style.transform =
            `translateX(-${current * cardWidth()}px)`;

    }

    function nextSlide() {

        current++;

        if (current > cards.length - visibleCards()) {

            current = 0;

        }

        updateSlider();

    }

    function prevSlide() {

        current--;

        if (current < 0) {

            current =
                cards.length - visibleCards();

        }

        updateSlider();

    }

    function startAutoplay() {

        stopAutoplay();

        autoplay = setInterval(nextSlide, 5000);

    }

    function stopAutoplay() {

        clearInterval(autoplay);

    }

    next?.addEventListener("click", () => {

        nextSlide();

        startAutoplay();

    });

    prev?.addEventListener("click", () => {

        prevSlide();

        startAutoplay();

    });

    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", startAutoplay);

    window.addEventListener("resize", () => {

        if (current > cards.length - visibleCards()) {

            current = 0;

        }

        updateSlider(false);

    });

    updateSlider(false);

    startAutoplay();

});