// MITOBET - Promosyonlar Arka Plan Görseli Değiştirici + CSS
(function() {
    'use strict';
    
    // Görsel URL'leri (Desktop ve Mobil)
    const DESKTOP_PROMO_IMAGE = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/x6yNHDx1ZEUxqkaCPr73sE2GaS3Px0q3nF5XurLu.png';
    const MOBILE_PROMO_IMAGE = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/Yrcmm2n208IMrjgybyQshrSqLz5162mM0bEHqRtw.png';
    
    // CSS Injection - Promosyonlar için özel stiller
    function injectPromoStyles() {
        const styleId = 'promo-custom-styles';
        
        // Zaten eklendiyse tekrar ekleme
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Promosyonlar Büyük Buton - Özel Stiller (Menü içindeki linke dokunma) */
            .sidebar__links a[href*="promotions"],
            .sidebar__link.sidebar__link--casino[href*="promotions"],
            .sidebar__link.w-100[href*="promotions"] {
                overflow: hidden !important;
                position: relative !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 
                            0 0 20px rgba(154, 106, 12, 0.15) !important;
            }
            
            /* Hover Animasyonu - Yukarı Kalk + Glow */
            .sidebar__links a[href*="promotions"]:hover,
            .sidebar__link.sidebar__link--casino[href*="promotions"]:hover,
            .sidebar__link.w-100[href*="promotions"]:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 
                            0 0 35px rgba(154, 106, 12, 0.4),
                            0 0 50px rgba(154, 106, 12, 0.2) !important;
                filter: brightness(1.08) !important;
            }
            
            /* Parlama Efekti */
            .sidebar__links a[href*="promotions"]:before,
            .sidebar__link.sidebar__link--casino[href*="promotions"]:before,
            .sidebar__link.w-100[href*="promotions"]:before {
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
            
            .sidebar__links a[href*="promotions"]:hover:before,
            .sidebar__link.sidebar__link--casino[href*="promotions"]:hover:before,
            .sidebar__link.w-100[href*="promotions"]:hover:before {
                left: 100% !important;
            }
            
            /* Pulse Animasyonu - Devamlı hafif ışıltı */
            @keyframes promoPulse {
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
            
            .sidebar__links a[href*="promotions"],
            .sidebar__link.sidebar__link--casino[href*="promotions"],
            .sidebar__link.w-100[href*="promotions"] {
                animation: promoPulse 3s ease-in-out infinite !important;
            }
            
            /* Hover'da animasyonu durdur */
            .sidebar__links a[href*="promotions"]:hover,
            .sidebar__link.sidebar__link--casino[href*="promotions"]:hover,
            .sidebar__link.w-100[href*="promotions"]:hover {
                animation: none !important;
            }
            
            /* Mobil için özel ayarlar */
            @media (max-width: 767px) {
                .sidebar__links a[href*="promotions"]:hover,
                .sidebar__link.w-100[href*="promotions"]:hover {
                    transform: translateY(-2px) !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Promosyonlar CSS eklendi');
    }
    
    // Görseli değiştir (Responsive) - SADECE büyük butona
    function changePromoImage() {
        // Cihaz genişliğine göre görsel seç
        const isMobile = window.innerWidth <= 767;
        const imageUrl = isMobile ? MOBILE_PROMO_IMAGE : DESKTOP_PROMO_IMAGE;
        
        // SADECE büyük promosyonlar butonunu bul (menü içindeki linki hariç tut)
        const promoLinks = [
            document.querySelector('.sidebar__links a[href*="promotions"]'),
            document.querySelector('a.sidebar__link.sidebar__link--casino[href*="promotions"]'),
            document.querySelector('a.sidebar__link.w-100[href*="promotions"]')
        ];
        
        promoLinks.forEach(promoLink => {
            if (promoLink && !promoLink.closest('li')) {
                // li içinde değilse (yani menü değilse) görseli değiştir
                promoLink.style.background = `url("${imageUrl}") center center / cover no-repeat`;
                promoLink.style.backgroundSize = 'cover';
                promoLink.style.backgroundPosition = 'center center';
                promoLink.style.backgroundRepeat = 'no-repeat';
                
                console.log('✅ Promosyonlar büyük buton görseli değiştirildi:', isMobile ? 'Mobil' : 'Desktop', imageUrl);
            }
        });
    }
    
    // Optimize edildi: Sadece 2 deneme yeterli
    function tryMultiple() {
        injectPromoStyles(); // CSS'i ekle
        changePromoImage();
        setTimeout(changePromoImage, 500); // Sadece bir kez daha dene
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryMultiple);
    } else {
        tryMultiple();
    }
    
    // MutationObserver - DOM değişikliklerini izle
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                const target = mutation.target;
                
                // Eğer sidebar veya promosyonlar linki değiştiyse
                if (target.classList && 
                    (target.classList.contains('sidebar') || 
                     target.classList.contains('sidebar__big') || 
                     target.classList.contains('sidebar__small') ||
                     target.querySelector('a[href*="promotions"]'))) {
                    setTimeout(changePromoImage, 50);
                }
            }
        });
    });
    
    // Body'yi izle
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    // Interval kaldırıldı - MutationObserver yeterli
    
    // Mobil olayları ve resize (görsel değişimi için)
    window.addEventListener('orientationchange', () => setTimeout(changePromoImage, 200));
    window.addEventListener('resize', () => setTimeout(changePromoImage, 100));
    
    // Debounced resize handler (performans için)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(changePromoImage, 250);
    });

    // ========== Sadakat Kart Görselleri: /statics/ URL ile değiştir ==========
    var STATICS_TEST_IMAGE = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/NNpwfWh3DCcKIzff6PAcQdctBPka7liZhjOyqOHR.png';
    var _blockedPath = String.fromCharCode(47, 112, 114, 111, 109, 111, 116, 105, 111, 110, 115, 47); // "/promotions/"

    function _isPromoUrl(s) {
        return s && s.indexOf(_blockedPath) > -1;
    }

    function replacePromoCardImages() {
        var cards = document.querySelectorAll('.blog-grid a.post');
        if (!cards.length) return;

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var img = card.querySelector('span.post__cover img');
            var lazySpan = card.querySelector('span.lazy-load-image-background');

            if (img && img.dataset.staticsRw !== '1') {
                var origSrc = img.getAttribute('src') || '';
                if (_isPromoUrl(origSrc)) {
                    img.dataset.staticsRw = '1';
                    img.setAttribute('src', STATICS_TEST_IMAGE);
                    if (img.getAttribute('data-src')) {
                        img.setAttribute('data-src', STATICS_TEST_IMAGE);
                    }
                    if (img.srcset) img.removeAttribute('srcset');
                    img.style.display = '';
                    img.style.visibility = 'visible';
                    img.style.opacity = '1';
                }
            }

            if (lazySpan) {
                var bgImg = lazySpan.style.backgroundImage || '';
                if (_isPromoUrl(bgImg) && lazySpan.dataset.staticsRw !== '1') {
                    lazySpan.dataset.staticsRw = '1';
                    lazySpan.style.backgroundImage = 'url("' + STATICS_TEST_IMAGE + '")';
                    lazySpan.style.backgroundSize = '100% 100%';
                    lazySpan.classList.remove('blur');
                    lazySpan.style.display = 'inline-block';
                    lazySpan.style.width = '100%';
                    lazySpan.style.height = '100%';
                }
            }
        }

        var standaloneImgs = document.querySelectorAll('img');
        for (var j = 0; j < standaloneImgs.length; j++) {
            var sImg = standaloneImgs[j];
            if (sImg.dataset.staticsRw === '1') continue;
            var sSrc = sImg.getAttribute('src') || '';
            if (_isPromoUrl(sSrc)) {
                sImg.dataset.staticsRw = '1';
                sImg.setAttribute('src', STATICS_TEST_IMAGE);
                if (sImg.getAttribute('data-src')) {
                    sImg.setAttribute('data-src', STATICS_TEST_IMAGE);
                }
                if (sImg.srcset) sImg.removeAttribute('srcset');
                sImg.style.display = '';
                sImg.style.visibility = 'visible';
                sImg.style.opacity = '1';

                var parentSpan = sImg.closest('.lazy-load-image-background');
                if (parentSpan && parentSpan.dataset.staticsRw !== '1') {
                    parentSpan.dataset.staticsRw = '1';
                    parentSpan.style.backgroundImage = 'url("' + STATICS_TEST_IMAGE + '")';
                    parentSpan.style.backgroundSize = '100% 100%';
                    parentSpan.classList.remove('blur');
                    parentSpan.style.display = 'inline-block';
                    parentSpan.style.width = '100%';
                    parentSpan.style.height = '100%';
                }
            }
        }
    }

    var _cardObTarget = document.documentElement || document.body;
    var _cardRewriteObs = new MutationObserver(function(muts) {
        var shouldScan = false;
        for (var i = 0; i < muts.length; i++) {
            if (muts[i].addedNodes.length > 0) { shouldScan = true; break; }
            if (muts[i].type === 'attributes' && muts[i].target.tagName === 'IMG') {
                muts[i].target.dataset.staticsRw = '';
                shouldScan = true;
            }
        }
        if (shouldScan) setTimeout(replacePromoCardImages, 50);
    });

    _cardRewriteObs.observe(_cardObTarget, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'data-src']
    });

    function _initStaticsRewrite() {
        replacePromoCardImages();
        setTimeout(replacePromoCardImages, 500);
        setTimeout(replacePromoCardImages, 2000);
        setTimeout(replacePromoCardImages, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _initStaticsRewrite);
    } else {
        _initStaticsRewrite();
    }
    window.addEventListener('load', _initStaticsRewrite);

})();
