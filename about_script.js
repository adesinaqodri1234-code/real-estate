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
//  "About" link stays green since we're on the About page
// ============================================================

const navLinks = document.querySelectorAll('.navbar .links a');

navLinks.forEach(function (link) {
    // Highlight the link that matches the current page
    if (link.href === window.location.href) {
        link.style.color      = '#1abc9c';
        link.style.fontWeight = '700';
    }
});


// ============================================================
//  3. ANIMATE STATS COUNTING UP
//  When the stats section scrolls into view, the numbers
//  count up from 0 to their final value (e.g. 0 → 250+)
//  This makes the page feel more alive and impressive!
// ============================================================

// Grab all the stat number elements (250+, 1200+, 15+)
const statBoxes = document.querySelectorAll('.stat-box h3');

// This function counts a number up from 0 to a target
function countUp(element, target, suffix) {
    let current = 0;
    const duration = 1500;           // total time in milliseconds (1.5 seconds)
    const stepTime = 30;             // how often to update (every 30ms)
    const steps = duration / stepTime;
    const increment = target / steps; // how much to add each step

    const timer = setInterval(function () {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer); // stop when we reach the target
        }

        // Update the text — Math.floor removes decimals
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// IntersectionObserver watches when an element appears on screen
// When the stats section is visible, we start counting
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            // It's visible! Start counting for each stat
            statBoxes.forEach(function (box) {
                const text   = box.textContent.trim();  // e.g. "250+"
                const suffix = text.replace(/[0-9,]/g, ''); // get the "+" or nothing
                const number = parseInt(text.replace(/[^0-9]/g, '')); // get just the number

                countUp(box, number, suffix);
            });

            observer.disconnect(); // only run once, stop watching after
        }
    });
}, { threshold: 0.3 }); // trigger when 30% of the section is visible

// Tell the observer to watch the stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}


// ============================================================
//  4. FEATURE BOXES — FADE IN ON SCROLL
//  Each feature box fades in one by one as the user scrolls
//  down to that section. This looks smooth and professional.
// ============================================================

const featureBoxes = document.querySelectorAll('.feature-box');

// First, hide all boxes (we'll reveal them one by one)
featureBoxes.forEach(function (box) {
    box.style.opacity   = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Watch each box — when it enters the screen, animate it in
const featureObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            // Small delay for each box so they come in one after another
            setTimeout(function () {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150); // 150ms delay between each box

            featureObserver.unobserve(entry.target); // stop watching once visible
        }
    });
}, { threshold: 0.1 });

featureBoxes.forEach(function (box) {
    featureObserver.observe(box);
});


// ============================================================
//  5. CTA BUTTON — SCROLL TO TOP OR GO TO CONTACT PAGE
//  The "Ready to Find" CTA button at the bottom sends
//  the user to the contact page when clicked.
// ============================================================

const ctaButton = document.querySelector('.about-cta .button-with-bg');

if (ctaButton) {
    ctaButton.addEventListener('click', function () {
        // Send user to the contact page
        window.location.href = 'contact_index.html';
    });
}
