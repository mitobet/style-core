// COMM100 Chat Pozisyon Kontrolü
// Bu script, chat butonu açıkken fixed pozisyonda, kapalıyken normal pozisyonda olmasını sağlar

(function() {
    // Chat durumunu kontrol eden fonksiyon
    function checkChatStatus() {
        // Chat açık mı kontrol et - chat penceresi açıkken genellikle belirli bir class veya element eklenir
        const chatOpen = document.querySelector('.comm100-chat-window') || 
                        document.querySelector('.comm100-chat-box') || 
                        document.querySelector('[id*="comm100-chat"][style*="display: block"]');
        
        // Canlı destek butonunu bul
        const chatButton = document.querySelector('div[style*="position: fixed"][style*="z-index: 2147483642"]');
        
        if (chatButton) {
            if (chatOpen) {
                // Chat açıksa fixed pozisyonda olsun
                chatButton.style.position = 'fixed';
                chatButton.style.right = '10%';
                chatButton.style.bottom = '1%';
                chatButton.style.zIndex = '2147483642';
            } else {
                // Chat kapalıysa fixed pozisyonda olmasın
                chatButton.style.position = 'absolute';
                chatButton.style.right = '10%';
                chatButton.style.bottom = '1%';
                chatButton.style.zIndex = '1000';
            }
        }
    }
    
    // Sayfa yüklendiğinde ve belirli aralıklarla kontrol et
    function initChatPositionControl() {
        // İlk kontrol
        setTimeout(checkChatStatus, 1000);
        
        // Periyodik kontrol
        setInterval(checkChatStatus, 2000);
        
        // DOM değişikliklerini izle
        const observer = new MutationObserver(function(mutations) {
            checkChatStatus();
        });
        
        // Body'deki değişiklikleri izle
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
        
        // Chat butonuna tıklama olayını izle
        document.addEventListener('click', function(e) {
            // Chat butonuna tıklandığında kontrol et
            if (e.target && (
                e.target.closest('[id*="comm100-float-button"]') || 
                e.target.closest('div[style*="position: fixed"][style*="z-index: 2147483642"]')
            )) {
                // Kısa bir gecikme ile kontrol et (chat açılması için)
                setTimeout(checkChatStatus, 500);
            }
        }, true);
    }
    
    // Sayfa yüklendiğinde başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatPositionControl);
    } else {
        initChatPositionControl();
    }
})();
