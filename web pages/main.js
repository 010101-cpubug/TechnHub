document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    let currentSlide = 0;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    if (slides.length > 0 && prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });

        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        }, 6000);

        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slide.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
                    showSlide(currentSlide);
                }, 6000);
            });
        });
    }

    if (document.querySelector('.contact-form')) {
        const contactForm = document.querySelector('.contact-form');
        const inputs = contactForm.querySelectorAll('input, textarea');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4d4d';
                } else {
                    input.style.borderColor = '#2d2d2d';
                }
            });
            if (isValid) {
                const formData = new FormData(contactForm);
                console.log('Form submitted:', Object.fromEntries(formData));
                contactForm.reset();
                alert('Thank you for your message! We will get back to you soon.');
            } else {
                alert('Please fill out all required fields.');
            }
        });
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#2d2d2d';
                }
            });
        });
    }

    if (document.querySelector('.pricing-plans')) {
        const pricingButtons = document.querySelectorAll('.pricing-plan .cta-button');
        pricingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const plan = button.closest('.pricing-plan').querySelector('h3').textContent;
                localStorage.setItem('selectedPlan', plan);
                window.location.href = button.getAttribute('href');
            });
        });
    }

    if (document.querySelector('.blog-post')) {
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach(post => {
            post.addEventListener('click', () => {
                const title = post.querySelector('h3').textContent;
                console.log(`Blog post clicked: ${title}`);
            });
        });
    }

    if (document.querySelector('.testimonial-item')) {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        testimonialItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-4px)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }

    if (document.querySelector('.service-item')) {
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.addEventListener('click', () => {
                const service = item.querySelector('h3').textContent;
                console.log(`Service clicked: ${service}`);
            });
        });
    }
});