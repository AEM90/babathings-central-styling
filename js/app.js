/**
 * BabaThings App Launcher
 * 
 * Main application logic for rendering and managing the app dashboard
 */

(function() {
    'use strict';

    /**
     * Initialize the application
     */
    function init() {
        renderApps();
        setupEventListeners();
    }

    /**
     * Render all apps to the grid
     */
    function renderApps() {
        const appsGrid = document.getElementById('appsGrid');
        
        if (!appsGrid) {
            console.error('Apps grid container not found');
            return;
        }

        // Clear existing content
        appsGrid.innerHTML = '';

        // Check if apps config is available
        if (typeof appsConfig === 'undefined' || !Array.isArray(appsConfig)) {
            console.error('Apps configuration not found');
            appsGrid.innerHTML = '<p class="text-center">No apps available</p>';
            return;
        }

        // Render each app
        appsConfig.forEach((app, index) => {
            const appCard = createAppCard(app, index);
            appsGrid.appendChild(appCard);
        });
    }

    /**
     * Create an app card element
     * @param {Object} app - App configuration object
     * @param {number} index - App index for animation delay
     * @returns {HTMLElement} App card element
     */
    function createAppCard(app, index) {
        const card = document.createElement('a');
        card.className = 'app-card';
        card.href = app.url || '#';
        card.setAttribute('data-app-id', app.id);
        card.setAttribute('target', '_blank');
        card.setAttribute('rel', 'noopener noreferrer');
        card.style.animationDelay = `${index * 0.05}s`;

        // Create icon container
        const iconDiv = document.createElement('div');
        iconDiv.className = 'app-icon';
        iconDiv.style.background = app.color || 'linear-gradient(135deg, #6366f1, #10b981)';
        iconDiv.textContent = app.icon || '📱';

        // Create title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'app-title';
        titleDiv.textContent = app.name;

        // Create description
        const descDiv = document.createElement('div');
        descDiv.className = 'app-description';
        descDiv.textContent = app.description || '';

        // Add status badge if present
        if (app.status) {
            const statusBadge = document.createElement('span');
            statusBadge.className = `app-status ${app.status}`;
            statusBadge.textContent = formatStatus(app.status);
            card.appendChild(statusBadge);
        }

        // Assemble the card
        card.appendChild(iconDiv);
        card.appendChild(titleDiv);
        card.appendChild(descDiv);

        return card;
    }

    /**
     * Format status text for display
     * @param {string} status - Status string
     * @returns {string} Formatted status
     */
    function formatStatus(status) {
        const statusMap = {
            'new': 'New',
            'beta': 'Beta',
            'coming-soon': 'Coming Soon'
        };
        return statusMap[status] || status;
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Add click tracking for analytics (placeholder)
        document.addEventListener('click', function(e) {
            const appCard = e.target.closest('.app-card');
            if (appCard) {
                const appId = appCard.getAttribute('data-app-id');
                trackAppClick(appId);
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedCard = document.activeElement;
                if (focusedCard && focusedCard.classList.contains('app-card')) {
                    e.preventDefault();
                    focusedCard.click();
                }
            }
        });
    }

    /**
     * Track app click for analytics
     * @param {string} appId - App identifier
     */
    function trackAppClick(appId) {
        // Placeholder for analytics tracking
        console.log(`App clicked: ${appId}`);
        
        // You can integrate with Google Analytics, Plausible, or other analytics here
        // Example: gtag('event', 'app_click', { app_id: appId });
    }

    /**
     * Search/filter apps (future enhancement)
     * @param {string} query - Search query
     */
    function filterApps(query) {
        const cards = document.querySelectorAll('.app-card');
        const searchTerm = query ? query.toLowerCase().trim() : '';

        // If search is empty, show all cards
        if (!searchTerm) {
            cards.forEach(card => {
                card.style.display = '';
            });
            return;
        }

        cards.forEach(card => {
            const title = card.querySelector('.app-title').textContent.toLowerCase();
            const description = card.querySelector('.app-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Get app by ID
     * @param {string} appId - App identifier
     * @returns {Object|null} App configuration object
     */
    function getAppById(appId) {
        if (typeof appsConfig === 'undefined') return null;
        return appsConfig.find(app => app.id === appId) || null;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export functions for external use
    window.BabaThings = {
        filterApps: filterApps,
        getAppById: getAppById,
        renderApps: renderApps
    };
})();
