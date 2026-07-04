/* ==========================================================
   CoinsWise Navigation
   Developed by GBBM Digital Solutions
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       DOM Elements
    ========================================== */
    
    const header = document.getElementById("header");
    
    const menuToggle = document.querySelector(".menu-toggle");
    
    const mobileMenu = document.querySelector(".mobile-menu");
    
    const mobileOverlay = document.querySelector(".mobile-overlay");
    
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    
    /* ==========================================
       Sticky Header
    ========================================== */
    
    function updateHeader() {
        
        if (!header) return;
        
        header.classList.toggle("scrolled", window.scrollY > 40);
        
    }
    
    window.addEventListener("scroll", updateHeader);
    
    updateHeader();
    
    /* ==========================================
       Mobile Menu Controls
    ========================================== */
    
    function openMenu() {
        
        if (!menuToggle || !mobileMenu) return;
        
        mobileMenu.classList.add("active");
        
        menuToggle.classList.add("active");
        
        document.body.classList.add("menu-open");
        
        menuToggle.setAttribute("aria-expanded", "true");
        
        if (mobileOverlay) {
            
            mobileOverlay.classList.add("active");
            
        }
        
    }
    
    function closeMenu() {
        
        if (!menuToggle || !mobileMenu) return;
        
        mobileMenu.classList.remove("active");
        
        menuToggle.classList.remove("active");
        
        document.body.classList.remove("menu-open");
        
        menuToggle.setAttribute("aria-expanded", "false");
        
        if (mobileOverlay) {
            
            mobileOverlay.classList.remove("active");
            
        }
        
    }
    
    function toggleMenu() {
        
        if (!mobileMenu) return;
        
        if (mobileMenu.classList.contains("active")) {
            
            closeMenu();
            
        } else {
            
            openMenu();
            
        }
        
    }
    
    /* ==========================================
       Toggle Button
    ========================================== */
    
    if (menuToggle) {
        
        menuToggle.addEventListener("click", toggleMenu);
        
    }
    
    /* ==========================================
       Overlay Click
    ========================================== */
    
    if (mobileOverlay) {
        
        mobileOverlay.addEventListener("click", closeMenu);
        
    }
    
    /* ==========================================
       Mobile Links
    ========================================== */
    
    mobileLinks.forEach((link) => {
        
        link.addEventListener("click", closeMenu);
        
    });
    
    /* ==========================================
       Escape Key
    ========================================== */
    
    document.addEventListener("keydown", (event) => {
        
        if (event.key === "Escape") {
            
            closeMenu();
            
        }
        
    });
    
    /* ==========================================
       Desktop Resize Fix
    ========================================== */
    
    window.addEventListener("resize", () => {
        
        if (window.innerWidth > 992) {
            
            closeMenu();
            
        }
        
    });
    
    /* ==========================================
       Active Navigation Links
    ========================================== */
    
    const sections = document.querySelectorAll("section[id]");
    
    function highlightActiveLink() {
        
        const scrollY = window.scrollY + 120;
        
        sections.forEach((section) => {
            
            const top = section.offsetTop;
            
            const height = section.offsetHeight;
            
            const id = section.getAttribute("id");
            
            const link = document.querySelector(
                
                `.nav-link[href="#${id}"]`
                
            );
            
            if (!link) return;
            
            if (
                
                scrollY >= top &&
                
                scrollY < top + height
                
            ) {
                
                document
                    
                    .querySelectorAll(".nav-link")
                    
                    .forEach((item) => {
                        
                        item.classList.remove("active");
                        
                    });
                
                link.classList.add("active");
                
            }
            
        });
        
    }
    
    window.addEventListener("scroll", highlightActiveLink);
    
    highlightActiveLink();
    
});