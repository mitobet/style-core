/* =====================================================
   MITOBET - Header Extra Butonlar
   Desktop: header__actions içine yan yana
   Mobil: header altına ortalanmış bar olarak
   ===================================================== */

(function() {
    'use strict';

    // Önceki instance'ı temizle (tekrar enjekte edilebilmesi için)
    if (window._mitoIntervals) {
        window._mitoIntervals.forEach(function(id) { clearInterval(id); });
    }
    window._mitoIntervals = [];

    // Font Awesome kaldırıldı (ikonlar kullanılmıyor)

    var lastMitoPath = '';

    function getLang() {
        var path = window.location.pathname;
        if (path.indexOf('/en') === 0 || path === '/en') return 'en';
        return 'tr';
    }

    /** SPA: URL değişince üst bar ve butonları mevcut dile göre yeniden oluştur */
    function refreshMitoLang() {
        var path = window.location.pathname;
        if (path === lastMitoPath) return;
        lastMitoPath = path;

        var topbar = document.querySelector('.mito-topbar');
        if (topbar) topbar.remove();

        var headerActions = document.querySelector('.header__actions');
        if (headerActions) {
            headerActions.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(el) { el.remove(); });
        }

        var mobileBar = document.querySelector('.mito-mobile-bar');
        if (mobileBar) mobileBar.remove();

        addTopBar();
        if (window.innerWidth > 992) {
            addDesktopButtons();
        } else {
            addMobileBar();
            fixMobileHeaderHeight();
        }
        setupPromoSlidersForCurrentButtons();
    }

    /** Yeni eklenen promo butonlarına slider kur (SPA refresh sonrası) */
    function setupPromoSlidersForCurrentButtons() {
        setTimeout(function() {
            document.querySelectorAll('.mito-header-btn--promo, .mito-mobile-btn--promo').forEach(setupPromoSlider);
        }, 300);
    }

    // ===== CANLI DESTEK — Telegram Yönlendirme =====
    var TG_SUPPORT = 'https://t.me/mitobetsupport';

    function createSupportClickHandler() {
        return function(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            window.open(TG_SUPPORT, '_blank');
        };
    }

    // ===== COMM100 DEAKTIF =====
    function killComm100() {
        // Comm100 global nesnelerini öldür
        if (window.Comm100API) {
            try { window.Comm100API.close && window.Comm100API.close(); } catch(e) {}
            try { window.Comm100API.destroy && window.Comm100API.destroy(); } catch(e) {}
            window.Comm100API = { open: function() { window.open(TG_SUPPORT, '_blank'); }, close: function(){}, destroy: function(){} };
        }
        if (window.Comm100) {
            window.Comm100 = null;
        }

        // Comm100 iframe, container ve butonlarını kaldır
        var selectors = [
            'iframe[src*="comm100"]', 'iframe[id*="comm100"]', 'iframe[name*="comm100"]',
            'div[id*="comm100"]', 'div[class*="comm100"]',
            '#comm100-container', '#comm100-button', '#comm100-chat',
            '.comm100-container', '.comm100-button',
            'div[id*="Comm100"]', 'div[class*="Comm100"]',
            '#livechat-compact-container', '#livechat-full',
            'div[id*="livechat"]', 'iframe[src*="livechat"]'
        ];
        document.querySelectorAll(selectors.join(',')).forEach(function(el) {
            el.parentNode && el.parentNode.removeChild(el);
        });

        // Comm100 script'lerinin yüklenmesini engelle
        var origCreate = document.createElement;
        document.createElement = function(tag) {
            var el = origCreate.call(document, tag);
            if (tag.toLowerCase() === 'script') {
                var origSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src') ||
                              Object.getOwnPropertyDescriptor(el.__proto__, 'src');
                if (origSrc && origSrc.set) {
                    var origSet = origSrc.set;
                    Object.defineProperty(el, 'src', {
                        set: function(v) {
                            if (typeof v === 'string' && (v.indexOf('comm100') > -1 || v.indexOf('livechat') > -1)) {
                                console.log('[MITO] Comm100 script engellendi:', v);
                                return;
                            }
                            origSet.call(this, v);
                        },
                        get: origSrc.get ? origSrc.get.bind(el) : function() { return el.getAttribute('src'); }
                    });
                }
            }
            return el;
        };

        console.log('[MITO] Comm100 deaktif edildi');
    }

    function forceToTelegram(el) {
        if (el.dataset.mitoTgForced) return;
        el.dataset.mitoTgForced = '1';
        el.removeAttribute('onclick');
        el.onclick = null;
        if (el.tagName === 'A') {
            el.href = TG_SUPPORT;
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
        }
        el.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
            window.open(TG_SUPPORT, '_blank');
        }, true);
    }

    function hijackAllSupportButtons() {
        // Selector bazlı
        var sels = [
            '.mito-header-btn--support', '.mito-mobile-btn--support',
            'a[href*="livechat"]', 'a[href*="live-chat"]', 'a[href*="comm100"]',
            'button[onclick*="Comm100"]', 'button[onclick*="livechat"]',
            '[data-action*="chat"]', '[data-action*="support"]',
            '[data-mito-extra="support"]'
        ];
        document.querySelectorAll(sels.join(',')).forEach(forceToTelegram);

        // Text bazlı - sayfadaki tüm a ve button'ları tara
        var all = document.querySelectorAll('a, button');
        all.forEach(function(el) {
            if (el.dataset.mitoTgForced) return;
            var txt = (el.textContent || '').trim().toLowerCase();
            if (txt === 'canlı destek' || txt === 'canli destek' || txt === 'live support' || txt === 'live chat') {
                forceToTelegram(el);
            }
        });
    }

    // ===== PROMO TEXT SLİDER =====
    var promoTexts = ['PROMOSYONLAR', 'HEMEN KAZAN', 'BONUSLAR'];
    var promoTextsEn = ['PROMOTIONS', 'WIN NOW', 'BONUSES'];
    var promoIdx = 0;
    var sliding = false;

    function getPromoTexts() {
        return getLang() === 'en' ? promoTextsEn : promoTexts;
    }

    function setupPromoSlider(btn) {
        if (!btn || btn.getAttribute('data-mito-slider')) return;
        btn.setAttribute('data-mito-slider', '1');

        var textEl = btn.querySelector('.mito-btn-text');
        var isDesktop = !!textEl;
        var cs = getComputedStyle(btn);
        var lineH = parseInt(cs.fontSize) || 12;
        var texts = getPromoTexts();

        // Buton boyutunu sabitle
        var rect = btn.getBoundingClientRect();
        btn.style.setProperty('width', rect.width + 'px', 'important');
        btn.style.setProperty('min-width', rect.width + 'px', 'important');
        btn.style.setProperty('max-width', rect.width + 'px', 'important');
        btn.style.setProperty('height', rect.height + 'px', 'important');
        btn.style.setProperty('min-height', rect.height + 'px', 'important');
        btn.style.setProperty('max-height', rect.height + 'px', 'important');

        // En uzun text genişliği (mevcut dil)
        var measure = document.createElement('span');
        measure.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:' + cs.font + ';letter-spacing:' + cs.letterSpacing + ';';
        document.body.appendChild(measure);
        var maxW = 0;
        texts.forEach(function(t) { measure.textContent = t; if (measure.offsetWidth > maxW) maxW = measure.offsetWidth; });
        document.body.removeChild(measure);

        // Mask
        var mask = document.createElement('span');
        mask.className = 'mito-slider-mask';
        mask.style.cssText = 'display:inline-block;position:relative;overflow:hidden;' +
            'height:' + lineH + 'px;line-height:' + lineH + 'px;vertical-align:middle;' +
            'width:' + maxW + 'px;text-align:center;';

        // A span (görünür, mevcut dildeki sıradaki metin)
        var spanA = document.createElement('span');
        spanA.className = 'mito-slide-a';
        spanA.style.cssText = 'display:block;position:absolute;left:0;right:0;top:0;height:' + lineH + 'px;' +
            'line-height:' + lineH + 'px;white-space:nowrap;text-align:center;' +
            'will-change:transform;backface-visibility:hidden;';
        spanA.textContent = texts[promoIdx % texts.length];

        // B span (aşağıda bekliyor)
        var spanB = document.createElement('span');
        spanB.className = 'mito-slide-b';
        spanB.style.cssText = 'display:block;position:absolute;left:0;right:0;top:0;height:' + lineH + 'px;' +
            'line-height:' + lineH + 'px;white-space:nowrap;text-align:center;' +
            'will-change:transform;backface-visibility:hidden;' +
            'transform:translateY(' + lineH + 'px);';

        mask.appendChild(spanA);
        mask.appendChild(spanB);

        if (isDesktop) {
            textEl.textContent = '';
            textEl.appendChild(mask);
        } else {
            var sweepEl = btn.querySelector('.mito-sweep');
            btn.textContent = '';
            btn.appendChild(mask);
            if (sweepEl) btn.appendChild(sweepEl);
        }
    }

    function startPromoSlider() {
        setTimeout(function() {
            document.querySelectorAll('.mito-header-btn--promo, .mito-mobile-btn--promo').forEach(setupPromoSlider);
        }, 500);

        var id = setInterval(function() {
            if (sliding) return;
            sliding = true;
            var texts = getPromoTexts();
            promoIdx = (promoIdx + 1) % texts.length;
            var newText = texts[promoIdx];

            document.querySelectorAll('.mito-slider-mask').forEach(function(mask) {
                var spanA = mask.querySelector('.mito-slide-a');
                var spanB = mask.querySelector('.mito-slide-b');
                if (!spanA || !spanB) return;

                var h = mask.offsetHeight;

                // B'yi aşağıda hazırla
                spanB.textContent = newText;
                spanB.style.transition = 'none';
                spanB.style.transform = 'translateY(' + h + 'px)';

                // Reflow zorla
                void spanB.offsetHeight;

                // Aynı anda ikisini de kaydır
                requestAnimationFrame(function() {
                    spanA.style.transition = 'transform 0.5s ease-in-out';
                    spanB.style.transition = 'transform 0.5s ease-in-out';
                    spanA.style.transform = 'translateY(-' + h + 'px)';
                    spanB.style.transform = 'translateY(0)';
                });

                // Bitince A'yı resetle
                setTimeout(function() {
                    spanA.style.transition = 'none';
                    spanA.textContent = newText;
                    spanA.style.transform = 'translateY(0)';
                    spanB.style.transition = 'none';
                    spanB.style.transform = 'translateY(' + h + 'px)';
                    sliding = false;
                }, 550);
            });
        }, 3000);
        window._mitoIntervals.push(id);
    }

    // ===== CANLI DESTEK PULSE (sadece desktop) =====
    function startSupportPulse() {
        var on = false;
        var id = setInterval(function() {
            on = !on;
            // Sadece desktop butonuna uygula
            var btns = document.querySelectorAll('.mito-header-btn--support');
            btns.forEach(function(btn) {
                btn.style.borderColor = on ? 'rgba(74, 222, 128, 0.6)' : 'rgba(207, 174, 109, 0.45)';
                btn.style.boxShadow = on ? '0 0 10px rgba(74, 222, 128, 0.25)' : 'none';
            });
        }, 1200);
        window._mitoIntervals.push(id);
    }

    // ===== PROMO SWEEP IŞIK =====
    function addSweepToBtn(btn) {
        if (!btn || btn.querySelector('.mito-sweep')) return;
        var sweep = document.createElement('span');
        sweep.className = 'mito-sweep';
        sweep.style.cssText = 'position:absolute;top:0;left:-60%;width:30%;height:100%;' +
            'background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);' +
            'transform:skewX(-20deg);pointer-events:none;z-index:2;opacity:0.8;';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(sweep);

        function runSweep() {
            sweep.style.transition = 'none';
            sweep.style.left = '-60%';
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    sweep.style.transition = 'left 0.7s ease-in-out';
                    sweep.style.left = '130%';
                });
            });
        }
        runSweep();
        var id = setInterval(runSweep, 3500);
        window._mitoIntervals.push(id);
    }

    // ===== CSS TRANSITION INJECT =====
    function injectAnimationCSS() {
        if (document.getElementById('mito-anim-css')) return;
        var style = document.createElement('style');
        style.id = 'mito-anim-css';
        style.textContent =
            '.mito-header-btn--promo .mito-btn-text,' +
            '.mito-mobile-btn--promo {' +
            '  transition: opacity 0.3s ease !important;' +
            '}' +
            '.mito-header-btn--support,' +
            '.mito-mobile-btn--support {' +
            '  transition: border-color 0.6s ease, box-shadow 0.6s ease !important;' +
            '}';
        document.head.appendChild(style);
    }

    // ===== ÜST BANNER (Sonraki Domain) =====
    function getNextDomain() {
        var host = window.location.hostname; // örn: mitobet274.com
        var match = host.match(/^(mitobet)(\d+)\.(.+)$/i);
        if (match) {
            var prefix = match[1];
            var num = parseInt(match[2]);
            var tld = match[3];
            return prefix + (num + 1) + '.' + tld;
        }
        return null;
    }

    function addTopBar() {
        if (document.querySelector('.mito-topbar')) return;
        var header = document.querySelector('#header') || document.querySelector('header');
        if (!header) return;

        var lang = getLang();
        var nextDomain = getNextDomain();
        var topbar = document.createElement('div');
        topbar.className = 'mito-topbar';
        topbar.setAttribute('data-mito-extra', 'topbar');

        var labelNext = lang === 'en' ? 'Next address:' : 'Sıradaki adresimiz:';
        var labelLogin = lang === 'en' ? 'Current login:' : 'Güncel Giriş:';
        var linkHref = 'https://mito.ws/giris';

        if (nextDomain) {
            topbar.innerHTML = '<span>' + labelNext + '</span> <a href="' + linkHref + '" target="_blank">' + nextDomain + '</a>';
        } else {
            topbar.innerHTML = '<span>' + labelLogin + '</span> <a href="' + linkHref + '" target="_blank">mito.ws</a>';
        }

        header.parentNode.insertBefore(topbar, header);
        console.log('[MITO] Üst banner eklendi');
    }

    // ===== DESKTOP BUTONLARI =====
    function addDesktopButtons() {
        if (window.innerWidth <= 992) return;
        addTopBar();

        var headerActions = document.querySelector('.header__actions');
        if (!headerActions) return;
        if (headerActions.querySelector('.mito-header-btn')) return;

        var lang = getLang();
        var firstExisting = headerActions.firstChild;

        var tvBtn = document.createElement('a');
        tvBtn.href = 'https://mitotv.live/';
        tvBtn.target = '_blank';
        tvBtn.className = 'mito-header-btn mito-header-btn--tv';
        tvBtn.innerHTML = '<span class="mito-tv-icon">&#9654;</span> <span class="mito-btn-text">TV</span>';
        tvBtn.setAttribute('data-mito-extra', 'tv');

        var promoBtn = document.createElement('a');
        promoBtn.href = '/promotions';
        promoBtn.className = 'mito-header-btn mito-header-btn--promo';
        promoBtn.innerHTML = '<span class="mito-btn-text">' + (lang === 'en' ? 'PROMOTIONS' : 'PROMOSYONLAR') + '</span>';
        promoBtn.setAttribute('data-mito-extra', 'promo');

        var supportBtn = document.createElement('a');
        supportBtn.href = TG_SUPPORT;
        supportBtn.target = '_blank';
        supportBtn.rel = 'noopener noreferrer';
        supportBtn.className = 'mito-header-btn mito-header-btn--support';
        supportBtn.innerHTML = '<span class="mito-live-dot"></span><span class="mito-btn-text">' + (lang === 'en' ? 'LIVE SUPPORT' : 'CANLI DESTEK') + '</span>';
        supportBtn.setAttribute('data-mito-extra', 'support');

        var divider = document.createElement('span');
        divider.className = 'mito-header-divider';
        divider.setAttribute('data-mito-extra', 'divider');

        var tgBtn = document.createElement('a');
        tgBtn.href = 'https://t.me/mitoresmi';
        tgBtn.target = '_blank';
        tgBtn.className = 'mito-header-btn mito-header-btn--telegram';
        tgBtn.innerHTML = '<span class="mito-btn-text">TELEGRAM</span>';
        tgBtn.setAttribute('data-mito-extra', 'telegram');

        headerActions.insertBefore(tvBtn, firstExisting);
        headerActions.insertBefore(promoBtn, firstExisting);
        headerActions.insertBefore(supportBtn, firstExisting);
        headerActions.insertBefore(tgBtn, firstExisting);
        headerActions.insertBefore(divider, firstExisting);

        // Butonlar eklendikten sonra sweep ekle
        setTimeout(function() { addSweepToBtn(promoBtn); }, 200);

        console.log('[MITO] Desktop header butonlar eklendi');
    }

    // ===== MOBİL BAR =====
    function addMobileBar() {
        if (window.innerWidth > 992) return;
        if (document.querySelector('.mito-mobile-bar')) return;

        var header = document.querySelector('#header') || document.querySelector('header');
        if (!header) return;

        var lang = getLang();

        var bar = document.createElement('div');
        bar.className = 'mito-mobile-bar';
        bar.setAttribute('data-mito-extra', 'mobile-bar');

        var tvBtn = document.createElement('a');
        tvBtn.href = 'https://mitotv.live/';
        tvBtn.target = '_blank';
        tvBtn.className = 'mito-mobile-btn mito-mobile-btn--tv';
        tvBtn.innerHTML = '<span class="mito-tv-icon">&#9654;</span> TV';

        var promoBtn = document.createElement('a');
        promoBtn.href = '/promotions';
        promoBtn.className = 'mito-mobile-btn mito-mobile-btn--promo';
        promoBtn.textContent = (lang === 'en' ? 'PROMOTIONS' : 'PROMOSYONLAR');
        promoBtn.style.position = 'relative';
        promoBtn.style.overflow = 'hidden';

        var supportBtn = document.createElement('a');
        supportBtn.href = TG_SUPPORT;
        supportBtn.target = '_blank';
        supportBtn.rel = 'noopener noreferrer';
        supportBtn.className = 'mito-mobile-btn mito-mobile-btn--support';
        supportBtn.innerHTML = '<span class="mito-live-dot"></span> ' + (lang === 'en' ? 'LIVE SUPPORT' : 'CANLI DESTEK');

        var tgBtn = document.createElement('a');
        tgBtn.href = 'https://t.me/mitoresmi';
        tgBtn.target = '_blank';
        tgBtn.className = 'mito-mobile-btn mito-mobile-btn--telegram';
        tgBtn.innerHTML = 'TELEGRAM';

        bar.appendChild(tvBtn);
        bar.appendChild(promoBtn);
        bar.appendChild(supportBtn);
        bar.appendChild(tgBtn);

        addTopBar();
        header.parentNode.insertBefore(bar, header.nextSibling);

        // Butonlar eklendikten sonra sweep ekle
        setTimeout(function() { addSweepToBtn(promoBtn); }, 200);

        console.log('[MITO] Mobil header bar eklendi');
    }

    // Mobilde header yükseklik fix
    function fixMobileHeaderHeight() {
        if (window.innerWidth > 992) return;
        var els = [
            { sel: '#header', css: { height: '50px', 'max-height': '50px', 'min-height': '0', padding: '0', overflow: 'visible' } },
            { sel: '#header .container', css: { height: '50px', padding: '0 12px' } },
            { sel: '#header .container .row', css: { height: '50px', margin: '0' } },
            { sel: '#header .container .row > .col-12', css: { height: '50px', padding: '0' } },
            { sel: '.header__content', css: { height: '50px', 'max-height': '50px', 'min-height': '0', padding: '0', overflow: 'visible', display: 'flex', 'align-items': 'center' } }
        ];
        els.forEach(function(item) {
            var el = document.querySelector(item.sel);
            if (el) {
                Object.keys(item.css).forEach(function(prop) {
                    el.style.setProperty(prop, item.css[prop], 'important');
                });
            }
        });
    }

    function init() {
        lastMitoPath = window.location.pathname;
        injectAnimationCSS();
        killComm100();

        if (window.innerWidth > 992) {
            addDesktopButtons();
        } else {
            addMobileBar();
            fixMobileHeaderHeight();
        }

        // SPA: URL değişince (dil değişimi) metinleri güncelle
        window.addEventListener('popstate', function() { refreshMitoLang(); });
        var origPush = history.pushState;
        var origReplace = history.replaceState;
        history.pushState = function() {
            origPush.apply(this, arguments);
            refreshMitoLang();
        };
        history.replaceState = function() {
            origReplace.apply(this, arguments);
            refreshMitoLang();
        };

        // Animasyonları başlat
        startPromoSlider();
        startSupportPulse();

        // SPA desteği
        var observer = new MutationObserver(function() {
            if (window.innerWidth > 992) {
                var headerActions = document.querySelector('.header__actions');
                if (headerActions && !headerActions.querySelector('.mito-header-btn')) {
                    addDesktopButtons();
                }
            } else {
                if (!document.querySelector('.mito-mobile-bar')) {
                    addMobileBar();
                }
                fixMobileHeaderHeight();
            }
            hijackAllSupportButtons();
        });

        var root = document.getElementById('root');
        if (root) {
            observer.observe(root, { childList: true, subtree: true });
        }

        // Comm100 periyodik temizle + tüm destek butonlarını sürekli yakala
        var comm100CleanCount = 0;
        var comm100Timer = setInterval(function() {
            killComm100();
            hijackAllSupportButtons();
            hijackSidebarSupport();
            comm100CleanCount++;
            if (comm100CleanCount >= 30) clearInterval(comm100Timer);
        }, 1500);
        window._mitoIntervals.push(comm100Timer);

        // Resize
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                addTopBar();
                if (window.innerWidth > 992) {
                    var mobileBar = document.querySelector('.mito-mobile-bar');
                    if (mobileBar) mobileBar.remove();
                    var headerActions = document.querySelector('.header__actions');
                    if (headerActions && !headerActions.querySelector('.mito-header-btn')) {
                        addDesktopButtons();
                    }
                    document.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(b) { b.style.display = ''; });
                } else {
                    document.querySelectorAll('.mito-header-btn, .mito-header-divider').forEach(function(b) { b.style.display = 'none'; });
                    if (!document.querySelector('.mito-mobile-bar')) {
                        addMobileBar();
                    }
                }
            }, 200);
        });

        // Sidebar "Canlı Destek" linkini Telegram'a yönlendir
        hijackSidebarSupport();
        hijackAllSupportButtons();

        console.log('[MITO] Header extra butonlar + animasyonlar yüklendi (Comm100 deaktif)');
    }

    // ===== SIDEBAR CANLI DESTEK -> TELEGRAM =====
    function hijackSidebarSupport() {
        var links = document.querySelectorAll('.sidebar__nav a, .sidebar__menu a, #sidebar a');
        links.forEach(function(a) {
            var txt = (a.textContent || '').trim().toLowerCase();
            if (txt === 'canlı destek' || txt === 'canli destek' || txt === 'live support' || txt === 'live chat') {
                forceToTelegram(a);
            }
        });
    }

    // Sidebar SPA'da yeniden render olabilir, MutationObserver ile tekrar yakala
    var sidebarObserver = new MutationObserver(function() {
        hijackSidebarSupport();
    });
    var sidebarEl = document.getElementById('sidebar') || document.getElementById('sidebar-content');
    if (sidebarEl) {
        sidebarObserver.observe(sidebarEl, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            var el = document.getElementById('sidebar') || document.getElementById('sidebar-content');
            if (el) sidebarObserver.observe(el, { childList: true, subtree: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
    } else {
        setTimeout(init, 500);
    }

})();
