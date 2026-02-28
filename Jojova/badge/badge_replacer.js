<script>
// VIP Badge Görsel Değiştirici - Toplu Değiştirme
// Tüm VIP seviyeleri için görsel değiştirme

(function() {
    'use strict';
    
    // Görsel değiştirme haritası - [eski_url, yeni_url] formatında
    const IMAGE_REPLACEMENTS = [
        // JOJO
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/QOs3vDRiNNHWHKYqsJYhzSNhHhTAPCIXZ3iq4lw9.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/fZp8v6EpXLgyhRyYy9m2LKAF5hSPc42QIw3pHnbz.png'
        ],
        // JOJOUR
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/koeWDvEas8ohJIWucjcUUqudN9jl3M0HGC5XhJcm.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/cq3z3ROaDBkIoC9jResUxMjvOF7I5raTrDbCdlEf.png'
        ],
        // JOJOELİTE
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/VI19ED3I4pzqSOTSttCHcjglvRla4AXLvhz2pSXm.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/PBq82CGEdinhjPIsBZPKGMdZstO5fJTrHIA8y9Di.png'
        ],
        // JOJOKING
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/sut7pqvmV5T9LGu3ni0JNH0f6Yph8A2UwEhG5EAS.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/hkSzpbsEB289dApqUmEEEYFUGBWURJgKtKSfzw9G.png'
        ],
        // JOJOBOSS
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/LSwGkqSRLKjPc2L1B8Tw3HSZgDTmoo9ID2mnx9TD.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/0Y1cF4l47c1Sq96xVerjjTNAaGhsAznrCXk5Kvqt.png'
        ],
        // JOJONIOR
        [
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/vip-states/ep3YGM2vykm19eefqTFkF0LvamjEEULx/BTjipSkRxHM2r3VXuOmTq6FXZlE5ijKVyakCQGoS.png',
            'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/4CPYHvWWJ8NOhRePtMNJbuC96z2fKiixYYpVWjkJ.png'
        ]
    ];
    
    // Görselleri değiştiren fonksiyon
    function replaceBadgeImages() {
        // Tüm img elementlerini kontrol et
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                // src attribute kontrolü
                if (img.src === oldUrl) {
                    img.src = newUrl;
                    console.log('VIP Badge görseli değiştirildi:', oldUrl, '->', newUrl);
                }
                
                // getAttribute ile src kontrolü
                if (img.getAttribute('src') === oldUrl) {
                    img.setAttribute('src', newUrl);
                    console.log('VIP Badge görseli (attribute) değiştirildi:', oldUrl, '->', newUrl);
                }
                
                // Data-src kontrolü (lazy loading için)
                if (img.getAttribute('data-src') === oldUrl) {
                    img.setAttribute('data-src', newUrl);
                    console.log('VIP Badge görseli (data-src) değiştirildi:', oldUrl, '->', newUrl);
                }
            });
        });
        
        // CSS background-image kontrolü
        const elementsWithBg = document.querySelectorAll('*');
        elementsWithBg.forEach(element => {
            const bgImage = window.getComputedStyle(element).backgroundImage;
            
            IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                if (bgImage.includes(oldUrl)) {
                    element.style.backgroundImage = bgImage.replace(oldUrl, newUrl);
                    console.log('VIP Badge background görseli değiştirildi:', oldUrl, '->', newUrl);
                }
            });
        });
        
        // Rank icon class'ına özel kontrol
        const rankIcons = document.querySelectorAll('.rank-icon img, .ranking img, [class*="rank"] img');
        rankIcons.forEach(img => {
            IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                if (img.src.includes(oldUrl)) {
                    img.src = newUrl;
                    console.log('Rank icon görseli değiştirildi:', oldUrl, '->', newUrl);
                }
            });
        });
    }
    
    // CSS dosyasını yükle
    function loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'badge/badge_style.css';
        document.head.appendChild(link);
        console.log('VIP Badge CSS dosyası yüklendi');
    }
    
    // MutationObserver ile dinamik içerik değişikliklerini takip et
    function observeChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Yeni eklenen img elementlerini kontrol et
                            const newImages = node.querySelectorAll ? node.querySelectorAll('img') : [];
                            newImages.forEach(img => {
                                IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                                    if (img.src && img.src.includes(oldUrl)) {
                                        img.src = newUrl;
                                        console.log('Dinamik VIP Badge görseli değiştirildi:', oldUrl, '->', newUrl);
                                    }
                                });
                            });
                            
                            // Eğer node'un kendisi bir img ise
                            if (node.tagName === 'IMG' && node.src) {
                                IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                                    if (node.src.includes(oldUrl)) {
                                        node.src = newUrl;
                                        console.log('Dinamik VIP Badge görseli (node) değiştirildi:', oldUrl, '->', newUrl);
                                    }
                                });
                            }
                        }
                    });
                }
                
                // Attribute değişikliklerini de takip et
                if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                    const target = mutation.target;
                    if (target.tagName === 'IMG' && target.src) {
                        IMAGE_REPLACEMENTS.forEach(([oldUrl, newUrl]) => {
                            if (target.src.includes(oldUrl)) {
                                target.src = newUrl;
                                console.log('Attribute değişikliği ile VIP Badge görseli değiştirildi:', oldUrl, '->', newUrl);
                            }
                        });
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src', 'data-src', 'style']
        });
        
        console.log('VIP Badge MutationObserver başlatıldı');
    }
    
    // Ana başlatma fonksiyonu
    function init() {
        console.log('VIP Badge Değiştirici başlatılıyor...');
        console.log('Toplam', IMAGE_REPLACEMENTS.length, 'görsel değiştirme kuralı yüklendi');
        
        // CSS dosyasını yükle
        loadCSS();
        
        // Mevcut görselleri değiştir
        replaceBadgeImages();
        
        // Dinamik değişiklikleri takip et
        observeChanges();
        
        // Periyodik kontrol (bazı dinamik yüklemeler için)
        setInterval(replaceBadgeImages, 2000);
        
        console.log('VIP Badge Değiştirici aktif!');
    }
    
    // Sayfa yüklendiğinde başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Window load event'i için de dinle
    window.addEventListener('load', function() {
        setTimeout(replaceBadgeImages, 1000);
    });
    
})();
</script>