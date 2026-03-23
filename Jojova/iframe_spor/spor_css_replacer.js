<script>
(function() {
    // Spor CSS Değiştirici - Sarı-Siyah Tema Entegrasyonu
    function initSporCSSReplacer() {
        console.log('🎨 Spor CSS Değiştirici başlatılıyor...');
        
        // Yeni CSS dosyası URL'i
        const newCSSUrl = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/styles/wbXCB7WJQitKbqrKRDy5W8tWoLdI7dXZ.css';
        
        // Eski CSS dosyası pattern'i
        const oldCSSPattern = /D8LdIMjLmlFFD9WdC8XXYcT9sUshpVza\.css/g;
        
        // Spor iframe'ini bul ve CSS'ini değiştir
        function replaceSporCSS() {
            // Spor iframe'ini bul
            const sporIframe = document.getElementById('bcsportsbookiframe');
            
            if (sporIframe) {
                const currentSrc = sporIframe.src;
                
                // Eğer eski CSS kullanılıyorsa yenisiyle değiştir
                if (oldCSSPattern.test(currentSrc)) {
                    const newSrc = currentSrc.replace(oldCSSPattern, 'wbXCB7WJQitKbqrKRDy5W8tWoLdI7dXZ.css');
                    sporIframe.src = newSrc;
                    console.log('✅ Spor iframe CSS güncellendi - Sarı-Siyah tema aktif');
                    console.log('🔗 Yeni CSS:', newCSSUrl);
                    return true;
                }
            }
            return false;
        }
        
        // Spor iframe container'ını bul ve içeriğini değiştir  
        function updateSporIframeHTML() {
            // Spor iframe HTML dosyasının içeriğini güncelleyen fonksiyon
            const sporContainers = document.querySelectorAll('iframe[src*="spor-iframe.html"], iframe[src*="esportings.com"]');
            
            sporContainers.forEach(iframe => {
                const currentSrc = iframe.src;
                if (oldCSSPattern.test(currentSrc)) {
                    const newSrc = currentSrc.replace(oldCSSPattern, 'wbXCB7WJQitKbqrKRDy5W8tWoLdI7dXZ.css');
                    iframe.src = newSrc;
                    console.log('✅ Spor container CSS güncellendi');
                }
            });
        }
        
        // URL'deki CSS parametresini değiştir
        function replaceCSSInURL(url) {
            return url.replace(oldCSSPattern, 'wbXCB7WJQitKbqrKRDy5W8tWoLdI7dXZ.css');
        }
        
        // Spor sayfası kontrolü
        function isSportPage() {
            const path = window.location.pathname;
            const hash = window.location.hash;
            
            return path.includes('/sportsbook') || 
                   path.includes('/sport') || 
                   hash.includes('sport') ||
                   document.querySelector('iframe[src*="esportings.com"]') !== null;
        }
        
        // MutationObserver ile yeni iframe'leri izle
        function observeNewIframes() {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Yeni iframe eklendiğinde kontrol et
                            if (node.tagName === 'IFRAME' && node.src && oldCSSPattern.test(node.src)) {
                                node.src = replaceCSSInURL(node.src);
                                console.log('✅ Yeni iframe CSS güncellendi');
                            }
                            
                            // İçinde iframe olan elementler için
                            const iframes = node.querySelectorAll && node.querySelectorAll('iframe[src*="esportings.com"], iframe[src*="D8LdIMjLmlFFD9WdC8XXYcT9sUshpVza"]');
                            if (iframes && iframes.length > 0) {
                                iframes.forEach(iframe => {
                                    if (oldCSSPattern.test(iframe.src)) {
                                        iframe.src = replaceCSSInURL(iframe.src);
                                        console.log('✅ İç iframe CSS güncellendi');
                                    }
                                });
                            }
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            return observer;
        }
        
        // Ana çalıştırma fonksiyonu
        function runCSSReplacer() {
            // Hemen kontrol et ve değiştir
            if (replaceSporCSS()) {
                console.log('🎯 İlk kontrol: CSS başarıyla değiştirildi');
            }
            
            // HTML container'ları da kontrol et
            updateSporIframeHTML();
            
            // Sürekli kontrol için interval (daha az sıklıkta)
            setInterval(function() {
                if (isSportPage()) {
                    replaceSporCSS();
                    updateSporIframeHTML();
                }
            }, 3000); // Her 3 saniyede kontrol et
            
            // Yeni iframe'leri izle
            observeNewIframes();
            
            console.log('🚀 Spor CSS değiştirici aktif - Sarı-Siyah tema hazır');
        }
        
        // Hemen başlat
        runCSSReplacer();
        
        // Sayfa yüklendiğinde tekrar kontrol et
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runCSSReplacer);
        } else {
            setTimeout(runCSSReplacer, 100);
        }
        
        // Window load'da da kontrol et
        window.addEventListener('load', function() {
            setTimeout(runCSSReplacer, 500);
        });
    }
    
    // Hemen başlat
    initSporCSSReplacer();
    
    // Global fonksiyon olarak da export et
    window.replaceSporCSS = initSporCSSReplacer;
    
})();
</script>
