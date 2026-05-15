const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.style.boxShadow  = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.background = '#fff';
        navbar.style.position   = 'sticky';
        navbar.style.top        = '0';
        navbar.style.zIndex     = '1000';
    } else {
        navbar.style.boxShadow = 'none';
    }
});


// ============================================================
//  2. HIGHLIGHT ACTIVE NAVBAR LINK
//  "Contact" stays green since we're on this page
// ============================================================

const navLinks = document.querySelectorAll('.navbar .links a');

navLinks.forEach(function (link) {
    if (link.href === window.location.href) {
        link.style.color      = '#1abc9c';
        link.style.fontWeight = '700';
    }
});


// ============================================================
//  3. CONTACT FORM VALIDATION
//  Your form has: Name | Email | Subject | Message
//  We check each one before allowing submission.
// ============================================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // stop page from refreshing

        // Grab each field by its placeholder text
        const nameInput    = contactForm.querySelector('input[placeholder="Your Name"]');
        const emailInput   = contactForm.querySelector('input[type="email"]');
        const subjectInput = contactForm.querySelector('input[placeholder="Subject"]');
        const textarea     = contactForm.querySelector('textarea');

        const name    = nameInput    ? nameInput.value.trim()    : '';
        const email   = emailInput   ? emailInput.value.trim()   : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = textarea     ? textarea.value.trim()     : '';

        // --- Validation checks ---

        if (!name) {
            showFormMessage('Please enter your name.', 'error');
            nameInput.focus(); // move cursor to the empty field
            return;
        }

        if (!email) {
            showFormMessage('Please enter your email address.', 'error');
            emailInput.focus();
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showFormMessage('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }

        if (!message) {
            showFormMessage('Please write a message before sending.', 'error');
            textarea.focus();
            return;
        }

        if (message.length < 10) {
            showFormMessage('Your message is too short. Please add more detail.', 'error');
            textarea.focus();
            return;
        }

        // ✅ All checks passed!
        showFormMessage('✅ Message sent! We\'ll get back to you shortly.', 'success');

        // Clear all fields
        nameInput.value    = '';
        emailInput.value   = '';
        subjectInput.value = '';
        textarea.value     = '';

        // Temporarily change the button text
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            const original = submitBtn.innerHTML;
            submitBtn.innerHTML        = '✅ Sent!';
            submitBtn.style.background = '#27ae60';

            setTimeout(function () {
                submitBtn.innerHTML        = original;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Helper: shows a message below the form
function showFormMessage(text, type) {
    const old = document.querySelector('.contact-form-message');
    if (old) old.remove();

    const msg = document.createElement('p');
    msg.classList.add('contact-form-message');
    msg.textContent      = text;
    msg.style.marginTop  = '15px';
    msg.style.fontSize   = '14px';
    msg.style.fontWeight = '500';
    msg.style.color      = type === 'success' ? '#1abc9c' : '#e74c3c';

    contactForm.appendChild(msg);

    setTimeout(function () { msg.remove(); }, 5000);
}


// ============================================================
//  4. INPUT GLOW ON FOCUS
//  Each field gets a green glow when clicked,
//  making the form feel more interactive and polished.
// ============================================================

const allInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

allInputs.forEach(function (input) {
    input.addEventListener('focus', function () {
        this.style.borderColor = '#1abc9c';
        this.style.boxShadow   = '0 0 0 3px rgba(26,188,156,0.12)';
        this.style.outline     = 'none';
    });

    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ddd';
            this.style.boxShadow   = 'none';
        }
    });
});


// ============================================================
//  5. INFO CARDS — FADE IN ON SCROLL
//  The 4 cards (Office, Call Us, Email, Working Hours)
//  fade in one by one as the section scrolls into view.
// ============================================================

const infoCards = document.querySelectorAll('.info-card');

infoCards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const infoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 120);

            infoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

infoCards.forEach(function (card) {
    infoObserver.observe(card);
});
