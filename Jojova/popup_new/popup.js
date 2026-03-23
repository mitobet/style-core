<script>
// Popup Manager
class PopupManager {
    constructor() {
        this.popup = null;
        this.isOpen = false;
        this.imageUrl = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/ih0pzUJa2gPikvHrK7bjeJs1vXsAeqJcnZa7g7Ax.png';
        this.autoShowDelay = 0; // Hemen açılsın
        this.init();
    }

    // Initialize popup
    init() {
        this.createPopupHTML();
        this.bindEvents();
        this.setImage(this.imageUrl); // Görseli hemen yükle
        this.scheduleAutoShow();
    }

    // Create popup HTML structure
    createPopupHTML() {
        const popupHTML = `
            <div id="customPopup" class="popup-overlay">
                <div class="popup-content">
                    <button class="popup-close" aria-label="Kapat">&times;</button>
                    <div class="popup-loading"></div>
                    <img class="popup-image" src="" alt="Popup Image" style="display: none; cursor: pointer;">
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.popup = document.getElementById('customPopup');
    }

    // Set image URL
    setImage(url) {
        this.imageUrl = url;
        const img = this.popup.querySelector('.popup-image');
        const loading = this.popup.querySelector('.popup-loading');
        
        if (url) {
            loading.style.display = 'block';
            img.style.display = 'none';
            
            img.onload = () => {
                loading.style.display = 'none';
                img.style.display = 'block';
            };
            
            img.onerror = () => {
                loading.style.display = 'none';
                console.error('Popup image could not be loaded');
            };
            
            img.src = url;
        }
    }

    // Show popup
    show() {
        if (this.popup && !this.isOpen) {
            this.popup.classList.add('show');
            this.isOpen = true;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            this.trackEvent('popup_shown');
        }
    }

    // Hide popup
    hide() {
        if (this.popup && this.isOpen) {
            this.popup.classList.remove('show');
            this.isOpen = false;
            document.body.style.overflow = ''; // Restore scrolling
            this.trackEvent('popup_closed');
        }
    }

    // Toggle popup
    toggle() {
        this.isOpen ? this.hide() : this.show();
    }

    // Bind events
    bindEvents() {
        if (!this.popup) return;

        // Close button click
        const closeBtn = this.popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', () => this.hide());

        // Overlay click to close
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hide();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.hide();
            }
        });

        // Image click redirects to trade page
        const img = this.popup.querySelector('.popup-image');
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            // Get current language
            const path = window.location.pathname;
            const langPrefix = path.includes('/en/') || path.startsWith('/en') ? '/en' : '/tr';
            // Redirect to trade page
            window.location.href = langPrefix + '/trade';
            this.trackEvent('popup_image_clicked');
        });
    }

    // Schedule auto show
    scheduleAutoShow() {
        setTimeout(() => {
            if (!this.isOpen && this.imageUrl) {
                this.show();
            }
        }, this.autoShowDelay);
    }

    // Track events (for analytics)
    trackEvent(eventName) {
        // Google Analytics veya başka analytics servisine gönderebilirsiniz
        console.log(`Popup Event: ${eventName}`);
        
        // Örnek: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'popup',
                'event_label': 'campaign_popup'
            });
        }
    }

    // Destroy popup
    destroy() {
        if (this.popup) {
            this.popup.remove();
            this.popup = null;
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
}

// Utility functions
const popupUtils = {
    // Check if mobile device
    isMobile() {
        return window.innerWidth <= 767 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Check if popup was shown today
    wasShownToday() {
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem('popup_last_shown');
        return lastShown === today;
    },

    // Mark popup as shown today
    markAsShownToday() {
        const today = new Date().toDateString();
        localStorage.setItem('popup_last_shown', today);
    },

    // Get device type
    getDeviceType() {
        return this.isMobile() ? 'mobile' : 'desktop';
    }
};

// Initialize popup when DOM is ready
let popupManager;

function initPopup() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            popupManager = new PopupManager();
        });
    } else {
        popupManager = new PopupManager();
    }
}

// Public API functions
function showPopup() {
    if (popupManager) {
        popupManager.show();
    }
}

function hidePopup() {
    if (popupManager) {
        popupManager.hide();
    }
}

function setPopupImage(imageUrl) {
    if (popupManager) {
        popupManager.setImage(imageUrl);
    }
}

// Auto-initialize
initPopup();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PopupManager, popupUtils, showPopup, hidePopup, setPopupImage };
} 
</script>