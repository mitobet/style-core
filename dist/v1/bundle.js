/* ===== active/SCRIPT/css_blocker.js ===== */
/* =====================================================
   MITOBET - CSS Blocker
   CMS'deki hatalı CSS dosyalarını engeller.
   ===================================================== */

(function() {
    'use strict';

    var BLOCKED = [
        'btT2zvLncVttPgLh7UhpfCCihTtMYy5y',
        'search-gold',
        'multisearch'
    ];

    function shouldBlock(el) {
        // Link href kontrolü
        var href = el.getAttribute('href') || '';
        if (href.indexOf('btT2zvLncVttPgLh7UhpfCCihTtMYy5y') > -1) return true;

        // Style içerik kontrolü (inline CSS)
        if (el.tagName === 'STYLE' && el.textContent) {
            var txt = el.textContent;
            if (txt.indexOf('--search-gold') > -1 && txt.indexOf('multisearch') > -1) return true;
        }

        return false;
    }

    function killCSS() {
        // Tüm stylesheet ve style etiketlerini tara
        var els = document.querySelectorAll('link[rel="stylesheet"], style');
        els.forEach(function(el) {
            if (shouldBlock(el)) {
                el.disabled = true;
                el.parentNode && el.parentNode.removeChild(el);
            }
        });

        // document.styleSheets üzerinden de kontrol
        try {
            for (var i = document.styleSheets.length - 1; i >= 0; i--) {
                var sheet = document.styleSheets[i];
                var href = sheet.href || '';
                if (href.indexOf('btT2zvLncVttPgLh7UhpfCCihTtMYy5y') > -1) {
                    sheet.disabled = true;
                    if (sheet.ownerNode) {
                        sheet.ownerNode.parentNode && sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
                    }
                }
            }
        } catch(e) {}
    }

    // MutationObserver - eklenen her node'u kontrol et
    var obs = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (!n.tagName) continue;
                var tag = n.tagName.toUpperCase();
                if (tag === 'LINK' || tag === 'STYLE') {
                    if (shouldBlock(n)) {
                        n.disabled = true;
                        n.parentNode && n.parentNode.removeChild(n);
                    }
                }
                // İçindeki link/style'ları da kontrol et
                if (n.querySelectorAll) {
                    var inner = n.querySelectorAll('link[rel="stylesheet"], style');
                    inner.forEach(function(el) {
                        if (shouldBlock(el)) {
                            el.disabled = true;
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                    });
                }
            }
        }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Hemen çalıştır
    killCSS();
    // DOM hazır olunca tekrar
    document.addEventListener('DOMContentLoaded', killCSS);
    // Sayfa yüklenince tekrar
    window.addEventListener('load', killCSS);
    // Periyodik kontrol
    setInterval(killCSS, 1000);

})();


