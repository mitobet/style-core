// Footer Licenses Zorla Göster - JavaScript
(function() {
    'use strict';
    
    // Footer licenses'i zorla göster
    function forceShowFooterLicenses() {
        // Farklı selector'lar dene
        const selectors = [
            '.footer__licenses',
            '.footer-licenses', 
            '.licenses',
            '.footer__license',
            '.footer-license',
            '[class*="footer"][class*="license"]',
            '[class*="license"][class*="footer"]',
            'div[class*="footer-license"]',
            'div[class*="license-footer"]'
        ];
        
        let found = false;
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    found = true;
                    console.log('Footer licenses bulundu:', selector, element);
                    
                    // Zorla göster
                    element.style.cssText = `
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        height: auto !important;
                        overflow: visible !important;
                        max-height: none !important;
                        position: relative !important;
                        width: auto !important;
                        transform: none !important;
                        clip: auto !important;
                        left: auto !important;
                        right: auto !important;
                        top: auto !important;
                        bottom: auto !important;
                        margin: 0 !important;
                        padding: 10px !important;
                    `;
                    
                    // Class ekle/çıkar
                    element.classList.remove('d-none', 'd-md-none', 'd-sm-none', 'd-lg-none', 'hidden-xs', 'hidden-sm', 'hidden-md');
                    element.classList.add('d-block');
                    
                    // İçindeki img'leri de göster
                    const images = element.querySelectorAll('img');
                    images.forEach(img => {
                        img.style.cssText = `
                            display: inline-block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            max-width: 80px !important;
                            height: auto !important;
                            margin: 3px !important;
                            width: auto !important;
                            object-fit: contain !important;
                        `;
                    });
                }
            });
        });
        
        if (!found) {
            console.log('Footer licenses bulunamadı, DOM değişikliği bekleniyor...');
        }
        
        return found;
    }
    
    // Mobil kontrol
    function isMobile() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Ana fonksiyon
    function initFooterLicensesFix() {
        console.log('Footer licenses fix başlatılıyor...');
        
        // İlk kontrol
        forceShowFooterLicenses();
        
        // DOM değişikliklerini izle
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    forceShowFooterLicenses();
                }
            });
        });
        
        // Observer başlat
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        
        // Periyodik kontrol (5 saniyede bir)
        setInterval(forceShowFooterLicenses, 5000);
        
        console.log('Footer licenses fix kuruldu!');
    }
    
    // Sayfa yüklendiğinde başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterLicensesFix);
    } else {
        initFooterLicensesFix();
    }
    
    // Pencere boyutu değişince kontrol et
    window.addEventListener('resize', function() {
        setTimeout(forceShowFooterLicenses, 100);
    });
    
    // Sayfa görünür olduğunda kontrol et
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(forceShowFooterLicenses, 100);
        }
    });
    
})();
