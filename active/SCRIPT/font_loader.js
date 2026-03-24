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

    function addPreconnect() {
        if (document.querySelector('link[href="https://fonts.googleapis.com"]')) return;

        var l1 = document.createElement('link');
        l1.rel = 'preconnect';
        l1.href = 'https://fonts.googleapis.com';

        var l2 = document.createElement('link');
        l2.rel = 'preconnect';
        l2.href = 'https://fonts.gstatic.com';
        l2.crossOrigin = 'anonymous';

        document.head.insertBefore(l2, document.head.firstChild);
        document.head.insertBefore(l1, document.head.firstChild);
    }

    function addGoogleFonts() {
        var baseUrl = GOOGLE_FONTS_URL.split('?')[0];
        if (document.querySelector('link[href^="' + baseUrl + '"]')) return;

        var preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'style';
        preload.href = GOOGLE_FONTS_URL;
        document.head.appendChild(preload);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = GOOGLE_FONTS_URL;
        link.media = 'print';
        link.onload = function() { this.media = 'all'; };
        document.head.appendChild(link);
    }

    function injectStyles() {
        if (document.getElementById('mito-font-styles')) return;
        var style = document.createElement('style');
        style.id = 'mito-font-styles';
        style.textContent = FONT_STYLES;
        document.head.appendChild(style);
    }

    addPreconnect();
    addGoogleFonts();
    injectStyles();
})();
