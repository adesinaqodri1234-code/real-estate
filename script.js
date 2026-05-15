const buyTab  = document.querySelector('.buy-section');
const rentTab = document.querySelector('.rent-section');

// This function switches which tab looks "active"
function switchTab(activeTab, inactiveTab) {
    // Style the active tab (green + underline)
    activeTab.style.color        = '#1abc9c';
    activeTab.style.borderBottom = '2px solid #1abc9c';
    activeTab.style.paddingBottom = '5px';
    activeTab.style.fontWeight   = '600';

    // Style the inactive tab (plain grey, no underline)
    inactiveTab.style.color        = '#999';
    inactiveTab.style.borderBottom = 'none';
    inactiveTab.style.fontWeight   = '400';
}

// Listen for a click on each tab, then run switchTab
if (buyTab && rentTab) {
    buyTab.addEventListener('click', function () {
        switchTab(buyTab, rentTab);
    });

    rentTab.addEventListener('click', function () {
        switchTab(rentTab, buyTab);
    });
}


// ============================================================
//  2. HIGHLIGHT THE ACTIVE NAVBAR LINK
//  Whichever nav link matches the current page gets
//  a green colour so the user knows where they are.
// ============================================================

// Get all the links inside the navbar
const navLinks = document.querySelectorAll('.navbar .links a');

navLinks.forEach(function (link) {
    // Check if the link's URL matches the current page URL
    if (link.href === window.location.href) {
        link.style.color      = '#1abc9c';
        link.style.fontWeight = '700';
    }

    // Also highlight on click (useful for single-page feel)
    link.addEventListener('click', function () {
        navLinks.forEach(function (l) {
            l.style.color      = '';   // reset all links
            l.style.fontWeight = '';
        });
        this.style.color      = '#1abc9c';
        this.style.fontWeight = '700';
    });
});


// ============================================================
//  3. SMOOTH SCROLL
//  When a user clicks any anchor link (#), the page
//  scrolls smoothly to that section instead of jumping.
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            e.preventDefault(); // stop the default "jump"
            target.scrollIntoView({
                behavior: 'smooth', // nice smooth scroll
                block: 'start'
            });
        }
    });
});


// ============================================================
//  4. NEWSLETTER FORM VALIDATION
//  Before the form submits, we check that the email
//  field is not empty and looks like a real email address.
// ============================================================

const newsletterForm  = document.querySelector('.footer-section form');
const emailInput      = document.querySelector('#email');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // stop the page from refreshing

        const emailValue = emailInput.value.trim(); // remove extra spaces

        // Simple check: does it contain "@" and a "."?
        const isValidEmail = emailValue.includes('@') && emailValue.includes('.');

        if (emailValue === '') {
            // Empty field
            showMessage(newsletterForm, 'Please enter your email address.', 'error');

        } else if (!isValidEmail) {
            // Doesn't look like an email
            showMessage(newsletterForm, 'Please enter a valid email address.', 'error');

        } else {
            // All good!
            showMessage(newsletterForm, '🎉 Thank you for subscribing!', 'success');
            emailInput.value = ''; // clear the input
        }
    });
}

// Helper function — creates a small message below the form
function showMessage(form, text, type) {
    // Remove any old message first
    const oldMsg = form.querySelector('.form-message');
    if (oldMsg) oldMsg.remove();

    // Create a new message element
    const msg = document.createElement('p');
    msg.classList.add('form-message');
    msg.textContent = text;

    // Green for success, red for error
    msg.style.color      = type === 'success' ? '#1abc9c' : '#e74c3c';
    msg.style.marginTop  = '8px';
    msg.style.fontSize   = '14px';

    form.appendChild(msg); // add it below the form

    // Automatically remove it after 4 seconds
    setTimeout(function () {
        msg.remove();
    }, 4000);
}
const inquiryButtons = document.querySelectorAll('.send-inquiry');

inquiryButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // stop the link from going anywhere

        // Find the property name in the same card
        const card      = this.closest('div');           // the parent card
        const titleEl   = card.querySelector('.card-title');
        const propName  = titleEl ? titleEl.textContent.trim() : 'this property';

        // Change the button text temporarily
        const original = this.textContent;
        this.textContent      = '✅ Inquiry Sent!';
        this.style.background = '#1abc9c';
        this.style.color      = '#fff';

        // Show an alert (you can replace this with a modal later)
        alert(`Your inquiry for "${propName}" has been sent! We'll get back to you shortly.`);

        // Reset the button after 3 seconds
        setTimeout(() => {
            this.textContent      = original;
            this.style.background = '';
            this.style.color      = '';
        }, 3000);
    });
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        // User has scrolled down — add shadow
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.background = '#fff';
        navbar.style.position  = 'sticky';
        navbar.style.top       = '0';
        navbar.style.zIndex    = '1000';
    } else {
        // Back at the top — remove shadow
        navbar.style.boxShadow = 'none';
    }
});
