<script>
/* Promosyon Butonları Görsel URL Düzeltici */
(function() {
    // Doğru görsel URL'leri - Vendor provider kullanıyor
    const correctImageUrls = {
        'Casino': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/casino.png',
        'Spor': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/spor.png',
        'Slot': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/slot.png',
        'Live Casino': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/live-casino.png',
        'Poker': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/poker.png',
        'Blackjack': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/blackjack.png',
        'Rulet': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/rulet.png',
        'Aviator': 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/promo-icons/aviator.png'
    };

    // Görsel URL'lerini düzelten fonksiyon
    function fixPromoImages() {
        // Tüm kategori tile'larını bul
        const categoryTiles = document.querySelectorAll('.category-tile');
        
        categoryTiles.forEach(tile => {
            const titleElement = tile.querySelector('.category-title');
            const imgElement = tile.querySelector('.category-image img');
            
            if (titleElement && imgElement) {
                const categoryTitle = titleElement.textContent.trim();
                
                // Eğer bu kategori için doğru URL varsa hemen güncelle
                if (correctImageUrls[categoryTitle]) {
                    const correctSrc = correctImageUrls[categoryTitle];
                    
                    // Hemen doğru URL'yi ata (yüklenmesini bekleme)
                    imgElement.src = correctSrc;
                    imgElement.alt = categoryTitle;
                    
                    // Görsel yüklenme hatası durumunda fallback
                    imgElement.onerror = function() {
                        console.warn(`Görsel yüklenemedi: ${correctSrc}`);
                        // Varsayılan bir görsel veya ikon kullan
                        this.style.background = 'linear-gradient(45deg, #333, #555)';
                        this.style.display = 'flex';
                        this.style.alignItems = 'center';
                        this.style.justifyContent = 'center';
                        this.innerHTML = '<span style="color: #FFD700; font-size: 24px;">★</span>';
                    };
                    
                    console.log(`Görsel hemen güncellendi: ${categoryTitle} -> ${correctSrc}`);
                }
            }
        });
    }

    // Sayfa yüklendiğinde çalıştır
    function initImageFixer() {
        // DOM hazır olduğunda çalıştır
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fixPromoImages);
        } else {
            fixPromoImages();
        }

        // Dinamik içerik değişiklikleri için MutationObserver
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            
            mutations.forEach(function(mutation) {
                // Yeni eklenen node'ları kontrol et
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Eğer kategori tile eklendiyse veya içinde kategori tile varsa
                            if (node.matches && node.matches('.category-tile')) {
                                shouldUpdate = true;
                            } else if (node.querySelector && node.querySelector('.category-tile')) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                // Kısa bir delay ile çalıştır (DOM güncellensin diye)
                setTimeout(fixPromoImages, 100);
            }
        });

        // Observer'ı başlat
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Script'i başlat
    initImageFixer();

    // Global fonksiyon olarak da erişilebilir kıl
    window.fixPromoImages = fixPromoImages;
    
    console.log('Promosyon butonları görsel düzeltici yüklendi');
})();
</script>