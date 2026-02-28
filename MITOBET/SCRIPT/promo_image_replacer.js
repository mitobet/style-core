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

    // ========== AdBlock bypass: Çok katmanlı gorsel kurtarma ==========
    var _blobCache = {};

    // Katman 1: XHR ile URL obfuscation — AdBlocker statik pattern matching'i atlatır
    function xhrBlobFetch(url) {
        if (_blobCache[url]) return Promise.resolve(_blobCache[url]);
        return new Promise(function(resolve, reject) {
            try {
                var p = url.split('/');
                var base = p.slice(0, 3).join('/');
                var rest = p.slice(3);
                var rebuilt = [base].concat(rest).join(String.fromCharCode(47));
                var x = new XMLHttpRequest();
                x.open(String.fromCharCode(71, 69, 84), rebuilt, true);
                x.responseType = 'blob';
                x.onload = function() {
                    if (x.status >= 200 && x.status < 300 && x.response) {
                        var b = URL.createObjectURL(x.response);
                        _blobCache[url] = b;
                        resolve(b);
                    } else { reject(); }
                };
                x.onerror = function() { reject(); };
                x.ontimeout = function() { reject(); };
                x.timeout = 8000;
                x.send();
            } catch(e) { reject(e); }
        });
    }

    // Katman 2: wsrv.nl görsel proxy — tamamen farklı domain üzerinden sunar
    function proxyFetch(url) {
        var proxyUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(url) + '&default=1';
        return new Promise(function(resolve, reject) {
            try {
                var x = new XMLHttpRequest();
                x.open('GET', proxyUrl, true);
                x.responseType = 'blob';
                x.onload = function() {
                    if (x.status >= 200 && x.status < 300 && x.response && x.response.size > 500) {
                        var b = URL.createObjectURL(x.response);
                        _blobCache[url] = b;
                        resolve(b);
                    } else { reject(); }
                };
                x.onerror = function() { reject(); };
                x.ontimeout = function() { reject(); };
                x.timeout = 10000;
                x.send();
            } catch(e) { reject(e); }
        });
    }

    // Katmanlı deneme: XHR -> proxy -> placeholder
    function rescueImage(url) {
        if (_blobCache[url]) return Promise.resolve(_blobCache[url]);
        return xhrBlobFetch(url).catch(function() {
            return proxyFetch(url);
        });
    }

    function applyBlobToImg(img, span, blobUrl) {
        img.src = blobUrl;
        img.style.display = '';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
        span.classList.remove('blur');
        span.style.display = 'inline-block';
        span.style.width = '100%';
        span.style.height = '100%';
    }

    function applyPlaceholder(img, span) {
        span.classList.remove('blur');
        span.style.backgroundImage = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
        span.style.backgroundSize = 'cover';
        span.style.display = 'block';
        span.style.width = '100%';
        span.style.height = '100%';
        span.style.minHeight = '200px';
        img.style.display = 'none';
    }

    function fixBlockedImage(span) {
        if (span.dataset.mitoFixed === '1') return;
        var img = span.querySelector('img');
        if (!img) return;
        var src = img.getAttribute('src') || '';
        if (!src) return;

        function doFix() {
            if (span.dataset.mitoFixed === '1') return;
            span.dataset.mitoFixed = '1';
            rescueImage(src).then(function(blobUrl) {
                applyBlobToImg(img, span, blobUrl);
            }).catch(function() {
                applyPlaceholder(img, span);
            });
        }

        if (img.complete && img.naturalWidth === 0) {
            doFix();
            return;
        }
        if (!img.complete) {
            img.addEventListener('error', doFix);
            setTimeout(function() {
                if (span.dataset.mitoFixed !== '1' && img.naturalWidth === 0) doFix();
            }, 2500);
        }
    }

    function scanPromoImages() {
        var spans = document.querySelectorAll('.post__cover .lazy-load-image-background');
        spans.forEach(fixBlockedImage);
    }

    function runPromoFix() {
        if (!document.querySelector('.blog-grid .post__cover')) return;
        scanPromoImages();
        setTimeout(scanPromoImages, 600);
        setTimeout(scanPromoImages, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runPromoFix);
    } else {
        runPromoFix();
    }
    window.addEventListener('load', runPromoFix);

    var promoObserver = new MutationObserver(function(mutations) {
        var dominated = false;
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (!n.querySelectorAll) continue;
                if (n.querySelectorAll('.post__cover .lazy-load-image-background').length) {
                    dominated = true;
                    break;
                }
            }
            if (dominated) break;
        }
        if (dominated || document.querySelector('.blog-grid .post__cover')) {
            setTimeout(scanPromoImages, 200);
        }
    });
    promoObserver.observe(document.body, { childList: true, subtree: true });

})();
