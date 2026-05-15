// ============================================================
//  PROPERTY PAGE — JAVASCRIPT
// ============================================================


// ============================================================
//  1. NAVBAR SHADOW ON SCROLL
// ============================================================

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
//  "Property" stays green since we're on this page
// ============================================================

const navLinks = document.querySelectorAll('.navbar .links a');

navLinks.forEach(function (link) {
    if (link.href === window.location.href) {
        link.style.color      = '#1abc9c';
        link.style.fontWeight = '700';
    }
});


// ============================================================
//  3. PROPERTY CARDS — FADE IN ON SCROLL
//  Cards appear with a smooth animation as you scroll down
// ============================================================

const propertyCards = document.querySelectorAll('.property-card');

// Start hidden
propertyCards.forEach(function (card) {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Watch and reveal each card one by one
const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150); // stagger: each card is delayed by 150ms

            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

propertyCards.forEach(function (card) {
    cardObserver.observe(card);
});


// ============================================================
//  4. "VIEW DETAILS" BUTTON
//  Shows a small popup with the property name and price
//  when the user clicks "View Details" on any card.
//  (You can replace this with a real modal later!)
// ============================================================

const viewButtons = document.querySelectorAll('.btn-primary');

viewButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // stop link from jumping

        // Find the card this button belongs to
        const card     = this.closest('.property-card');
        const name     = card.querySelector('h3').textContent;
        const price    = card.querySelector('.property-price').textContent;
        const location = card.querySelector('.property-location').textContent;

        // Show a nice alert (upgrade to a modal later!)
        alert(`🏠 ${name}\n📍 ${location}\n💰 ${price}\n\nContact us to schedule a viewing!`);
    });
});


// ============================================================
//  5. SEARCH / FILTER PROPERTIES (BONUS FEATURE!)
//  Adds a simple live search box above the property grid.
//  As you type, cards that don't match disappear.
// ============================================================

// Create the search box dynamically and insert it above the grid
const propertySection = document.querySelector('.property-section .wrapper');

if (propertySection) {
    // Build the search input element
    const searchWrapper = document.createElement('div');
    searchWrapper.style.marginBottom = '30px';
    searchWrapper.style.textAlign    = 'center';

    const searchInput = document.createElement('input');
    searchInput.type        = 'text';
    searchInput.placeholder = '🔍  Search by name or location...';
    searchInput.style.padding      = '14px 20px';
    searchInput.style.width        = '100%';
    searchInput.style.maxWidth     = '500px';
    searchInput.style.borderRadius = '10px';
    searchInput.style.border       = '1px solid #ddd';
    searchInput.style.fontSize     = '15px';
    searchInput.style.outline      = 'none';
    searchInput.style.transition   = '0.3s';

    // Green border when typing
    searchInput.addEventListener('focus', function () {
        this.style.borderColor = '#1abc9c';
        this.style.boxShadow   = '0 0 0 3px rgba(26,188,156,0.12)';
    });
    searchInput.addEventListener('blur', function () {
        this.style.borderColor = '#ddd';
        this.style.boxShadow   = 'none';
    });

    searchWrapper.appendChild(searchInput);

    // Insert search box before the property grid
    const grid = propertySection.querySelector('.property-grid');
    propertySection.insertBefore(searchWrapper, grid);

    // Filter cards as user types
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase(); // what the user typed

        propertyCards.forEach(function (card) {
            const name     = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.property-location').textContent.toLowerCase();

            // Show card if name or location matches, hide if not
            if (name.includes(query) || location.includes(query)) {
                card.style.display  = '';
                card.style.opacity  = '1';
            } else {
                card.style.display = 'none';
            }
        });
    });
}