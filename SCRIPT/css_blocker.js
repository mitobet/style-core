/* =====================================================
   MITOBET - CSS Blocker
   CMS'deki hatalı CSS dosyalarını engeller.
   Dosya yüklenmeden veya yüklendikten sonra devre dışı bırakır.
   ===================================================== */

(function() {
    'use strict';

    // Engellenecek CSS URL parçaları
    var BLOCKED = [
        'btT2zvLncVttPgLh7UhpfCCihTtMYy5y.css'
    ];

    function shouldBlock(href) {
        if (!href) return false;
        for (var i = 0; i < BLOCKED.length; i++) {
            if (href.indexOf(BLOCKED[i]) > -1) return true;
        }
        return false;
    }

    // 1. Zaten yüklenmiş olanları kaldır
    function removeExisting() {
        var links = document.querySelectorAll('link[rel="stylesheet"], style');
        links.forEach(function(el) {
            var href = el.getAttribute('href') || '';
            if (shouldBlock(href)) {
                el.disabled = true;
                el.remove();
                console.log('[MITO BLOCKER] Kaldırıldı: ' + href);
            }
        });
    }

    // 2. Yeni eklenenleri yakala ve engelle
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            m.addedNodes.forEach(function(node) {
                if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
                    var href = node.getAttribute('href') || '';
                    if (shouldBlock(href)) {
                        node.disabled = true;
                        node.remove();
                        console.log('[MITO BLOCKER] Engellendi: ' + href);
                    }
                }
            });
        });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // İlk temizlik
    removeExisting();

    // SPA geçişlerinde tekrar kontrol
    setInterval(removeExisting, 2000);

    console.log('[MITO BLOCKER] CSS blocker aktif - ' + BLOCKED.length + ' dosya engelleniyor');
})();
