document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    const dotsContainer = document.querySelector('.carousel-dots');

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        showSlide(currentSlide);
        updateDots();
    }

    function showSlide(index) {
        document.querySelector('.carousel-slides').style.transform = 
            `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        updateDots();
    }

    setInterval(nextSlide, 5000);
    updateDots();

    // Step Animations
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                step.classList.add('visible');
                animateProgressCircle(step.querySelector('.circle-progress'));
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.modern-step').forEach(step => {
        stepObserver.observe(step);

        // Hover animation logic
        step.addEventListener('mouseenter', () => {
            if (step.classList.contains('visible')) {
                const circle = step.querySelector('.circle-progress');
                resetProgressCircle(circle);
                setTimeout(() => animateProgressCircle(circle), 50);
            }
        });
    });

    function animateProgressCircle(circle) {
        circle.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        circle.style.strokeDashoffset = '0';
    }

    function resetProgressCircle(circle) {
        circle.style.transition = 'none';
        circle.style.strokeDashoffset = '283';
    }

    // Enhanced Intersection Observer for Cards and CTA
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Card-specific animations
                if(entry.target.classList.contains('card')) {
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                }

                // CTA-specific animations
                if(entry.target.classList.contains('cta')) {
                    entry.target.querySelector('h2').style.transform = 'translateY(0)';
                }
            }
        });
    }, { 
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        elementObserver.observe(el);
    });

    // Enhanced Them System
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    function applyTheme(isDark) {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌞';
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        applyTheme(isDark);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = !htmlElement.hasAttribute('data-theme');
        applyTheme(isDark);
    });

    initializeTheme();


    lazyImages.forEach(img => {
        img.dataset.src = img.style.backgroundImage;
        img.style.backgroundImage = 'none';
        imgObserver.observe(img);
    });

    // Steps Title Interactions
    document.querySelectorAll('.steps .section-title').forEach(title => {
        // Reset animation on mouse leave
        title.addEventListener('mouseleave', () => {
            title.style.backgroundPosition = '0% 50%';
        });

        // Mobile touch support
        title.addEventListener('touchstart', () => {
            title.classList.add('hover-effect');
            setTimeout(() => title.classList.remove('hover-effect'), 1000);
        });
    });
});