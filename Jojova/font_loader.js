<script>
// Jojova Font Yükleyici - fonts.css'i dinamik yükler
(function() {
    'use strict';
    
    // Fonts.css zaten yüklü mü kontrol et
    function isFontCSSLoaded() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (let link of links) {
            if (link.href.includes('fonts.css')) {
                return true;
            }
        }
        return false;
    }
    
    // Fonts.css'i yükle
    function loadFontCSS() {
        if (isFontCSSLoaded()) {
            console.log('✅ fonts.css zaten yüklü');
            return;
        }
        
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.type = 'text/css';
        fontLink.href = 'fonts.css';
        fontLink.media = 'all';
        
        // CSS yüklenme durumunu takip et
        fontLink.onload = function() {
            console.log('✅ fonts.css başarıyla yüklendi (Poppins, Inter, Commissioner)');
            // Font yüklendikten sonra sayfa render'ını zorla güncelle
            document.body.style.opacity = '0.999';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 10);
        };
        
        fontLink.onerror = function() {
            console.warn('❌ fonts.css yüklenemedi');
        };
        
        // Head'in en başına ekle (diğer CSS'lerden önce)
        const firstLink = document.head.querySelector('link');
        if (firstLink) {
            document.head.insertBefore(fontLink, firstLink);
        } else {
            document.head.appendChild(fontLink);
        }
        
        console.log('📄 fonts.css yükleniyor... (Poppins, Inter, Commissioner)');
    }
    
    // Font preload için Google Fonts bağlantılarını ekle
    function addGoogleFontPreconnect() {
        // Preconnect zaten var mı kontrol et
        const existingPreconnect = document.querySelector('link[href="https://fonts.googleapis.com"]');
        if (existingPreconnect) {
            return;
        }
        
        // Preconnect linklerini ekle
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';
        
        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';
        
        document.head.appendChild(preconnect1);
        document.head.appendChild(preconnect2);
        
        console.log('🔗 Google Fonts preconnect eklendi');
    }
    
    // Direkt Google Fonts linkini de ekle (fallback)
    function addGoogleFontsDirectLink() {
        // Google Fonts linki zaten var mı kontrol et
        const existingGoogleLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
        if (existingGoogleLink) {
            return;
        }
        
        const googleFontLink = document.createElement('link');
        googleFontLink.rel = 'stylesheet';
        googleFontLink.href = 'https://fonts.googleapis.com/css2?family=Commissioner:wght,VOLM@100..900,37&family=Inter:opsz,wght@14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
        
        googleFontLink.onload = function() {
            console.log('✅ Google Fonts direkt linki yüklendi');
        };
        
        document.head.appendChild(googleFontLink);
        console.log('📄 Google Fonts direkt linki eklendi (fallback)');
    }
    
    // Ana başlatma fonksiyonu
    function initFontLoader() {
        // Google Fonts preconnect ekle
        addGoogleFontPreconnect();
        
        // fonts.css'i yükle
        loadFontCSS();
        
        // Fallback olarak direkt Google Fonts linkini de ekle
        setTimeout(() => {
            if (!isFontCSSLoaded()) {
                addGoogleFontsDirectLink();
            }
        }, 1000);
    }
    
    // DOM hazır olduğunda çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFontLoader);
    } else {
        initFontLoader();
    }
    
    // Sayfa tamamen yüklendiğinde de kontrol et
    window.addEventListener('load', function() {
        if (!isFontCSSLoaded()) {
            loadFontCSS();
            addGoogleFontsDirectLink();
        }
    });
    
    console.log('🎨 Jojova Font Loader hazır (Poppins + Inter + Commissioner)');
})();
</script>
