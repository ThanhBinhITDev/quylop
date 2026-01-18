// Layout Loader - Handles dynamic component loading from js/components.js
const LayoutLoader = {
    render(elementId, componentName) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const html = window.CLASS_FUND_COMPONENTS[componentName];
        if (!html) {
            console.error(`Component not found: ${componentName}`);
            return;
        }

        // Inject with fade-in effect
        element.style.opacity = '0';
        element.innerHTML = html;

        // Trigger reflow for animation
        element.offsetHeight;

        element.style.transition = 'opacity 0.5s ease-in-out';
        element.style.opacity = '1';
    },

    loadAll() {
        console.log('Loading all components from library...');
        this.render('header-root', 'header');
        this.render('hero-root', 'hero');
        this.render('stats-root', 'stats');
        this.render('funds-root', 'fundsList');
        this.render('activity-root', 'activity');
        this.render('footer-root', 'footer');
        this.render('modal-root', 'modalPayment');
    }
};

// Auto-init on DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (!window.CLASS_FUND_COMPONENTS) {
        console.error('Components library not loaded! Check js/components.js script tag.');
        return;
    }

    LayoutLoader.loadAll();

    // Once components are rendered, init page logic
    if (typeof initPage === 'function') {
        initPage();
    }
});
