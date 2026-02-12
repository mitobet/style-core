/* =====================================================
   MITOBET - Footer Sağlayıcılar Collapse Toggle
   Varsayılan: 2 satır gösterilir, gradient fade ile.
   Buton ile açılıp kapanır.
   ===================================================== */

(function() {
    'use strict';

    var TOGGLE_TEXT_SHOW = '▼  Tümünü Gör';
    var TOGGLE_TEXT_HIDE = '▲  Gizle';

    function setupProvidersCollapse() {
        var grid = document.querySelector('#footer-providers-section #providers-grid');
        if (!grid) return;

        // Zaten kurulmuşsa tekrar yapma
        if (grid.getAttribute('data-mito-collapse-ready')) return;

        // Grid'in parent'ını bul — butonumuzu grid'in hemen altına koyacağız
        var parent = grid.parentElement;
        if (!parent) return;

        // Sağlayıcı sayısını al
        var itemCount = grid.querySelectorAll('.provider-item').length || 93;

        // Toggle buton oluştur
        var btn = document.createElement('button');
        btn.className = 'mito-providers-toggle';
        btn.type = 'button';
        btn.innerHTML = '<span>' + TOGGLE_TEXT_SHOW + ' (' + itemCount + ')</span> <span class="mito-toggle-arrow">▼</span>';

        var isOpen = false;

        btn.addEventListener('click', function() {
            isOpen = !isOpen;

            if (isOpen) {
                grid.classList.add('mito-expanded');
                btn.classList.add('mito-expanded');
                btn.querySelector('span:first-child').textContent = TOGGLE_TEXT_HIDE;
            } else {
                grid.classList.remove('mito-expanded');
                btn.classList.remove('mito-expanded');
                btn.querySelector('span:first-child').textContent = TOGGLE_TEXT_SHOW + ' (' + itemCount + ')';

                // Scroll back — grid'e geri dön
                var rect = grid.getBoundingClientRect();
                if (rect.top < 0) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        // Butonuyu grid'in hemen altına ekle
        if (grid.nextSibling) {
            parent.insertBefore(btn, grid.nextSibling);
        } else {
            parent.appendChild(btn);
        }

        grid.setAttribute('data-mito-collapse-ready', '1');
    }

    function init() {
        setupProvidersCollapse();

        // Footer geç yüklenebilir — MutationObserver ile izle
        var targets = [
            document.querySelector('#footer'),
            document.querySelector('footer'),
            document.querySelector('.footer__content'),
            document.querySelector('#main__content')
        ];

        targets.forEach(function(target) {
            if (!target) return;
            try {
                var observer = new MutationObserver(function() {
                    setupProvidersCollapse();
                });
                observer.observe(target, { childList: true, subtree: true });
            } catch(e) {}
        });

        // Güvenlik: geç yüklenen footer için tekrar dene
        setTimeout(setupProvidersCollapse, 3000);
        setTimeout(setupProvidersCollapse, 6000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
    } else {
        setTimeout(init, 1500);
    }
})();
