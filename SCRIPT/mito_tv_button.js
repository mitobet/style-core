(function() {
    'use strict';
    
    const DESKTOP_TV = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/08q1fN1eVVRaHZJ3kCPfvIsldskFz2kFqelrp40l.png';
    const MOBILE_TV = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/6oLnWMti5FNnahtOYcXR0gChURUjr3uu7xgtLIad.png';
    const TV_LINK = 'https://mito.ws/tv';
    
    let added = false;
    
    // CSS ekle
    function injectCSS() {
        const styleId = 'mito-tv-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Mito TV Butonu - Promosyonlar gibi stil */
            a.sidebar__link--mitotv {
                overflow: hidden !important;
                position: relative !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 
                            0 0 20px rgba(154, 106, 12, 0.15) !important;
            }
            
            /* Hover Animasyonu - Yukarı Kalk + Glow */
            a.sidebar__link--mitotv:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 
                            0 0 35px rgba(154, 106, 12, 0.4),
                            0 0 50px rgba(154, 106, 12, 0.2) !important;
                filter: brightness(1.08) !important;
            }
            
            /* Parlama Efekti */
            a.sidebar__link--mitotv:before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
                transition: left 0.6s ease !important;
                z-index: 1 !important;
                pointer-events: none !important;
            }
            
            a.sidebar__link--mitotv:hover:before {
                left: 100% !important;
            }
            
            /* Pulse Animasyonu - Devamlı hafif ışıltı */
            @keyframes mitoTVPulse {
                0%, 100% { 
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 
                                0 0 20px rgba(154, 106, 12, 0.15);
                }
                50% { 
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 
                                0 0 30px rgba(154, 106, 12, 0.25),
                                0 0 45px rgba(154, 106, 12, 0.15);
                }
            }
            
            a.sidebar__link--mitotv {
                animation: mitoTVPulse 3s ease-in-out infinite !important;
            }
            
            /* Hover'da animasyonu durdur */
            a.sidebar__link--mitotv:hover {
                animation: none !important;
            }
            
            /* Mobil için özel ayarlar */
            @media (max-width: 767px) {
                a.sidebar__link--mitotv:hover {
                    transform: translateY(-2px) !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    function addTV() {
        if (added) return;
        
        const promoButton = document.querySelector('a[href*="promotions"]');
        if (!promoButton) return;
        
        const promoParent = promoButton.closest('.sidebar__links');
        if (!promoParent) return;
        
        const sidebar = promoParent.parentElement;
        if (!sidebar) return;
        
        // Zaten var mı kontrol et
        if (document.querySelector('.sidebar__link--mitotv')) {
            added = true;
            return;
        }
        
        // TV wrapper oluştur
        const tvWrapper = document.createElement('div');
        tvWrapper.className = 'sidebar__links custom_side';
        
        // TV butonu oluştur
        const tvButton = document.createElement('a');
        tvButton.className = 'sidebar__link sidebar__link--casino sidebar__link--mitotv w-100';
        tvButton.href = TV_LINK;
        tvButton.target = '_blank';
        tvButton.style.cssText = 'height: 46px;';
        
        // Görsel ekle
        const isMobile = window.innerWidth <= 767;
        tvButton.style.background = `url("${isMobile ? MOBILE_TV : DESKTOP_TV}") center center / cover no-repeat`;
        
        // Butonu wrapper'a ekle
        tvWrapper.appendChild(tvButton);
        
        // Promo parent'tan sonra ekle
        if (promoParent.nextSibling) {
            sidebar.insertBefore(tvWrapper, promoParent.nextSibling);
        } else {
            sidebar.appendChild(tvWrapper);
        }
        
        added = true;
    }
    
    // CSS'i hemen ekle
    injectCSS();
    
    // TV butonunu ekle
    setTimeout(addTV, 100);
    setTimeout(addTV, 500);
    setTimeout(addTV, 1000);
    setTimeout(addTV, 2000);
    setTimeout(addTV, 3000);
    
    // DOM yüklenince dene
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addTV);
    } else {
        addTV();
    }
    
    // Interval
    const interval = setInterval(() => {
        if (added) {
            clearInterval(interval);
            return;
        }
        addTV();
    }, 1000);
    
    setTimeout(() => clearInterval(interval), 20000);
    
})();
