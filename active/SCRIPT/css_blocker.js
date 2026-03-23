/* =====================================================
   MITOBET - CSS Blocker
   CMS'deki hatalı CSS dosyalarını engeller.
   ===================================================== */

(function() {
    'use strict';

    var BLOCKED = [
        'btT2zvLncVttPgLh7UhpfCCihTtMYy5y',
        'search-gold',
        'multisearch'
    ];

    function shouldBlock(el) {
        // Link href kontrolü
        var href = el.getAttribute('href') || '';
        if (href.indexOf('btT2zvLncVttPgLh7UhpfCCihTtMYy5y') > -1) return true;

        // Style içerik kontrolü (inline CSS)
        if (el.tagName === 'STYLE' && el.textContent) {
            var txt = el.textContent;
            if (txt.indexOf('--search-gold') > -1 && txt.indexOf('multisearch') > -1) return true;
        }

        return false;
    }

    function killCSS() {
        // Tüm stylesheet ve style etiketlerini tara
        var els = document.querySelectorAll('link[rel="stylesheet"], style');
        els.forEach(function(el) {
            if (shouldBlock(el)) {
                el.disabled = true;
                el.parentNode && el.parentNode.removeChild(el);
            }
        });

        // document.styleSheets üzerinden de kontrol
        try {
            for (var i = document.styleSheets.length - 1; i >= 0; i--) {
                var sheet = document.styleSheets[i];
                var href = sheet.href || '';
                if (href.indexOf('btT2zvLncVttPgLh7UhpfCCihTtMYy5y') > -1) {
                    sheet.disabled = true;
                    if (sheet.ownerNode) {
                        sheet.ownerNode.parentNode && sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
                    }
                }
            }
        } catch(e) {}
    }

    // MutationObserver - eklenen her node'u kontrol et
    var obs = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (!n.tagName) continue;
                var tag = n.tagName.toUpperCase();
                if (tag === 'LINK' || tag === 'STYLE') {
                    if (shouldBlock(n)) {
                        n.disabled = true;
                        n.parentNode && n.parentNode.removeChild(n);
                    }
                }
                // İçindeki link/style'ları da kontrol et
                if (n.querySelectorAll) {
                    var inner = n.querySelectorAll('link[rel="stylesheet"], style');
                    inner.forEach(function(el) {
                        if (shouldBlock(el)) {
                            el.disabled = true;
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                    });
                }
            }
        }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Hemen çalıştır
    killCSS();
    // DOM hazır olunca tekrar
    document.addEventListener('DOMContentLoaded', killCSS);
    // Sayfa yüklenince tekrar
    window.addEventListener('load', killCSS);
    // Periyodik kontrol
    setInterval(killCSS, 1000);

})();
