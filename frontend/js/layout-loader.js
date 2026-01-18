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

        element.innerHTML = html;

        // Trigger reflow for animation
        element.offsetHeight;

        // Final opacity set by CSS classes usually, but we can force it
        element.style.opacity = '1';
    },

    loadPublic() {
        this.render('header-root', 'header');
        this.render('hero-root', 'hero');
        this.render('stats-root', 'stats');
        this.render('funds-root', 'fundsList');
        this.render('activity-root', 'activity');
        this.render('footer-root', 'footer');
        this.render('modal-root', 'modalPayment');
    },

    loadAdmin(currentPage) {
        this.render('sidebar-root', 'adminSidebar');
        this.render('header-root', 'adminHeader');

        // Highlight active link
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
                // Update breadcrumb title
                const titleNode = document.getElementById('currentPageTitle');
                if (titleNode) {
                    const pageText = link.querySelector('span').textContent;
                    titleNode.textContent = pageText;
                }
            }
        });

        // Add overlay if not exists
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.onclick = toggleSidebar;
            document.body.appendChild(overlay);
        }

        // Set admin name
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const nameNode = document.getElementById('adminDisplayName');
        if (nameNode && user.name) nameNode.textContent = user.name;
    }
};

// Global toggle for responsive sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('show');
    if (overlay) overlay.classList.toggle('show');
}

// Auto-init on DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (!window.CLASS_FUND_COMPONENTS) return;

    // Detect page type
    const isPublic = document.getElementById('hero-root') !== null;
    const adminRoot = document.getElementById('sidebar-root');

    if (isPublic) {
        LayoutLoader.loadPublic();
    } else if (adminRoot) {
        const currentPage = adminRoot.getAttribute('data-current-page');
        LayoutLoader.loadAdmin(currentPage);
    }

    // Once components are rendered, init page logic
    if (typeof initPage === 'function') {
        initPage();
    }
});
