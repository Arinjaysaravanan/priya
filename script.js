document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Color transition on scroll
    const sections = document.querySelectorAll('section');
    const colors = {
        'hero': '#0A0F2C',     // Deep navy
        'purpose-wrapper': '#1E1E1E',  // Dark gray
        'services-section': '#000000'   // Black
    };

    let currentSection = 'hero';
    let isScrolling = false;

    // Add section observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isScrolling) {
                const sectionId = entry.target.id || entry.target.className.split(' ')[0];
                if (colors[sectionId] && currentSection !== sectionId) {
                    currentSection = sectionId;
                    document.body.style.backgroundColor = colors[sectionId];
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Set initial color
    document.body.style.backgroundColor = colors['hero'];
    // Initialize Swiper
    const servicesSwiper = new Swiper('.services-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        allowTouchMove: true,
        watchSlidesProgress: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }
    });

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('hidden');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
            // Scrolling up
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
});