/* ===== active/SCRIPT/font_loader.js ===== */
// MITOBET Font Yükleyici ve Style Injector
(function() {
    'use strict';

    const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap';

    const FONT_STYLES = `
/* Root font tanımları */
:root {
    --mito-font-primary: 'Stack Sans Headline', sans-serif;
    --mito-font-secondary: 'Stack Sans Headline', sans-serif;
    --mito-font-display: 'Stack Sans Headline', sans-serif;
    --mito-font-heading: 'Stack Sans Headline', sans-serif;
}

/* Genel font uygulama */
* {
    font-family: var(--mito-font-primary) !important;
}

body {
    font-family: var(--mito-font-primary) !important;
}

/* Başlık fontları */
h1, h2, h3, h4, h5, h6,
.title, .heading, .banner-title, .modal-title {
    font-family: var(--mito-font-heading) !important;
}

/* Display ve Hero alanları */
.display-title, .hero-title, .big-title {
    font-family: var(--mito-font-display) !important;
}

/* Butonlar ve Formlar */
button, .btn, .button,
input, select, textarea,
.form-control {
    font-family: var(--mito-font-primary) !important;
}

/* Navigasyon */
.nav, .menu, .navbar {
    font-family: var(--mito-font-secondary) !important;
}

/* Font Weight Ayarları */
.font-thin { font-weight: 100 !important; }
.font-light { font-weight: 300 !important; }
.font-regular { font-weight: 400 !important; }
.font-medium { font-weight: 500 !important; }
.font-semibold { font-weight: 600 !important; }
.font-bold { font-weight: 700 !important; }
.font-black { font-weight: 900 !important; }

/* Mevcut font-weight stillerini koru ama font-family'i zorla */
[style*="font-weight"] {
    font-family: var(--mito-font-primary) !important;
}
`;

    // Google Fonts Preconnect
    function addPreconnect() {
        if (document.querySelector('link[href="https://fonts.googleapis.com"]')) return;
        
        const l1 = document.createElement('link');
        l1.rel = 'preconnect';
        l1.href = 'https://fonts.googleapis.com';
        
        const l2 = document.createElement('link');
        l2.rel = 'preconnect';
        l2.href = 'https://fonts.gstatic.com';
        l2.crossOrigin = 'anonymous';
        
        document.head.appendChild(l1);
        document.head.appendChild(l2);
    }
    
    // Google Fonts Linki
    function addGoogleFonts() {
        // Ana URL'in query parametreleri olmadan kontrolü
        const baseUrl = GOOGLE_FONTS_URL.split('?')[0];
        if (document.querySelector(`link[href^="${baseUrl}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = GOOGLE_FONTS_URL;
        document.head.appendChild(link);
    }

    // Style Injection
    function injectStyles() {
        // Zaten eklenmiş mi kontrol et
        if (document.getElementById('mito-font-styles')) return;

        const style = document.createElement('style');
        style.id = 'mito-font-styles';
        style.textContent = FONT_STYLES;
        document.head.appendChild(style);
    }
    
    function init() {
        addPreconnect();
        addGoogleFonts();
        injectStyles();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* ===== active/SCRIPT/promo_image_replacer.js ===== */
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

    // ========== AdBlock bypass v3: Proaktif URL Rewriting ==========
    // Strateji: img.src'yi AdBlocker istek yapmadan ONCE proxy URL ile degistir.
    // Boylece tarayici hicbir zaman /promotions/ URL'sine istek yapmaz.

    var _proxyBase = 'https://' + 'wsrv.nl' + '/?url=';
    var _blocked = String.fromCharCode(47, 112, 114, 111, 109, 111, 116, 105); // "/promoti"

    function _isPromoSrc(s) {
        return s && s.indexOf(_blocked) > -1;
    }

    function _makeProxyUrl(originalUrl) {
        return _proxyBase + encodeURIComponent(originalUrl);
    }

    function rewriteImgSrc(img) {
        if (!img || img.dataset.mitoRw === '1') return;

        var src = img.getAttribute('src') || '';
        var dataSrc = img.getAttribute('data-src') || '';
        var targetSrc = src || dataSrc;

        if (!_isPromoSrc(targetSrc)) return;

        img.dataset.mitoRw = '1';
        img.dataset.mitoOrig = targetSrc;

        var proxyUrl = _makeProxyUrl(targetSrc);

        if (src) img.setAttribute('src', proxyUrl);
        if (dataSrc) img.setAttribute('data-src', proxyUrl);
        if (img.srcset) img.removeAttribute('srcset');

        img.style.display = '';
        img.style.visibility = 'visible';
        img.style.opacity = '1';

        var span = img.closest('.lazy-load-image-background');
        if (span) {
            span.classList.remove('blur');
            span.style.display = 'inline-block';
            span.style.width = '100%';
            span.style.height = '100%';
        }

        img.addEventListener('error', function _proxyErr() {
            img.removeEventListener('error', _proxyErr);
            if (span) {
                span.style.backgroundImage = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                span.style.backgroundSize = 'cover';
                span.style.display = 'block';
                span.style.width = '100%';
                span.style.height = '100%';
                span.style.minHeight = '200px';
            }
            img.style.display = 'none';
        });
    }

    function scanAllPromoImgs() {
        var imgs = document.querySelectorAll('img');
        for (var i = 0; i < imgs.length; i++) {
            rewriteImgSrc(imgs[i]);
        }
    }

    // Erken MutationObserver — document.documentElement uzerinde baslar (body'den once)
    var _promoObTarget = document.documentElement || document.body;
    var _promoRewriteObs = new MutationObserver(function(muts) {
        for (var i = 0; i < muts.length; i++) {
            var added = muts[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
                var node = added[j];
                if (node.nodeType !== 1) continue;
                if (node.tagName === 'IMG') {
                    rewriteImgSrc(node);
                } else if (node.querySelectorAll) {
                    var imgs = node.querySelectorAll('img');
                    for (var k = 0; k < imgs.length; k++) {
                        rewriteImgSrc(imgs[k]);
                    }
                }
            }
            // Attribute degisikligi (React src guncellerse)
            if (muts[i].type === 'attributes' && muts[i].target.tagName === 'IMG') {
                var t = muts[i].target;
                t.dataset.mitoRw = '';
                rewriteImgSrc(t);
            }
        }
    });

    _promoRewriteObs.observe(_promoObTarget, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'data-src']
    });

    // Sayfa hazir olunca tam tarama
    function _initPromoRewrite() {
        scanAllPromoImgs();
        setTimeout(scanAllPromoImgs, 500);
        setTimeout(scanAllPromoImgs, 2000);
        setTimeout(scanAllPromoImgs, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _initPromoRewrite);
    } else {
        _initPromoRewrite();
    }
    window.addEventListener('load', _initPromoRewrite);

})();


/* ===== active/SCRIPT/mito_tv_button.js ===== */
(function() {
    'use strict';

    var DESKTOP_TV_ORIG = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/08q1fN1eVVRaHZJ3kCPfvIsldskFz2kFqelrp40l.png';
    var MOBILE_TV_ORIG = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/6oLnWMti5FNnahtOYcXR0gChURUjr3uu7xgtLIad.png';
    var TV_LINK = 'https://mito.ws/tv';

    var _proxyBase = 'https://' + 'wsrv.nl' + '/?url=';
    var DESKTOP_TV = _proxyBase + encodeURIComponent(DESKTOP_TV_ORIG);
    var MOBILE_TV = _proxyBase + encodeURIComponent(MOBILE_TV_ORIG);

    var added = false;

    function injectCSS() {
        var styleId = 'mito-tv-styles';
        if (document.getElementById(styleId)) return;

        var style = document.createElement('style');
        style.id = styleId;
        style.textContent =
            'a.sidebar__link--mitotv{overflow:hidden!important;position:relative!important;transition:all .4s cubic-bezier(.4,0,.2,1)!important;box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 20px rgba(154,106,12,.15)!important}' +
            'a.sidebar__link--mitotv:hover{transform:translateY(-4px)!important;box-shadow:0 8px 25px rgba(0,0,0,.3),0 0 35px rgba(154,106,12,.4),0 0 50px rgba(154,106,12,.2)!important;filter:brightness(1.08)!important}' +
            'a.sidebar__link--mitotv:before{content:""!important;position:absolute!important;top:0!important;left:-100%!important;width:100%!important;height:100%!important;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)!important;transition:left .6s ease!important;z-index:1!important;pointer-events:none!important}' +
            'a.sidebar__link--mitotv:hover:before{left:100%!important}' +
            '@keyframes mitoTVPulse{0%,100%{box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 20px rgba(154,106,12,.15)}50%{box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 30px rgba(154,106,12,.25),0 0 45px rgba(154,106,12,.15)}}' +
            'a.sidebar__link--mitotv{animation:mitoTVPulse 3s ease-in-out infinite!important}' +
            'a.sidebar__link--mitotv:hover{animation:none!important}' +
            '@media(max-width:767px){a.sidebar__link--mitotv:hover{transform:translateY(-2px)!important}}';

        document.head.appendChild(style);
    }

    function addTV() {
        if (added) return;

        var promoButton = document.querySelector('a[href*="promotions"]');
        if (!promoButton) return;

        var promoParent = promoButton.closest('.sidebar__links');
        if (!promoParent) return;

        var sidebar = promoParent.parentElement;
        if (!sidebar) return;

        if (document.querySelector('.sidebar__link--mitotv')) {
            added = true;
            return;
        }

        var tvWrapper = document.createElement('div');
        tvWrapper.className = 'sidebar__links custom_side';

        var tvButton = document.createElement('a');
        tvButton.className = 'sidebar__link sidebar__link--casino sidebar__link--mitotv w-100';
        tvButton.href = TV_LINK;
        tvButton.target = '_blank';
        tvButton.style.cssText = 'height:46px;';

        var isMobile = window.innerWidth <= 767;
        var imgUrl = isMobile ? MOBILE_TV : DESKTOP_TV;
        tvButton.style.background = 'url("' + imgUrl + '") center center / cover no-repeat';

        var testImg = new Image();
        testImg.onload = function() {
            tvButton.style.background = 'url("' + imgUrl + '") center center / cover no-repeat';
        };
        testImg.onerror = function() {
            var origUrl = isMobile ? MOBILE_TV_ORIG : DESKTOP_TV_ORIG;
            tvButton.style.background = 'url("' + origUrl + '") center center / cover no-repeat';
        };
        testImg.src = imgUrl;

        tvWrapper.appendChild(tvButton);

        if (promoParent.nextSibling) {
            sidebar.insertBefore(tvWrapper, promoParent.nextSibling);
        } else {
            sidebar.appendChild(tvWrapper);
        }

        added = true;
    }

    injectCSS();

    setTimeout(addTV, 100);
    setTimeout(addTV, 500);
    setTimeout(addTV, 1000);
    setTimeout(addTV, 2000);
    setTimeout(addTV, 3000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addTV);
    } else {
        addTV();
    }

    var interval = setInterval(function() {
        if (added) {
            clearInterval(interval);
            return;
        }
        addTV();
    }, 1000);

    setTimeout(function() { clearInterval(interval); }, 20000);

})();


/* ===== active/SCRIPT/header_extra_buttons.js ===== */
/* =====================================================
   MITOBET - Header Extra Butonlar
   Desktop: header__actions içine yan yana
   Mobil: header altına ortalanmış bar olarak
   ===================================================== */

(function() {
    'use strict';

    // Önceki instance'ı temizle (tekrar enjekte edilebilmesi için)
    if (window._mitoIntervals) {
        window._mitoIntervals.forEach(function(id) { clearInterval(id); });
    }
    window._mitoIntervals = [];

    // Font Awesome kaldırıldı (ikonlar kullanılmıyor)

    var lastMitoPath = '';

    function getLang() {
        var path = window.location.pathname;
        if (path.indexOf('/en') === 0 || path === '/en') return 'en';
        return 'tr';
    }

    /** SPA: URL değişince üst bar ve butonları mevcut dile göre yeniden oluştur */
    function refreshMitoLang() {
        var path = window.location.pathname;
        if (path === lastMitoPath) return;
        lastMitoPath = path;

        var topbar = document.querySelector('.mito-topbar');
        if (topbar) topbar.remove();

        var headerActions = document.querySelector('.header__actions');
        if (headerActions) {
            headerActions.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(el) { el.remove(); });
        }

        var mobileBar = document.querySelector('.mito-mobile-bar');
        if (mobileBar) mobileBar.remove();

        addTopBar();
        if (window.innerWidth > 992) {
            addDesktopButtons();
        } else {
            addMobileBar();
            fixMobileHeaderHeight();
        }
        setupPromoSlidersForCurrentButtons();
    }

    /** Yeni eklenen promo butonlarına slider kur (SPA refresh sonrası) */
    function setupPromoSlidersForCurrentButtons() {
        setTimeout(function() {
            document.querySelectorAll('.mito-header-btn--promo, .mito-mobile-btn--promo').forEach(setupPromoSlider);
        }, 300);
    }

    // ===== EN DİL SEÇENEĞİNİ GİZLE =====
    function hideEnglishOption() {
        document.querySelectorAll('.sidebar__lang-menu a, .sidebar__lang-small-menu a').forEach(function(a) {
            var txt = (a.textContent || '').trim().toUpperCase();
            if (txt === 'EN' || txt === 'ENGLISH') {
                var li = a.closest('li');
                if (li) li.style.setProperty('display', 'none', 'important');
            }
        });
    }


    // ===== PROMO TEXT SLİDER =====
    var promoTexts = ['PROMOSYONLAR', 'HEMEN KAZAN', 'BONUSLAR'];
    var promoTextsEn = ['PROMOTIONS', 'WIN NOW', 'BONUSES'];
    var promoIdx = 0;
    var sliding = false;

    function getPromoTexts() {
        return getLang() === 'en' ? promoTextsEn : promoTexts;
    }

    function setupPromoSlider(btn) {
        if (!btn || btn.getAttribute('data-mito-slider')) return;
        btn.setAttribute('data-mito-slider', '1');

        var textEl = btn.querySelector('.mito-btn-text');
        var isDesktop = !!textEl;
        var cs = getComputedStyle(btn);
        var lineH = parseInt(cs.fontSize) || 12;
        var texts = getPromoTexts();

        // Buton boyutunu sabitle
        var rect = btn.getBoundingClientRect();
        btn.style.setProperty('width', rect.width + 'px', 'important');
        btn.style.setProperty('min-width', rect.width + 'px', 'important');
        btn.style.setProperty('max-width', rect.width + 'px', 'important');
        btn.style.setProperty('height', rect.height + 'px', 'important');
        btn.style.setProperty('min-height', rect.height + 'px', 'important');
        btn.style.setProperty('max-height', rect.height + 'px', 'important');

        // En uzun text genişliği (mevcut dil)
        var measure = document.createElement('span');
        measure.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:' + cs.font + ';letter-spacing:' + cs.letterSpacing + ';';
        document.body.appendChild(measure);
        var maxW = 0;
        texts.forEach(function(t) { measure.textContent = t; if (measure.offsetWidth > maxW) maxW = measure.offsetWidth; });
        document.body.removeChild(measure);

        // Mask
        var mask = document.createElement('span');
        mask.className = 'mito-slider-mask';
        mask.style.cssText = 'display:inline-block;position:relative;overflow:hidden;' +
            'height:' + lineH + 'px;line-height:' + lineH + 'px;vertical-align:middle;' +
            'width:' + maxW + 'px;text-align:center;';

        // A span (görünür, mevcut dildeki sıradaki metin)
        var spanA = document.createElement('span');
        spanA.className = 'mito-slide-a';
        spanA.style.cssText = 'display:block;position:absolute;left:0;right:0;top:0;height:' + lineH + 'px;' +
            'line-height:' + lineH + 'px;white-space:nowrap;text-align:center;' +
            'will-change:transform;backface-visibility:hidden;';
        spanA.textContent = texts[promoIdx % texts.length];

        // B span (aşağıda bekliyor)
        var spanB = document.createElement('span');
        spanB.className = 'mito-slide-b';
        spanB.style.cssText = 'display:block;position:absolute;left:0;right:0;top:0;height:' + lineH + 'px;' +
            'line-height:' + lineH + 'px;white-space:nowrap;text-align:center;' +
            'will-change:transform;backface-visibility:hidden;' +
            'transform:translateY(' + lineH + 'px);';

        mask.appendChild(spanA);
        mask.appendChild(spanB);

        if (isDesktop) {
            textEl.textContent = '';
            textEl.appendChild(mask);
        } else {
            var sweepEl = btn.querySelector('.mito-sweep');
            btn.textContent = '';
            btn.appendChild(mask);
            if (sweepEl) btn.appendChild(sweepEl);
        }
    }

    function startPromoSlider() {
        setTimeout(function() {
            document.querySelectorAll('.mito-header-btn--promo, .mito-mobile-btn--promo').forEach(setupPromoSlider);
        }, 500);

        var id = setInterval(function() {
            if (sliding) return;
            sliding = true;
            var texts = getPromoTexts();
            promoIdx = (promoIdx + 1) % texts.length;
            var newText = texts[promoIdx];

            document.querySelectorAll('.mito-slider-mask').forEach(function(mask) {
                var spanA = mask.querySelector('.mito-slide-a');
                var spanB = mask.querySelector('.mito-slide-b');
                if (!spanA || !spanB) return;

                var h = mask.offsetHeight;

                // B'yi aşağıda hazırla
                spanB.textContent = newText;
                spanB.style.transition = 'none';
                spanB.style.transform = 'translateY(' + h + 'px)';

                // Reflow zorla
                void spanB.offsetHeight;

                // Aynı anda ikisini de kaydır
                requestAnimationFrame(function() {
                    spanA.style.transition = 'transform 0.5s ease-in-out';
                    spanB.style.transition = 'transform 0.5s ease-in-out';
                    spanA.style.transform = 'translateY(-' + h + 'px)';
                    spanB.style.transform = 'translateY(0)';
                });

                // Bitince A'yı resetle
                setTimeout(function() {
                    spanA.style.transition = 'none';
                    spanA.textContent = newText;
                    spanA.style.transform = 'translateY(0)';
                    spanB.style.transition = 'none';
                    spanB.style.transform = 'translateY(' + h + 'px)';
                    sliding = false;
                }, 550);
            });
        }, 3000);
        window._mitoIntervals.push(id);
    }

    // ===== CANLI DESTEK PULSE (sadece desktop) =====
    function startSupportPulse() {
        var on = false;
        var id = setInterval(function() {
            on = !on;
            // Sadece desktop butonuna uygula
            var btns = document.querySelectorAll('.mito-header-btn--support');
            btns.forEach(function(btn) {
                btn.style.borderColor = on ? 'rgba(74, 222, 128, 0.6)' : 'rgba(207, 174, 109, 0.45)';
                btn.style.boxShadow = on ? '0 0 10px rgba(74, 222, 128, 0.25)' : 'none';
            });
        }, 1200);
        window._mitoIntervals.push(id);
    }

    // ===== PROMO SWEEP IŞIK =====
    function addSweepToBtn(btn) {
        if (!btn || btn.querySelector('.mito-sweep')) return;
        var sweep = document.createElement('span');
        sweep.className = 'mito-sweep';
        sweep.style.cssText = 'position:absolute;top:0;left:-60%;width:30%;height:100%;' +
            'background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);' +
            'transform:skewX(-20deg);pointer-events:none;z-index:2;opacity:0.8;';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(sweep);

        function runSweep() {
            sweep.style.transition = 'none';
            sweep.style.left = '-60%';
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    sweep.style.transition = 'left 0.7s ease-in-out';
                    sweep.style.left = '130%';
                });
            });
        }
        runSweep();
        var id = setInterval(runSweep, 3500);
        window._mitoIntervals.push(id);
    }

    // ===== CSS TRANSITION INJECT =====
    function injectAnimationCSS() {
        if (document.getElementById('mito-anim-css')) return;
        var style = document.createElement('style');
        style.id = 'mito-anim-css';
        style.textContent =
            '.mito-header-btn--promo .mito-btn-text,' +
            '.mito-mobile-btn--promo {' +
            '  transition: opacity 0.3s ease !important;' +
            '}' +
            '.mito-header-btn--support,' +
            '.mito-mobile-btn--support {' +
            '  transition: border-color 0.6s ease, box-shadow 0.6s ease !important;' +
            '}';
        document.head.appendChild(style);
    }

    // ===== ÜST BANNER (Sonraki Domain) =====
    function getNextDomain() {
        var host = window.location.hostname; // örn: mitobet274.com
        var match = host.match(/^(mitobet)(\d+)\.(.+)$/i);
        if (match) {
            var prefix = match[1];
            var num = parseInt(match[2]);
            var tld = match[3];
            return prefix + (num + 1) + '.' + tld;
        }
        return null;
    }

    function addTopBar() {
        if (document.querySelector('.mito-topbar')) return;
        var header = document.querySelector('#header') || document.querySelector('header');
        if (!header) return;

        var lang = getLang();
        var nextDomain = getNextDomain();
        var topbar = document.createElement('div');
        topbar.className = 'mito-topbar';
        topbar.setAttribute('data-mito-extra', 'topbar');

        var labelNext = lang === 'en' ? 'Next address:' : 'Sıradaki adresimiz:';
        var labelLogin = lang === 'en' ? 'Current login:' : 'Güncel Giriş:';
        var linkHref = 'https://mitogir.com/mito';

        if (nextDomain) {
            topbar.innerHTML = '<span>' + labelNext + '</span> <a href="' + linkHref + '" target="_blank">' + nextDomain + '</a>';
        } else {
            topbar.innerHTML = '<span>' + labelLogin + '</span> <a href="' + linkHref + '" target="_blank">mito.ws</a>';
        }

        header.parentNode.insertBefore(topbar, header);
    }

    // ===== DESKTOP BUTONLARI =====
    function addDesktopButtons() {
        if (window.innerWidth <= 992) return;
        addTopBar();

        var headerActions = document.querySelector('.header__actions');
        if (!headerActions) return;
        if (headerActions.querySelector('.mito-header-btn')) return;

        var lang = getLang();
        var firstExisting = headerActions.firstChild;

        var tvBtn = document.createElement('a');
        tvBtn.href = 'https://mitotv.live/';
        tvBtn.target = '_blank';
        tvBtn.className = 'mito-header-btn mito-header-btn--tv';
        tvBtn.innerHTML = '<span class="mito-tv-icon">&#9654;</span> <span class="mito-btn-text">TV</span>';
        tvBtn.setAttribute('data-mito-extra', 'tv');

        var promoBtn = document.createElement('a');
        promoBtn.href = '/promotions';
        promoBtn.className = 'mito-header-btn mito-header-btn--promo';
        promoBtn.innerHTML = '<span class="mito-btn-text">' + (lang === 'en' ? 'PROMOTIONS' : 'PROMOSYONLAR') + '</span>';
        promoBtn.setAttribute('data-mito-extra', 'promo');

        var supportBtn = document.createElement('button');
        supportBtn.type = 'button';
        supportBtn.className = 'mito-header-btn mito-header-btn--support';
        supportBtn.innerHTML = '<span class="mito-live-dot"></span><span class="mito-btn-text">' + (lang === 'en' ? 'LIVE SUPPORT' : 'CANLI DESTEK') + '</span>';
        supportBtn.setAttribute('data-mito-extra', 'support');

        var divider = document.createElement('span');
        divider.className = 'mito-header-divider';
        divider.setAttribute('data-mito-extra', 'divider');

        var tgBtn = document.createElement('a');
        tgBtn.href = 'https://t.me/mitoresmi';
        tgBtn.target = '_blank';
        tgBtn.className = 'mito-header-btn mito-header-btn--telegram';
        tgBtn.innerHTML = '<span class="mito-btn-text">TELEGRAM</span>';
        tgBtn.setAttribute('data-mito-extra', 'telegram');

        headerActions.insertBefore(tvBtn, firstExisting);
        headerActions.insertBefore(promoBtn, firstExisting);
        headerActions.insertBefore(supportBtn, firstExisting);
        headerActions.insertBefore(tgBtn, firstExisting);
        headerActions.insertBefore(divider, firstExisting);

        // Butonlar eklendikten sonra sweep ekle
        setTimeout(function() { addSweepToBtn(promoBtn); }, 200);

    }

    // ===== MOBİL BAR =====
    function addMobileBar() {
        if (window.innerWidth > 992) return;
        if (document.querySelector('.mito-mobile-bar')) return;

        var header = document.querySelector('#header') || document.querySelector('header');
        if (!header) return;

        var lang = getLang();

        var bar = document.createElement('div');
        bar.className = 'mito-mobile-bar';
        bar.setAttribute('data-mito-extra', 'mobile-bar');

        var tvBtn = document.createElement('a');
        tvBtn.href = 'https://mitotv.live/';
        tvBtn.target = '_blank';
        tvBtn.className = 'mito-mobile-btn mito-mobile-btn--tv';
        tvBtn.innerHTML = '<span class="mito-tv-icon">&#9654;</span> TV';

        var promoBtn = document.createElement('a');
        promoBtn.href = '/promotions';
        promoBtn.className = 'mito-mobile-btn mito-mobile-btn--promo';
        promoBtn.textContent = (lang === 'en' ? 'PROMOTIONS' : 'PROMOSYONLAR');
        promoBtn.style.position = 'relative';
        promoBtn.style.overflow = 'hidden';

        var supportBtn = document.createElement('button');
        supportBtn.type = 'button';
        supportBtn.className = 'mito-mobile-btn mito-mobile-btn--support';
        supportBtn.innerHTML = '<span class="mito-live-dot"></span> ' + (lang === 'en' ? 'LIVE SUPPORT' : 'CANLI DESTEK');

        var tgBtn = document.createElement('a');
        tgBtn.href = 'https://t.me/mitoresmi';
        tgBtn.target = '_blank';
        tgBtn.className = 'mito-mobile-btn mito-mobile-btn--telegram';
        tgBtn.innerHTML = 'TELEGRAM';

        bar.appendChild(tvBtn);
        bar.appendChild(promoBtn);
        bar.appendChild(supportBtn);
        bar.appendChild(tgBtn);

        addTopBar();
        header.parentNode.insertBefore(bar, header.nextSibling);

        // Butonlar eklendikten sonra sweep ekle
        setTimeout(function() { addSweepToBtn(promoBtn); }, 200);

    }

    // Mobilde header yükseklik fix
    function fixMobileHeaderHeight() {
        if (window.innerWidth > 992) return;
        var els = [
            { sel: '#header', css: { height: '50px', 'max-height': '50px', 'min-height': '0', padding: '0', overflow: 'visible' } },
            { sel: '#header .container', css: { height: '50px', padding: '0 12px' } },
            { sel: '#header .container .row', css: { height: '50px', margin: '0' } },
            { sel: '#header .container .row > .col-12', css: { height: '50px', padding: '0' } },
            { sel: '.header__content', css: { height: '50px', 'max-height': '50px', 'min-height': '0', padding: '0', overflow: 'visible', display: 'flex', 'align-items': 'center' } }
        ];
        els.forEach(function(item) {
            var el = document.querySelector(item.sel);
            if (el) {
                Object.keys(item.css).forEach(function(prop) {
                    el.style.setProperty(prop, item.css[prop], 'important');
                });
            }
        });
    }

    function init() {
        lastMitoPath = window.location.pathname;
        injectAnimationCSS();
        hideEnglishOption();

        if (window.innerWidth > 992) {
            addDesktopButtons();
        } else {
            addMobileBar();
            fixMobileHeaderHeight();
        }

        // SPA: URL değişince (dil değişimi) metinleri güncelle
        window.addEventListener('popstate', function() { refreshMitoLang(); });
        var origPush = history.pushState;
        var origReplace = history.replaceState;
        history.pushState = function() {
            origPush.apply(this, arguments);
            refreshMitoLang();
        };
        history.replaceState = function() {
            origReplace.apply(this, arguments);
            refreshMitoLang();
        };

        // Animasyonları başlat
        startPromoSlider();
        startSupportPulse();

        // SPA desteği
        var observer = new MutationObserver(function() {
            if (window.innerWidth > 992) {
                var headerActions = document.querySelector('.header__actions');
                if (headerActions && !headerActions.querySelector('.mito-header-btn')) {
                    addDesktopButtons();
                }
            } else {
                if (!document.querySelector('.mito-mobile-bar')) {
                    addMobileBar();
                }
                fixMobileHeaderHeight();
            }
            hideEnglishOption();
        });

        var root = document.getElementById('root');
        if (root) {
            observer.observe(root, { childList: true, subtree: true });
        }

        var cleanCount = 0;
        var cleanTimer = setInterval(function() {
            hideEnglishOption();
            cleanCount++;
            if (cleanCount >= 30) clearInterval(cleanTimer);
        }, 1500);
        window._mitoIntervals.push(cleanTimer);

        // Resize
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                addTopBar();
                if (window.innerWidth > 992) {
                    var mobileBar = document.querySelector('.mito-mobile-bar');
                    if (mobileBar) mobileBar.remove();
                    var headerActions = document.querySelector('.header__actions');
                    if (headerActions && !headerActions.querySelector('.mito-header-btn')) {
                        addDesktopButtons();
                    }
                    document.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(b) { b.style.display = ''; });
                } else {
                    document.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(b) { b.style.display = 'none'; });
                    if (!document.querySelector('.mito-mobile-bar')) {
                        addMobileBar();
                    }
                }
            }, 200);
        });

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
    } else {
        setTimeout(init, 500);
    }

})();


/* ===== active/SCRIPT/footer_marquee.js ===== */
/* =====================================================
   MITOBET - Footer: Sağlayıcılar Collapse + Para Birimleri İsim Ekleme
   ===================================================== */

(function() {
    'use strict';

    /* ——————————————————————————————————————————————————
       1. SAGLAYICILAR COLLAPSE TOGGLE
       —————————————————————————————————————————————————— */

    var TOGGLE_TEXT_SHOW = '▼  Tümünü Gör';
    var TOGGLE_TEXT_HIDE = '▲  Gizle';

    function setupProvidersCollapse() {
        var grid = document.querySelector('#footer-providers-section #providers-grid');
        if (!grid) return;
        if (grid.getAttribute('data-mito-collapse-ready')) return;

        var parent = grid.parentElement;
        if (!parent) return;

        var itemCount = grid.querySelectorAll('.provider-item').length || 93;

        var btn = document.createElement('button');
        btn.className = 'mito-providers-toggle';
        btn.type = 'button';
        btn.innerHTML = '<span>' + TOGGLE_TEXT_SHOW + ' (' + itemCount + ')</span> <span class="mito-toggle-arrow">▼</span>';

        var isOpen = false;

        btn.addEventListener('click', function() {
            isOpen = !isOpen;
            if (isOpen) {
                grid.classList.add('mito-expanded');
                btn.classList.add('mito-expanded');
                btn.querySelector('span:first-child').textContent = TOGGLE_TEXT_HIDE;
            } else {
                grid.classList.remove('mito-expanded');
                btn.classList.remove('mito-expanded');
                btn.querySelector('span:first-child').textContent = TOGGLE_TEXT_SHOW + ' (' + itemCount + ')';
                var rect = grid.getBoundingClientRect();
                if (rect.top < 0) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        if (grid.nextSibling) {
            parent.insertBefore(btn, grid.nextSibling);
        } else {
            parent.appendChild(btn);
        }

        grid.setAttribute('data-mito-collapse-ready', '1');
    }

    /* ——————————————————————————————————————————————————
       2. KABUL EDILEN PARA BIRIMLERI — İkon yanına isim ekle
       —————————————————————————————————————————————————— */

    // Kripto ikon dosya adı → kısa isim eşleştirmesi
    // CMS'deki img src'den dosya adını alıp eşleştiriyoruz
    var CURRENCY_MAP = {
        // Yaygın eşleştirmeler (img src'deki anahtar kelimeler)
        'try': 'TRY',
        'tl': 'TRY',
        'lira': 'TRY',
        'btc': 'BTC',
        'bitcoin': 'BTC',
        'eth': 'ETH',
        'ethereum': 'ETH',
        'usdt': 'USDT',
        'tether': 'USDT',
        'bnb': 'BNB',
        'binance': 'BNB',
        'trx': 'TRX',
        'tron': 'TRX',
        'xrp': 'XRP',
        'ripple': 'XRP',
        'doge': 'DOGE',
        'dogecoin': 'DOGE',
        'ltc': 'LTC',
        'litecoin': 'LTC',
        'usdc': 'USDC',
        'usd-coin': 'USDC',
        'dai': 'DAI',
        'sol': 'SOL',
        'solana': 'SOL',
        'ada': 'ADA',
        'cardano': 'ADA',
        'avax': 'AVAX',
        'avalanche': 'AVAX',
        'dot': 'DOT',
        'polkadot': 'DOT',
        'matic': 'MATIC',
        'polygon': 'MATIC',
        'shib': 'SHIB',
        'shiba': 'SHIB',
        'atom': 'ATOM',
        'cosmos': 'ATOM',
        'link': 'LINK',
        'chainlink': 'LINK',
        'uni': 'UNI',
        'uniswap': 'UNI',
        'xlm': 'XLM',
        'stellar': 'XLM',
        'eur': 'EUR',
        'euro': 'EUR',
        'usd': 'USD',
        'dollar': 'USD',
        'gbp': 'GBP',
        'pound': 'GBP',
        'rub': 'RUB',
        'ruble': 'RUB'
    };

    function guessCurrencyName(imgSrc) {
        if (!imgSrc) return null;
        // URL'den dosya adını al, küçük harfe çevir
        var parts = imgSrc.toLowerCase().split('/');
        var filename = parts[parts.length - 1] || '';
        // Uzantıyı kaldır
        filename = filename.replace(/\.(png|jpg|jpeg|svg|webp|gif).*$/i, '');

        // Tam eşleştirme dene
        if (CURRENCY_MAP[filename]) return CURRENCY_MAP[filename];

        // Parçalı eşleştirme — dosya adı içinde anahtar kelime ara
        var keys = Object.keys(CURRENCY_MAP);
        for (var i = 0; i < keys.length; i++) {
            if (filename.indexOf(keys[i]) > -1) {
                return CURRENCY_MAP[keys[i]];
            }
        }

        // Alt attribute'dan dene
        return null;
    }

    function setupCurrencyLabels() {
        // Sadece "KABUL EDİLEN PARA BİRİMLERİ" bölümü (footer-payment-methods DEĞİL)
        var currencyDivs = document.querySelectorAll('.footer__currencies:not(#footer-payment-methods)');

        currencyDivs.forEach(function(div) {
            if (div.getAttribute('data-mito-labels-done')) return;

            var wrappers = div.querySelectorAll('ul.footer__accepted .instrument-icon-wrapper');
            if (!wrappers.length) return;

            wrappers.forEach(function(wrapper) {
                // Zaten label eklenmiş mi?
                if (wrapper.querySelector('.mito-currency-label')) return;

                var img = wrapper.querySelector('img');
                if (!img) return;

                // İsim bul: önce alt, sonra title, sonra src'den tahmin
                var name = null;
                var alt = (img.getAttribute('alt') || '').trim();
                var title = (img.getAttribute('title') || '').trim();

                if (alt && alt.length <= 10) {
                    name = alt.toUpperCase();
                } else if (title && title.length <= 10) {
                    name = title.toUpperCase();
                } else {
                    name = guessCurrencyName(img.src || img.getAttribute('src'));
                }

                if (!name) {
                    // Alt'tan uzun isim varsa kısalt
                    if (alt) {
                        name = alt.substring(0, 5).toUpperCase();
                    } else {
                        return; // İsim bulunamadı, span ekleme
                    }
                }

                var label = document.createElement('span');
                label.className = 'mito-currency-label';
                label.textContent = name;
                wrapper.appendChild(label);
            });

            div.setAttribute('data-mito-labels-done', '1');
        });
    }

    /* ——————————————————————————————————————————————————
       3. INIT
       —————————————————————————————————————————————————— */

    function init() {
        setupProvidersCollapse();
        setupCurrencyLabels();

        // Footer geç yüklenebilir
        var targets = [
            document.querySelector('#footer'),
            document.querySelector('footer'),
            document.querySelector('.footer__content'),
            document.querySelector('#main__content')
        ];

        targets.forEach(function(target) {
            if (!target) return;
            try {
                var observer = new MutationObserver(function() {
                    setupProvidersCollapse();
                    setupCurrencyLabels();
                });
                observer.observe(target, { childList: true, subtree: true });
            } catch(e) {}
        });

        setTimeout(function() { setupProvidersCollapse(); setupCurrencyLabels(); }, 3000);
        setTimeout(function() { setupProvidersCollapse(); setupCurrencyLabels(); }, 6000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
    } else {
        setTimeout(init, 1500);
    }
})();


/* ===== active/SCRIPT/popup.js ===== */
// MITOBET - Elit Premium Gorsel Popup
(function() {
    'use strict';

    var POPUP_IMAGE = 'https://wsrv.nl/?url=' + encodeURIComponent('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/Fdya0LCGCbzVyw9LIRdZRwf2V8pRGeUDt79MoN5T.png') + '&w=800&q=80';
    var POPUP_LINK = window.location.origin + '/tr/promotion/1000-tlye-1000-tl-nakit-bonus';
    var POPUP_DELAY = 3000;
    var PARTICLE_COUNT = 8;
    var POPUP_STORY_WAIT_MAX = 120;
    var popupStoryWaitCount = 0;

    function isZuckStoryOpen() {
        var m = document.getElementById('zuck-modal');
        return !!(m && m.classList.contains('show'));
    }

    function injectStyles() {
        if (document.getElementById('mito-popup-css')) return;
        var s = document.createElement('style');
        s.id = 'mito-popup-css';
        s.textContent =
            '@keyframes mpFadeIn{0%{opacity:0}100%{opacity:1}}' +
            '@keyframes mpSlideIn{0%{transform:scale(.92) translateY(18px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}' +
            '@keyframes mpFadeOut{0%{opacity:1}100%{opacity:0}}' +
            '@keyframes mpSlideOut{0%{transform:scale(1) translateY(0);opacity:1}100%{transform:scale(.92) translateY(18px);opacity:0}}' +
            '@keyframes mpBorder{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}' +
            '@keyframes mpShine{0%{left:-120%}100%{left:120%}}' +
            '@keyframes mpFloat{0%{transform:translateY(0) scale(1);opacity:.6}100%{transform:translateY(-100px) scale(0);opacity:0}}' +
            '@keyframes mpCloseIn{0%{transform:scale(0) rotate(-90deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}' +

            '#mito-popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;' +
                'background:rgba(0,0,0,.88);' +
                'display:flex;justify-content:center;align-items:center;z-index:999998;' +
                'animation:mpFadeIn .35s ease-out forwards;' +
                '}' +
            '#mito-popup-overlay.mp-closing{animation:mpFadeOut .3s ease-in forwards}' +

            '.mp-box{position:relative;overflow:visible;' +
                'animation:mpSlideIn .45s cubic-bezier(.22,.9,.36,1) .08s both}' +
            '.mp-box.mp-closing{animation:mpSlideOut .3s ease-in forwards}' +

            '.mp-border{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:13px;' +
                'background:linear-gradient(135deg,#cfae6d,#f5d98a,#8a6d2f,#cfae6d,#f5d98a);' +
                'background-size:400% 400%;animation:mpBorder 6s linear infinite;z-index:0}' +

            '.mp-content{position:relative;z-index:1;border-radius:12px;overflow:hidden;line-height:0}' +

            '.mp-img-wrap{display:block;position:relative;overflow:hidden;cursor:pointer;line-height:0}' +
            '.mp-img-wrap::after{content:"";position:absolute;top:0;left:-120%;width:60%;height:100%;' +
                'background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);' +
                'transform:skewX(-18deg);pointer-events:none;animation:mpShine 5s ease-in-out 2s infinite}' +
            '.mp-img{width:100%;height:auto;display:block;transition:transform .5s cubic-bezier(.25,.46,.45,.94),filter .5s ease}' +
            '.mp-img-wrap:hover .mp-img{transform:scale(1.025);filter:brightness(1.08)}' +

            '.mp-close{position:absolute;top:-10px;right:-10px;width:28px;height:28px;' +
                'border:1px solid rgba(207,174,109,.5);background:rgba(10,10,20,.9);color:rgba(207,174,109,.8);' +
                'font-size:14px;line-height:1;border-radius:50%;cursor:pointer;' +
                'display:flex;justify-content:center;align-items:center;z-index:10;' +
                'transition:all .3s ease;animation:mpCloseIn .35s ease .45s both;' +
                '}' +
            '.mp-close:hover{background:#cfae6d;color:#0a0a14;border-color:#cfae6d;' +
                'transform:rotate(90deg) scale(1.1)}' +

            '.mp-particles{position:absolute;top:0;left:0;width:100%;height:100%;' +
                'pointer-events:none;overflow:hidden;z-index:0;border-radius:13px}' +
            '.mp-dot{position:absolute;bottom:-6px;border-radius:50%;' +
                'animation:mpFloat linear infinite;opacity:.6}' +

            '@media(max-width:768px){' +
                '.mp-box{width:95vw;max-width:800px}' +
                '.mp-close{top:-14px;right:-14px;width:36px;height:36px;font-size:18px}' +
            '}' +
            '@media(min-width:769px){.mp-box{width:800px}}';
        document.head.appendChild(s);
    }

    function createParticles(container) {
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            var dot = document.createElement('span');
            dot.className = 'mp-dot';
            var size = 1.5 + Math.random() * 2.5;
            var left = Math.random() * 100;
            var dur = 3 + Math.random() * 5;
            var delay = Math.random() * 6;
            var alpha = (0.3 + Math.random() * 0.4).toFixed(2);
            dot.style.cssText =
                'left:' + left + '%;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:rgba(207,174,109,' + alpha + ');' +
                'box-shadow:0 0 ' + (size + 1) + 'px rgba(207,174,109,.2);' +
                'animation-duration:' + dur + 's;' +
                'animation-delay:' + delay + 's;';
            container.appendChild(dot);
        }
    }

    function showPopup() {
        try {
            if (document.body.dataset.mitoPopupShown === '1' || document.getElementById('mito-popup-overlay')) return;
            if (isZuckStoryOpen()) {
                if (popupStoryWaitCount < POPUP_STORY_WAIT_MAX) {
                    popupStoryWaitCount++;
                    setTimeout(showPopup, 450);
                }
                return;
            }
            popupStoryWaitCount = 0;
            injectStyles();

        var overlay = document.createElement('div');
        overlay.id = 'mito-popup-overlay';

        var box = document.createElement('div');
        box.className = 'mp-box';

        var particles = document.createElement('div');
        particles.className = 'mp-particles';
        createParticles(particles);

        var border = document.createElement('div');
        border.className = 'mp-border';

        var content = document.createElement('div');
        content.className = 'mp-content';

        var imgWrap = document.createElement('a');
        imgWrap.className = 'mp-img-wrap';
        imgWrap.href = POPUP_LINK;
        imgWrap.target = '_self';

        var img = document.createElement('img');
        img.className = 'mp-img';
        img.src = POPUP_IMAGE;
        img.alt = 'Mitobet Kampanya';
        img.draggable = false;

        var closeBtn = document.createElement('button');
        closeBtn.className = 'mp-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Kapat');
        closeBtn.innerHTML = '&#10005;';

        var closed = false;
        function closePopup() {
            if (closed) return;
            closed = true;
            overlay.classList.add('mp-closing');
            box.classList.add('mp-closing');
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 320);
            document.body.dataset.mitoPopupShown = '1';
        }

        closeBtn.onclick = function(e) { e.stopPropagation(); closePopup(); };
        overlay.onclick = function(e) { if (e.target === overlay) closePopup(); };

        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closePopup();
                document.removeEventListener('keydown', onEsc);
            }
        });

        imgWrap.appendChild(img);
        content.appendChild(imgWrap);
        box.appendChild(particles);
        box.appendChild(border);
        box.appendChild(content);
        box.appendChild(closeBtn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        } catch(e) {
            console.warn('Mitobet popup error:', e);
            return;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(showPopup, POPUP_DELAY); });
    } else {
        setTimeout(showPopup, POPUP_DELAY);
    }
})();


/* ===== active/SCRIPT/sticky_menu_guard.js ===== */
(function() {
    'use strict';

    var BROKEN_INDICATORS = ['fixed', 'absolute'];
    var BROKEN_TRANSFORM = 'translateX(-100%)';

    function isBroken(el) {
        if (!el || !el.style) return false;
        var s = el.style;
        if (BROKEN_INDICATORS.indexOf(s.position) > -1) return true;
        if (s.transform && s.transform.indexOf('translateX') > -1) return true;
        if (s.width === '280px' || s.height === '100%') return true;
        return false;
    }

    function cleanInlineStyle(el) {
        if (!el) return;
        var props = [
            'position', 'top', 'left', 'right', 'bottom',
            'width', 'height', 'max-width', 'max-height',
            'transform', 'transition',
            'z-index', 'overflow', 'overflow-y', 'overflow-x',
            'box-shadow', 'background-color', 'background'
        ];
        for (var i = 0; i < props.length; i++) {
            el.style.removeProperty(props[i]);
        }
    }

    function guardAll() {
        var menus = document.querySelectorAll('#tabbar .inner-menu, .lowbar .inner-menu');
        for (var i = 0; i < menus.length; i++) {
            if (isBroken(menus[i])) {
                cleanInlineStyle(menus[i]);
            }
        }
    }

    function startObserver() {
        var tabbar = document.getElementById('tabbar');
        if (!tabbar) return;

        var obs = new MutationObserver(function(muts) {
            for (var i = 0; i < muts.length; i++) {
                var m = muts[i];
                if (m.type === 'attributes') {
                    var t = m.target;
                    if (t.classList && t.classList.contains('inner-menu') && isBroken(t)) {
                        cleanInlineStyle(t);
                    }
                }
                if (m.type === 'childList') {
                    guardAll();
                }
            }
        });

        obs.observe(tabbar, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    function init() {
        guardAll();
        startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    var guardInterval = setInterval(guardAll, 1000);
    setTimeout(function() { clearInterval(guardInterval); }, 30000);

    window.addEventListener('popstate', function() { setTimeout(guardAll, 100); });
    var origPush = history.pushState;
    var origReplace = history.replaceState;
    history.pushState = function() {
        origPush.apply(this, arguments);
        setTimeout(guardAll, 100);
        setTimeout(guardAll, 500);
    };
    history.replaceState = function() {
        origReplace.apply(this, arguments);
        setTimeout(guardAll, 100);
        setTimeout(guardAll, 500);
    };
})();


/* ===== active/SCRIPT/stories_loader.js ===== */
(function() {
    'use strict';

    var PROXY = 'https://wsrv.nl/?url=';

    var RAW_IMG_FIRST = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/h538dzAsLntt2yKFzLOhNELZ1Kd5O5KAmAXgdwac.png';
    var RAW_IMG_1 = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/74Lny8THQCnRaGYc6dLs2Zx1wiig7UgMg4dpH5Zw.jpg';
    var RAW_IMG_2 = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/tv9PveV1lEVjh7bOlwkRmjcWL3aB30w9QzIH3ysP.jpg';

    var STORIES = [
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_FIRST) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_FIRST) + '&w=720&q=80&output=webp',
            link:   'https://mitogir.com/mito',
            linkText: 'Detaylar',
            duration: 5000
        },
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_1) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_1) + '&w=720&q=80&output=webp',
            link:   window.location.origin + '/tr/promotion/1000-tlye-1000-tl-nakit-bonus',
            linkText: 'Detaylar',
            duration: 5000
        },
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_2) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_2) + '&w=720&q=80&output=webp',
            link:   window.location.origin + '/tr/promotion/15-yatirim-bonusu-10-kayip-bonusu',
            linkText: 'Detaylar',
            duration: 5000
        }
    ];

    var currentIdx = 0;
    var storyTimer = null;
    var isOpen = false;
    var booted = false;
    var touchStartX = 0;
    var touchStartY = 0;
    var mouseStartX = 0;
    var mouseStartY = 0;
    var swipeGuard = false;

    var elModal = null;
    var elImg = null;
    var elBar = null;
    var elLink = null;

    function clearTimer() {
        if (storyTimer !== null) {
            clearTimeout(storyTimer);
            storyTimer = null;
        }
    }

    function resetBar() {
        if (!elBar) return;
        elBar.style.transition = 'none';
        elBar.style.width = '0%';
        elBar.offsetWidth;
    }

    function startBar(duration) {
        resetBar();
        setTimeout(function() {
            if (!elBar) return;
            elBar.style.transition = 'width ' + (duration / 1000) + 's linear';
            elBar.style.width = '100%';
        }, 30);
    }

    function openStory(idx) {
        if (!elModal) return;
        clearTimer();
        currentIdx = idx;
        var story = STORIES[idx];

        elImg.src = story.src;
        elLink.href = story.link;

        if (!isOpen) {
            isOpen = true;
            document.body.style.overflow = 'hidden';
            elModal.style.display = 'flex';
            setTimeout(function() {
                elModal.classList.add('ms-open');
            }, 10);
        }

        startBar(story.duration);
        storyTimer = setTimeout(function() {
            nextStory();
        }, story.duration);
    }

    function closeStory() {
        if (!elModal) return;
        clearTimer();
        resetBar();
        isOpen = false;
        elModal.classList.remove('ms-open');
        document.body.style.overflow = '';
        setTimeout(function() {
            if (!isOpen) {
                elModal.style.display = 'none';
                if (elImg) elImg.src = '';
            }
        }, 300);
    }

    function nextStory() {
        clearTimer();
        if (currentIdx < STORIES.length - 1) {
            openStory(currentIdx + 1);
        } else {
            closeStory();
        }
    }

    function prevStory() {
        clearTimer();
        if (currentIdx > 0) {
            openStory(currentIdx - 1);
        } else {
            openStory(0);
        }
    }

    function renderModal() {
        if (document.getElementById('ms-modal')) return;

        elModal = document.createElement('div');
        elModal.id = 'ms-modal';
        elModal.style.display = 'none';

        var progress = document.createElement('div');
        progress.className = 'ms-progress';
        elBar = document.createElement('div');
        elBar.className = 'ms-bar';
        progress.appendChild(elBar);

        elImg = document.createElement('img');
        elImg.className = 'ms-img';
        elImg.alt = '';

        var tapLeft = document.createElement('div');
        tapLeft.className = 'ms-tap-left';
        tapLeft.addEventListener('click', function(e) {
            e.stopPropagation();
            if (swipeGuard) { swipeGuard = false; return; }
            prevStory();
        });

        var tapRight = document.createElement('div');
        tapRight.className = 'ms-tap-right';
        tapRight.addEventListener('click', function(e) {
            e.stopPropagation();
            if (swipeGuard) { swipeGuard = false; return; }
            nextStory();
        });

        var closeBtn = document.createElement('button');
        closeBtn.className = 'ms-close';
        closeBtn.type = 'button';
        closeBtn.innerHTML = '&#10005;';
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeStory();
        });

        elLink = document.createElement('a');
        elLink.className = 'ms-link';
        elLink.target = '_self';
        elLink.innerHTML =
            '<svg class="ms-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="18 15 12 9 6 15"></polyline>' +
            '</svg>' +
            '<span>Detaylar</span>';
        elLink.addEventListener('click', function(e) {
            e.stopPropagation();
            clearTimer();
            var href = elLink.href;
            closeStory();
            if (href) window.location.href = href;
        });

        elModal.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        elModal.addEventListener('touchend', function(e) {
            var dx = e.changedTouches[0].clientX - touchStartX;
            var dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
            if (dx < 0) nextStory();
            else prevStory();
        }, { passive: true });

        elModal.addEventListener('mousedown', function(e) {
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            swipeGuard = false;
        });

        elModal.addEventListener('mouseup', function(e) {
            var dx = e.clientX - mouseStartX;
            var dy = e.clientY - mouseStartY;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
            swipeGuard = true;
            if (dx < 0) nextStory();
            else prevStory();
        });

        elModal.appendChild(progress);
        elModal.appendChild(elImg);
        elModal.appendChild(tapLeft);
        elModal.appendChild(tapRight);
        elModal.appendChild(closeBtn);
        elModal.appendChild(elLink);

        document.body.appendChild(elModal);
    }

    function renderWidget() {
        if (document.getElementById('mito-stories')) return;

        var container = document.createElement('div');
        container.id = 'mito-stories';

        for (var i = 0; i < STORIES.length; i++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.className = 'ms-avatar';
                btn.type = 'button';

                var img = document.createElement('img');
                img.src = STORIES[idx].avatar;
                img.alt = '';
                img.draggable = false;

                btn.appendChild(img);
                btn.addEventListener('click', function() {
                    openStory(idx);
                });
                container.appendChild(btn);
            })(i);
        }

        var slider = document.querySelector('.swiper')
            || document.querySelector('[class*="swiper"]')
            || document.querySelector('[class*="slider"]')
            || document.querySelector('[class*="carousel"]')
            || document.querySelector('[class*="banner"]');

        if (slider && slider.parentNode) {
            slider.parentNode.insertBefore(container, slider);
        } else {
            var main = document.getElementById('main__content')
                || document.getElementById('main')
                || document.querySelector('main');
            if (main) {
                main.insertBefore(container, main.firstChild);
            } else {
                document.body.appendChild(container);
            }
        }
    }

    function isHomePath() {
        var path = window.location.pathname.replace(/\/$/, '');
        return path === '' || /^\/[a-z]{2}$/.test(path);
    }

    function handleNav() {
        setTimeout(function() {
            if (window.innerWidth > 768) return;
            var widget = document.getElementById('mito-stories');
            if (isHomePath()) {
                if (!widget) renderWidget();
            } else {
                if (widget && widget.parentNode) widget.parentNode.removeChild(widget);
            }
        }, 200);
    }

    function boot() {
        if (booted) return;
        if (window.innerWidth > 768) return;
        if (!isHomePath()) return;
        booted = true;
        renderWidget();
        renderModal();

        window.addEventListener('popstate', handleNav);

        var origPush = history.pushState;
        history.pushState = function() {
            origPush.apply(this, arguments);
            handleNav();
        };
        var origReplace = history.replaceState;
        history.replaceState = function() {
            origReplace.apply(this, arguments);
            handleNav();
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();