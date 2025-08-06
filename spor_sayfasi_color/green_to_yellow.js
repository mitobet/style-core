<script>
// Yeşil renkleri sarıya çeviren script
(function() {
    'use strict';
    
    // Sarı renk kodları
    const YELLOW_COLOR = '#FFD700'; // Altın sarısı
    const YELLOW_GRADIENT = 'linear-gradient(90deg, #192132 0%, #FFD700 100%)';
    
    // CSS değişkenlerini değiştir
    function changeGreenToYellow() {
        const root = document.documentElement;
        
        // Ana yeşil renkleri sarıya çevir
        root.style.setProperty('--app-base-color', YELLOW_COLOR);
        root.style.setProperty('--app-accent-color', YELLOW_COLOR);
        root.style.setProperty('--app-accent-color2', YELLOW_COLOR);
        root.style.setProperty('--app-main-gradient', YELLOW_GRADIENT);
        
        // Diğer yeşil renkleri sarıya çevir
        root.style.setProperty('--app-betslip-tabs-item-active-border-bottom', `2px solid ${YELLOW_COLOR}`);
        root.style.setProperty('--app-week-calendar-item-content-color', YELLOW_COLOR);
        root.style.setProperty('--app-week-calendar-item-title-color', YELLOW_COLOR);
        root.style.setProperty('--app-live-matches-live-toggler-background', YELLOW_COLOR);
        root.style.setProperty('--app-live-matches-live-toggler-active-background', YELLOW_COLOR);
        root.style.setProperty('--app-game-header-v2-status-item-background', YELLOW_COLOR);
        root.style.setProperty('--app-event-up-color', `${YELLOW_COLOR} !important`);
        root.style.setProperty('--app-betslip-footer-v2-btn-odds-changes-background', YELLOW_COLOR);
        
        // Diğer gradient'ları güncelle
        root.style.setProperty('--app-bet-history-item-btn-cashout-hover-background-color', YELLOW_GRADIENT);
        root.style.setProperty('--app-bet-history-item-btn-cashout-confirm-hover-background-color', YELLOW_GRADIENT);
        root.style.setProperty('--app-checkbox-active-after-background', YELLOW_GRADIENT);
        root.style.setProperty('--app-checkbox-active-background', YELLOW_GRADIENT);
        root.style.setProperty('--app-big-wins-item-odds-background', YELLOW_GRADIENT);
        root.style.setProperty('--app-big-wins-detail-outcome-value-background', YELLOW_GRADIENT);
        root.style.setProperty('--app-betslip-item-v2-odds-background', YELLOW_GRADIENT);
        
        console.log('Yeşil renkler sarıya çevrildi!');
    }
    
    // CSS sınıflarını dinamik olarak değiştir
    function addCustomStyles() {
        const style = document.createElement('style');
        style.id = 'green-to-yellow-override';
        
        style.textContent = `
            /* Hover durumları için sarı renk */
            .sb-sports-list_item:hover .sb-sport-list-link_count {
                color: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item:hover .sb-sport-list-link {
                color: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item.active .sb-sport-list-link_count {
                color: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item.active .sb-sport-list-link {
                color: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item:hover sportsbook-svg-icon {
                --app-sports-list-item-hover-icon-fill: ${YELLOW_COLOR} !important;
                --app-sports-list-item-hover-icon-stroke: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item.active sportsbook-svg-icon {
                --app-sports-list-item-hover-icon-fill: ${YELLOW_COLOR} !important;
                --app-sports-list-item-hover-icon-stroke: ${YELLOW_COLOR} !important;
            }
            
            .sb-sports-list__item:hover,
            .sb-sports-list__item.active {
                color: ${YELLOW_COLOR} !important;
            }
            
            /* Betslip odds renkleri */
            .sb-betslip-item-v2__odds_up {
                --app-betslip-item-v2-odds-color: ${YELLOW_COLOR} !important;
            }
            
            .sb-betslip-item-v2__odds_up::before {
                border-right: 3px solid ${YELLOW_COLOR} !important;
                border-top: 3px solid ${YELLOW_COLOR} !important;
            }
            
            /* Mobile menu aktif durumu */
            .sb-mobile-main-menu-v2-btn.sb-active svg {
                stroke: ${YELLOW_COLOR} !important;
                --app-svg-html-icon-stroke: ${YELLOW_COLOR} !important;
            }
            
            /* Carousel menu aktif durumu */
            .sb-carousel-menu-item.sb-active,
            .sb-carousel-menu-item.sb-active:hover {
                background: ${YELLOW_GRADIENT} !important;
            }
            
            /* Event status up rengi */
            .sb-event-status_up:after {
                --app-event-up-color: ${YELLOW_COLOR} !important;
            }
            
            /* Betslip footer odds changes */
            .sb-bet-slip-footer-v2_odds-changes_value.active {
                background: ${YELLOW_GRADIENT} !important;
            }
            
            /* Betslip input buttons aktif durumu */
            .sb-betslip-bet-input_buttons_buttons_button.active {
                background: ${YELLOW_GRADIENT} !important;
            }
            
            /* Betslip header */
            .sb-betslip-header span {
                background: ${YELLOW_GRADIENT} !important;
            }
            
            /* BR widgets */
            .sb-br-widgets-theme_default .sr-bb .srt-fill-neutral-7 {
                fill: ${YELLOW_COLOR} !important;
            }
            
            .sb-br-widgets-theme_default {
                --app-br-widgets-primary: ${YELLOW_COLOR} !important;
                --app-br-widgets-home: ${YELLOW_COLOR} !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('Özel sarı stiller eklendi!');
    }
    
    // Sayfa yüklendiğinde çalıştır
    function init() {
        changeGreenToYellow();
        addCustomStyles();
        
        // Dinamik içerik için MutationObserver
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Yeni eklenen elementlerde de renk değişikliğini uygula
                    setTimeout(changeGreenToYellow, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // DOM hazır olduğunda çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Manuel çalıştırma fonksiyonu (konsol için)
    window.convertGreenToYellow = function() {
        changeGreenToYellow();
        addCustomStyles();
        console.log('Yeşil → Sarı dönüşümü manuel olarak çalıştırıldı!');
    };
    
})();
</script> 