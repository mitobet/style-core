/* =====================================================
   MITOBET - Footer Marquee
   Sağlayıcılar, Ödeme Yöntemleri, Para Birimleri
   logolarını sonsuz yatay kayma efektiyle gösterir.
   ===================================================== */

(function() {
    'use strict';

    /**
     * Sağlayıcıları (#providers-grid içindeki tüm .provider-item) toplayıp
     * yalnızca 2 satıra böler ve her satırı sonsuz marquee için klonlar.
     */
    function setupProviderRows() {
        var grid = document.querySelector('#footer-providers-section #providers-grid');
        if (!grid) return;

        // Zaten bizim tarafımızdan kurulmuşsa tekrar yapma
        if (grid.getAttribute('data-mito-providers-built')) return;

        // Tüm mevcut provider item'larını topla
        var allItems = Array.prototype.slice.call(
            grid.querySelectorAll('.provider-item')
        );
        if (allItems.length === 0) return;

        // Grid'i temizle
        grid.innerHTML = '';

        // 2 adet satır oluştur
        var row1 = document.createElement('div');
        row1.className = 'provider-row mito-row-1';
        var row2 = document.createElement('div');
        row2.className = 'provider-row mito-row-2';

        // Item'ları sırayla 2 satıra dağıt
        allItems.forEach(function(item, index) {
            var clone = item.cloneNode(true);
            if (index % 2 === 0) {
                row1.appendChild(clone);
            } else {
                row2.appendChild(clone);
            }
        });

        grid.appendChild(row1);
        grid.appendChild(row2);

        // Sonsuz loop için her satırdaki item'ları bir kez daha klonla
        [row1, row2].forEach(function(row) {
            var items = Array.prototype.slice.call(row.children || []);
            if (items.length < 2) return;
            items.forEach(function(it) {
                row.appendChild(it.cloneNode(true));
            });
        });

        grid.setAttribute('data-mito-providers-built', '1');
    }

    /**
     * Para birimleri ve ödeme yöntemleri için
     * .footer__currencies içindeki ul.footer__accepted listelerini klonlar.
     */
    function setupAcceptedLists() {
        var lists = document.querySelectorAll('.footer__currencies ul.footer__accepted');
        lists.forEach(function(list) {
            if (list.getAttribute('data-mito-marquee')) return;
            list.setAttribute('data-mito-marquee', '1');

            var items = Array.prototype.slice.call(list.querySelectorAll('li'));
            if (items.length < 2) return;

            items.forEach(function(item) {
                var clone = item.cloneNode(true);
                list.appendChild(clone);
            });
        });
    }

    function setupMarquee() {
        setupProviderRows();
        setupAcceptedLists();
    }

    function init() {
        setupMarquee();

        // DOM değişikliklerine karşı (geç yüklenen footer elemanları)
        var footer = document.querySelector('#footer, footer, .footer__content');
        if (footer) {
            var observer = new MutationObserver(function() {
                setupMarquee();
            });
            observer.observe(footer, { childList: true, subtree: true });
        }

        // 3 sn sonra bir kez daha çalıştır (güvenlik)
        setTimeout(setupMarquee, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 800); });
    } else {
        setTimeout(init, 800);
    }
})();
