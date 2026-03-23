<script>
// Header Logo CSS Yükleyici - logo_up.css'i zorunlu yükler
(function() {
    'use strict';
    
    console.log('🎯 Header Logo CSS Yükleyici başlatılıyor...');
    
    // logo_up.css zaten yüklü mü kontrol et
    function isLogoCSSLoaded() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (let link of links) {
            if (link.href.includes('logo_up.css')) {
                console.log('✅ logo_up.css zaten yüklü:', link.href);
                return true;
            }
        }
        return false;
    }
    
    // logo_up.css'i yükle
    function loadLogoCSS() {
        if (isLogoCSSLoaded()) {
            console.log('✅ logo_up.css zaten yüklü, kontrol ediliyor...');
            return;
        }
        
        const logoLink = document.createElement('link');
        logoLink.rel = 'stylesheet';
        logoLink.type = 'text/css';
        logoLink.href = './header/logo_up.css';
        logoLink.media = 'all';
        logoLink.id = 'header-logo-styles';
        
        // CSS yüklenme durumunu takip et
        logoLink.onload = function() {
            console.log('✅ Header logo_up.css başarıyla yüklendi!');
            // CSS yüklendiğini document'e bildir
            document.documentElement.setAttribute('data-logo-css-loaded', 'true');
            
            // Hemen CSS test et
            setTimeout(() => {
                const headerLogo = document.querySelector('.header__logo');
                if (headerLogo) {
                    console.log('🔍 Header logo bulundu, stiller kontrol ediliyor...');
                    const style = getComputedStyle(headerLogo);
                    console.log('📏 Logo boyutları:', {
                        width: style.width,
                        height: style.height,
                        backgroundSize: style.backgroundSize,
                        position: style.position,
                        left: style.left
                    });
                }
            }, 100);
        };
        
        logoLink.onerror = function() {
            console.error('❌ logo_up.css yüklenemedi!');
            console.log('🔄 Alternatif yol deneniyor...');
            
            // Alternatif yol - inline styles
            loadInlineStyles();
        };
        
        // Head'in en sonuna ekle (diğer CSS'lerden sonra - override için)
        document.head.appendChild(logoLink);
        
        console.log('📄 logo_up.css yükleniyor...', logoLink.href);
    }
    
    // Inline styles - backup
    function loadInlineStyles() {
        console.log('🔧 Inline logo styles enjekte ediliyor...');
        
        const inlineStyle = document.createElement('style');
        inlineStyle.id = 'header-logo-inline-backup';
        inlineStyle.textContent = `
        /* Header Logo Backup Styles */
        .header__logo {
            background: var(--tf-logo) no-repeat left center !important;
            width: 140px !important;
            height: 70px !important;
            padding: 35px !important;
            background-size: auto 45px !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            cursor: pointer !important;
            text-decoration: none !important;
            position: relative !important;
            z-index: 50 !important;
        }
        
        /* Login olmayan kullanıcılar - %15 büyük */
        .header:not(.header--logged) .header__logo {
            width: 230px !important;
            height: 109px !important;
            background-size: auto 66px !important;
        }
        
        /* Sidebar kapalıyken ortalı */
        @media (min-width: 1200px) {
            .sidebar.active + * .header__logo,
            .sidebar.active ~ * .header__logo,
            body.sidebar-closed .header__logo {
                position: relative !important;
                left: auto !important;
                top: auto !important;
                z-index: 1060 !important;
                margin: 0 auto !important;
            }
            
            .sidebar.active ~ * .header__content,
            body.sidebar-closed .header__content {
                justify-content: center !important;
                padding-left: 90px !important;
            }
        }
        `;
        
        document.head.appendChild(inlineStyle);
        console.log('✅ Inline backup styles yüklendi');
    }
    
    // CSS yükleme kontrolü
    function ensureLogoStyles() {
        const interval = setInterval(() => {
            const headerLogo = document.querySelector('.header__logo');
            if (headerLogo) {
                console.log('🎯 Header logo elementi bulundu');
                loadLogoCSS();
                clearInterval(interval);
            }
        }, 100);
        
        // 10 saniye sonra timeout
        setTimeout(() => {
            clearInterval(interval);
            console.log('⏰ Header logo yükleme timeout - backup styles kullanılıyor');
            loadInlineStyles();
        }, 10000);
    }
    
    // DOM hazır olduğunda başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureLogoStyles);
    } else {
        ensureLogoStyles();
    }
    
    // Sayfa tamamen yüklendiğinde de kontrol et
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!isLogoCSSLoaded()) {
                console.log('🔄 Sayfa yüklendi ama logo CSS yok, tekrar deneniyor...');
                loadLogoCSS();
            }
        }, 500);
    });
    
    console.log('🎯 Header Logo CSS Yükleyici hazır');
})();
</script>
