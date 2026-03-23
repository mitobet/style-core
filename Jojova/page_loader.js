// Loader Kontrol Sistemi - OPTİMİZE EDİLMİŞ VERSİYON
// Periyodik kontroller kaldırıldı, sadece MutationObserver kullanılıyor
(function() {
    'use strict';
    
    let loaderHidden = false;
    let autoHidePrevented = false;
    
    // Root loader'ını bul
    function findRootLoader() {
        const root = document.getElementById('root');
        if (root) {
            const loaderContainer = root.querySelector('div[style*="background-color: rgb(0, 0, 0)"]');
            if (loaderContainer) {
                return { root, loaderContainer };
            }
        }
        return null;
    }
    
    // Loader'ı gizle (manuel kontrol için)
    window.hidePageLoader = function() {
        if (loaderHidden) return;
        
        const loader = findRootLoader();
        if (loader) {
            const { root, loaderContainer } = loader;
            
            loaderContainer.style.transition = 'opacity 0.5s ease-out';
            loaderContainer.style.opacity = '0';
            
            setTimeout(() => {
                root.style.display = 'none';
                loaderHidden = true;
            }, 500);
        }
    };
    
    // Loader'ı göster (manuel kontrol için)
    window.showPageLoader = function() {
        const loader = findRootLoader();
        if (loader) {
            const { root, loaderContainer } = loader;
            
            root.style.display = 'block';
            loaderContainer.style.opacity = '1';
            loaderHidden = false;
        }
    };
    
    // Loader'ı X saniye sonra gizle
    window.hidePageLoaderAfter = function(seconds) {
        setTimeout(() => {
            window.hidePageLoader();
        }, seconds * 1000);
    };
    
    // Otomatik kaybolmayı engelle - SADECE OBSERVER KULLAN (interval kaldırıldı)
    function preventAutoHide() {
        if (autoHidePrevented) return;
        
        const loader = findRootLoader();
        if (loader) {
            autoHidePrevented = true;
            
            const { root, loaderContainer } = loader;
            
            // 1. Root'un display:none olmasını engelle
            const rootObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target;
                        if (target.style.display === 'none') {
                            target.style.display = 'block';
                        }
                    }
                });
            });
            
            rootObserver.observe(root, {
                attributes: true,
                attributeFilter: ['style']
            });
            
            // 2. Loader container'ın opacity değişimini engelle
            const containerObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target;
                        if (target.style.opacity === '0') {
                            target.style.opacity = '1';
                        }
                    }
                });
            });
            
            containerObserver.observe(loaderContainer, {
                attributes: true,
                attributeFilter: ['style']
            });
            
            // 3. CSS override ekle (interval yerine CSS ile koruma)
            const style = document.createElement('style');
            style.id = 'loader-protection';
            style.textContent = `
                #root {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                #root > div[style*="background-color: rgb(0, 0, 0)"] {
                    opacity: 1 !important;
                    visibility: visible !important;
                    display: flex !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Loader'ı bul ve kontrolü başlat - MAX 5 DENEME
    let initAttempts = 0;
    function initLoader() {
        if (initAttempts >= 5) return; // Max 5 deneme
        initAttempts++;
        
        const loader = findRootLoader();
        if (loader) {
            preventAutoHide();
        } else {
            setTimeout(initLoader, 200); // 100ms yerine 200ms
        }
    }
    
    // DOM hazır olduğunda başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }
})();
