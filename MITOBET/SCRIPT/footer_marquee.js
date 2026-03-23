/* =====================================================
   MITOBET - Footer: Sağlayıcılar Collapse + Para Birimleri İsim Ekleme
   ===================================================== */

(function() {
    'use strict';

    /* ——————————————————————————————————————————————————
       1. SAGLAYICILAR COLLAPSE TOGGLE
       —————————————————————————————————————————————————— */

    var TOGGLE_TEXT_SHOW = '▼  Tümünü Gör';
    var TOGGLE_TEXT_HIDE = '▲  Gizle';

    function setupProvidersCollapse() {
        var grid = document.querySelector('#footer-providers-section #providers-grid');
        if (!grid) return;
        if (grid.getAttribute('data-mito-collapse-ready')) return;

        var parent = grid.parentElement;
        if (!parent) return;

        var itemCount = grid.querySelectorAll('.provider-item').length || 93;

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
                var rect = grid.getBoundingClientRect();
                if (rect.top < 0) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        if (grid.nextSibling) {
            parent.insertBefore(btn, grid.nextSibling);
        } else {
            parent.appendChild(btn);
        }

        grid.setAttribute('data-mito-collapse-ready', '1');
    }

    /* ——————————————————————————————————————————————————
       2. KABUL EDILEN PARA BIRIMLERI — İkon yanına isim ekle
       —————————————————————————————————————————————————— */

    // Kripto ikon dosya adı → kısa isim eşleştirmesi
    // CMS'deki img src'den dosya adını alıp eşleştiriyoruz
    var CURRENCY_MAP = {
        // Yaygın eşleştirmeler (img src'deki anahtar kelimeler)
        'try': 'TRY',
        'tl': 'TRY',
        'lira': 'TRY',
        'btc': 'BTC',
        'bitcoin': 'BTC',
        'eth': 'ETH',
        'ethereum': 'ETH',
        'usdt': 'USDT',
        'tether': 'USDT',
        'bnb': 'BNB',
        'binance': 'BNB',
        'trx': 'TRX',
        'tron': 'TRX',
        'xrp': 'XRP',
        'ripple': 'XRP',
        'doge': 'DOGE',
        'dogecoin': 'DOGE',
        'ltc': 'LTC',
        'litecoin': 'LTC',
        'usdc': 'USDC',
        'usd-coin': 'USDC',
        'dai': 'DAI',
        'sol': 'SOL',
        'solana': 'SOL',
        'ada': 'ADA',
        'cardano': 'ADA',
        'avax': 'AVAX',
        'avalanche': 'AVAX',
        'dot': 'DOT',
        'polkadot': 'DOT',
        'matic': 'MATIC',
        'polygon': 'MATIC',
        'shib': 'SHIB',
        'shiba': 'SHIB',
        'atom': 'ATOM',
        'cosmos': 'ATOM',
        'link': 'LINK',
        'chainlink': 'LINK',
        'uni': 'UNI',
        'uniswap': 'UNI',
        'xlm': 'XLM',
        'stellar': 'XLM',
        'eur': 'EUR',
        'euro': 'EUR',
        'usd': 'USD',
        'dollar': 'USD',
        'gbp': 'GBP',
        'pound': 'GBP',
        'rub': 'RUB',
        'ruble': 'RUB'
    };

    function guessCurrencyName(imgSrc) {
        if (!imgSrc) return null;
        // URL'den dosya adını al, küçük harfe çevir
        var parts = imgSrc.toLowerCase().split('/');
        var filename = parts[parts.length - 1] || '';
        // Uzantıyı kaldır
        filename = filename.replace(/\.(png|jpg|jpeg|svg|webp|gif).*$/i, '');

        // Tam eşleştirme dene
        if (CURRENCY_MAP[filename]) return CURRENCY_MAP[filename];

        // Parçalı eşleştirme — dosya adı içinde anahtar kelime ara
        var keys = Object.keys(CURRENCY_MAP);
        for (var i = 0; i < keys.length; i++) {
            if (filename.indexOf(keys[i]) > -1) {
                return CURRENCY_MAP[keys[i]];
            }
        }

        // Alt attribute'dan dene
        return null;
    }

    function setupCurrencyLabels() {
        // Sadece "KABUL EDİLEN PARA BİRİMLERİ" bölümü (footer-payment-methods DEĞİL)
        var currencyDivs = document.querySelectorAll('.footer__currencies:not(#footer-payment-methods)');

        currencyDivs.forEach(function(div) {
            if (div.getAttribute('data-mito-labels-done')) return;

            var wrappers = div.querySelectorAll('ul.footer__accepted .instrument-icon-wrapper');
            if (!wrappers.length) return;

            wrappers.forEach(function(wrapper) {
                // Zaten label eklenmiş mi?
                if (wrapper.querySelector('.mito-currency-label')) return;

                var img = wrapper.querySelector('img');
                if (!img) return;

                // İsim bul: önce alt, sonra title, sonra src'den tahmin
                var name = null;
                var alt = (img.getAttribute('alt') || '').trim();
                var title = (img.getAttribute('title') || '').trim();

                if (alt && alt.length <= 10) {
                    name = alt.toUpperCase();
                } else if (title && title.length <= 10) {
                    name = title.toUpperCase();
                } else {
                    name = guessCurrencyName(img.src || img.getAttribute('src'));
                }

                if (!name) {
                    // Alt'tan uzun isim varsa kısalt
                    if (alt) {
                        name = alt.substring(0, 5).toUpperCase();
                    } else {
                        return; // İsim bulunamadı, span ekleme
                    }
                }

                var label = document.createElement('span');
                label.className = 'mito-currency-label';
                label.textContent = name;
                wrapper.appendChild(label);
            });

            div.setAttribute('data-mito-labels-done', '1');
        });
    }

    /* ——————————————————————————————————————————————————
       3. INIT
       —————————————————————————————————————————————————— */

    function init() {
        setupProvidersCollapse();
        setupCurrencyLabels();

        // Footer geç yüklenebilir
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
                    setupCurrencyLabels();
                });
                observer.observe(target, { childList: true, subtree: true });
            } catch(e) {}
        });

        setTimeout(function() { setupProvidersCollapse(); setupCurrencyLabels(); }, 3000);
        setTimeout(function() { setupProvidersCollapse(); setupCurrencyLabels(); }, 6000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
    } else {
        setTimeout(init, 1500);
    }
})();
