<script>
// Futbol Sekmesi JavaScript
class FutbolSekmesi {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Sayfa yüklendiğinde çalış
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createFutbolSekmesi();
            });
        } else {
            this.createFutbolSekmesi();
        }
    }

    setupEventListeners() {
        // Resize event listener
        window.addEventListener('resize', this.debounce(() => {
            this.updateResponsiveLayout();
        }, 250));
    }

    createFutbolSekmesi() {
        // Futbol sekmesi HTML yapısını oluştur
        const futbolData = [
            {
                id: 'bundesliga',
                title: 'Bundesliga',
                url: 'https://t2m.io/tambundesliga',
                image: 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/aIbhaWSGcJcneCnwIXAnsWFLYnF6bvyvNVOUiFMZ.webp',
                className: 'bundesliga'
            },
            {
                id: 'laliga',
                title: 'La Liga',
                url: 'https://t2m.io/tamlaliga',
                image: 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/HeuC8ictUKIrSTxeXuGySfo2FvUxmY40MnnlGgeG.webp',
                className: 'laliga'
            },
            {
                id: 'premier-league',
                title: 'Premier League',
                url: 'https://t2m.io/tampremierlig',
                image: 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/o1q4JAyJc20PBfujBi0DtJHtRjhCxRYjxzteEt5I.webp',
                className: 'premier-league'
            },
            {
                id: 'serie-a',
                title: 'Serie A',
                url: 'https://t2m.io/tamseriea',
                image: 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/nMaflwuXV12Dd5DFW1sRBcKmyev0a3E5XhJPYYk5.webp',
                className: 'serie-a'
            },
            {
                id: 'super-lig',
                title: 'Süper Lig',
                url: 'https://t2m.io/tamsuperlig',
                image: 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/yONpfInMNDkU8hNochP0gmn0aZ2xjSe8unyItHaa.webp',
                className: 'super-lig'
            }
        ];

        this.renderFutbolSekmesi(futbolData);
    }

    renderFutbolSekmesi(data) {
        // Mevcut container'ı bul veya oluştur
        let targetContainer = document.querySelector('.futbol-sekme-target');
        
        if (!targetContainer) {
            // Eğer belirli bir target yoksa, uygun bir yere ekle
            targetContainer = document.body;
        }

        // Ana wrapper oluştur
        const wrapper = document.createElement('div');
        wrapper.className = 'futbol-sekme-wrapper';
        wrapper.innerHTML = `
            <h2 class="futbol-sekme-baslik">🏆 Futbol Ligleri</h2>
            <div class="pb-component-wrapper">
                <div class="futbol-banner-container futbol-banner-without-titles" data-scroll-lock-scrollable="">
                    ${data.map(item => this.createBannerItem(item)).join('')}
                </div>
            </div>
        `;

        targetContainer.appendChild(wrapper);
        
        // Event listener'ları ekle
        this.addClickAnalytics();
        this.addImageLoadHandlers();
    }

    createBannerItem(item) {
        return `
            <a href="${item.url}" 
               target="_self" 
               class="futbol-banner-info futbol-banner ${item.className}" 
               aria-label="${item.title}"
               data-league="${item.id}">
                <img alt="${item.title}" 
                     loading="lazy" 
                     src="${item.image}" 
                     class="futbol-banner-img"
                     onerror="this.parentElement.classList.add('image-error')">
                <div class="futbol-banner-title">${item.title}</div>
            </a>
        `;
    }

    addClickAnalytics() {
        // Tıklama analitikleri
        document.querySelectorAll('.futbol-banner-info').forEach(banner => {
            banner.addEventListener('click', (e) => {
                const league = e.currentTarget.dataset.league;
                console.log(`Futbol ligi tıklandı: ${league}`);
                
                // Google Analytics veya başka analytics servisine gönder
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Futbol Sekmesi',
                        'event_label': league,
                        'value': 1
                    });
                }

                // Tıklama efekti
                this.addClickEffect(e.currentTarget);
            });
        });
    }

    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    addImageLoadHandlers() {
        // Resim yükleme kontrolü
        document.querySelectorAll('.futbol-banner-img').forEach(img => {
            // Loading state
            const parent = img.parentElement;
            parent.classList.add('futbol-banner-loading');

            img.addEventListener('load', () => {
                parent.classList.remove('futbol-banner-loading');
                parent.classList.add('image-loaded');
            });

            img.addEventListener('error', () => {
                parent.classList.remove('futbol-banner-loading');
                parent.classList.add('image-error');
                
                // Fallback image veya icon göster
                img.style.display = 'none';
                this.addFallbackIcon(parent);
            });
        });
    }

    addFallbackIcon(container) {
        const fallbackIcon = document.createElement('div');
        fallbackIcon.className = 'futbol-banner-icon';
        fallbackIcon.innerHTML = '⚽';
        container.insertBefore(fallbackIcon, container.firstChild);
    }

    updateResponsiveLayout() {
        // Responsive güncellemeler
        const containers = document.querySelectorAll('.futbol-banner-container');
        const screenWidth = window.innerWidth;

        containers.forEach(container => {
            if (screenWidth < 480) {
                container.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else if (screenWidth < 768) {
                container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
            } else {
                container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
            }
        });
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public methods
    destroy() {
        // Futbol sekmesini kaldır
        const wrapper = document.querySelector('.futbol-sekme-wrapper');
        if (wrapper) {
            wrapper.remove();
        }
    }

    refresh() {
        // Futbol sekmesini yenile
        this.destroy();
        this.createFutbolSekmesi();
    }

    updateLeagueData(newData) {
        // Liga verilerini güncelle
        this.destroy();
        this.renderFutbolSekmesi(newData);
    }
}

// Automatic initialization
document.addEventListener('DOMContentLoaded', () => {
    // Global olarak erişilebilir yap
    window.futbolSekmesi = new FutbolSekmesi();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FutbolSekmesi;
}

// AMD support
if (typeof define === 'function' && define.amd) {
    define([], function() {
        return FutbolSekmesi;
    });
}

// Manual initialization function
window.initFutbolSekmesi = function() {
    return new FutbolSekmesi();
};

// CSS injection helper (opsiyonel - CSS dosyası yüklenmemişse)
function injectFutbolCSS() {
    if (!document.querySelector('#futbol-sekmesi-css')) {
        const link = document.createElement('link');
        link.id = 'futbol-sekmesi-css';
        link.rel = 'stylesheet';
        link.href = './futbol_sekmesi/futbol_sekmesi.css';
        document.head.appendChild(link);
    }
}
</script>