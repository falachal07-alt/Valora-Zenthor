/**
 * VALORA ZENTHOR - Core Logic Controller
 * Standard: ES6+ Professional
 */

document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initNavbarScroll();
    initOrderForm();
    initContactTrigger();
});

/**
 * Initialize Lucide Icons
 */
const initLucideIcons = () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

/**
 * Navbar Appearance Toggle on Scroll
 */
const initNavbarScroll = () => {
    const mainNav = document.querySelector('nav');
    if (!mainNav) return;

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        mainNav.classList.toggle('bg-white', isScrolled);
        mainNav.classList.toggle('shadow-md', isScrolled);
    });
};

/**
 * Handle Order Form Submission via Mailto
 */
const initOrderForm = () => {
    const orderForm = document.getElementById('orderForm') || document.getElementById('waForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const originalText = btnText?.innerText || "Submit Order";

        // UI State: Loading
        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.innerText = "Opening Email...";

        const formData = {
            name: document.getElementById('name')?.value,
            business: document.getElementById('businessType')?.value,
            message: document.getElementById('message')?.value,
            target: "valorazenthor@gmail.com"
        };

        const subject = encodeURIComponent(`New Service Order from ${formData.name}`);
        const emailBody = encodeURIComponent(
            `Hello Valora Zenthor,\n\n` +
            `I would like to place an order:\n` +
            `- Name/Brand: ${formData.name}\n` +
            `- Business: ${formData.business}\n` +
            `- Message: ${formData.message}\n\n` +
            `Sent via Valora Zenthor Web Portal.`
        );

        window.location.href = `mailto:${formData.target}?subject=${subject}&body=${emailBody}`;
        
        setTimeout(() => {
            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.innerText = originalText;
            this.reset();
            
            const status = document.getElementById('formStatus');
            if (status) {
                status.innerText = "Please complete the send process in your email app.";
                status.classList.remove('hidden');
                status.classList.add('bg-blue-100', 'text-blue-700');
            }
        }, 1500);
    });
};

/**
 * Initialize WhatsApp Redirection Triggers
 */
const initContactTrigger = () => {
    const contactTrigger = document.querySelector('.contact-direct-btn'); 
    if (contactTrigger) {
        contactTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToWhatsApp();
        });
    }
};

/**
 * Global WhatsApp Redirection Logic
 */
function redirectToWhatsApp() {
    const config = {
        phone: "6282312690517",
        message: "Hello Valora Zenthor, I would like to consult about my business."
    };
    window.open(`https://wa.me/${config.phone}?text=${encodeURIComponent(config.message)}`, '_blank');
}

/**
 * SPA Content Navigator
 */
function navigateTo(pageId) {
    // Content Switch
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');

    // Link UI Update
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(`link-${pageId}`)?.classList.add('active');

    // Mobile Menu Cleanup
    document.getElementById('mobileMenu')?.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initLucideIcons();
}
