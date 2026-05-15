// =============================================
// SERVICES PAGE — services_script.js
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // 1. NAVBAR — shrink on scroll
    // =============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.height = '65px';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)';
        } else {
            navbar.style.height = '80px';
            navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        }
    });


    // =============================================
    // 2. SCROLL REVEAL — fade in sections
    // =============================================
    const revealElements = document.querySelectorAll(
        '.service-card, .process-step, .service-hero, .service-cta'
    );

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
        el.classList.add('hidden');
        revealObserver.observe(el);
    });


    // =============================================
    // 3. SERVICE CARDS — staggered animation delay
    // =============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.08) + 's';
    });

    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(function (step, index) {
        step.style.transitionDelay = (index * 0.12) + 's';
    });


    // =============================================
    // 4. ACTIVE NAV LINK — highlight current page
    // =============================================
    const navLinks = document.querySelectorAll('.navbar .links a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });


    // =============================================
    // 5. SMOOTH SCROLL — for any anchor links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // =============================================
    // 6. NEWSLETTER — footer submit handler
    // =============================================
    function handleNewsletterSubmit() {
        const input = document.getElementById('footer-email');
        if (!input) return;
        const email = input.value.trim();
        if (!email || !email.includes('@')) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        showToast('Thank you for subscribing!', 'success');
        input.value = '';
    }

    const newsletterBtn = document.querySelector('.newsletter-form button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubmit);
    }


    // =============================================
    // 7. TOAST NOTIFICATION — replaces alert()
    // =============================================
    function showToast(message, type) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.textContent = message;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: type === 'success' ? '#1abc9c' : '#e74c3c',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '10px',
            fontSize: '14px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
        });

        document.body.appendChild(toast);

        requestAnimationFrame(function () {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(function () { toast.remove(); }, 300);
        }, 3500);
    }

});


// =============================================
// 8. CSS — inject reveal animation styles
// =============================================
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
        .navbar {
            transition: height 0.3s ease, box-shadow 0.3s ease;
        }
        .navbar .links a.active {
            color: #1abc9c;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
})();