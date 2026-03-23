/* =====================================================
   MITOBET - Promosyon Sayfasi Enhancer v4
   Stagger reveal, tilt, alt metin, scroll progress
   Tum tarayicilarla uyumlu
   ===================================================== */
(function() {
    'use strict';

    if (window._promoEnhancerLoaded) return;
    window._promoEnhancerLoaded = true;

    var isPromoPage = window.location.pathname.indexOf('promot') > -1 ||
                      window.location.pathname.indexOf('promo') > -1;

    if (!isPromoPage) return;

    // ===== STAGGER REVEAL =====
    function setupRevealObserver() {
        var posts = document.querySelectorAll('.blog-grid .post');
        if (!posts.length) return;

        var i;
        for (i = 0; i < posts.length; i++) {
            if (!posts[i].hasAttribute('data-promo-reveal')) {
                posts[i].setAttribute('data-promo-reveal', 'hidden');
            }
        }

        if (!('IntersectionObserver' in window)) {
            for (i = 0; i < posts.length; i++) {
                posts[i].setAttribute('data-promo-reveal', 'visible');
            }
            return;
        }

        var delay = 0;
        var observer = new IntersectionObserver(function(entries) {
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    (function(el, d) {
                        setTimeout(function() {
                            el.setAttribute('data-promo-reveal', 'visible');
                        }, d);
                    })(entries[j].target, delay);
                    delay += 80;
                    observer.unobserve(entries[j].target);
                }
            }
            setTimeout(function() { delay = 0; }, 600);
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        for (i = 0; i < posts.length; i++) {
            observer.observe(posts[i]);
        }
    }

    // ===== SUBTLE TILT =====
    function setupTiltEffect() {
        var posts = document.querySelectorAll('.blog-grid .post');
        for (var i = 0; i < posts.length; i++) {
            (function(post) {
                if (post._tiltBound) return;
                post._tiltBound = true;

                post.addEventListener('mousemove', function(e) {
                    var rect = post.getBoundingClientRect();
                    var x = (e.clientX - rect.left) / rect.width;
                    var y = (e.clientY - rect.top) / rect.height;
                    var tiltX = (y - 0.5) * 2;
                    var tiltY = (x - 0.5) * -2;
                    post.style.WebkitTransform = 'translateY(-8px) perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
                    post.style.transform = 'translateY(-8px) perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
                });

                post.addEventListener('mouseleave', function() {
                    post.style.WebkitTransform = '';
                    post.style.transform = '';
                });
            })(posts[i]);
        }
    }

    // ===== GORSEL PLACEHOLDER =====
    function setupImagePlaceholders() {
        var images = document.querySelectorAll('.blog-grid .post__cover img');
        for (var i = 0; i < images.length; i++) {
            (function(img) {
                if (img._placeholderDone) return;
                img._placeholderDone = true;

                var wrapper = img.closest('.lazy-load-image-background') || img.parentElement;

                if (!img.complete || img.naturalHeight === 0) {
                    wrapper.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1a1a1a 100%)';
                    wrapper.style.backgroundSize = '200% 200%';
                }

                img.addEventListener('load', function() {
                    wrapper.style.background = '';
                    wrapper.style.backgroundSize = '';
                });

                img.addEventListener('error', function() {
                    wrapper.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                    img.style.display = 'none';
                });
            })(images[i]);
        }
    }


    // ===== CATEGORY TILE =====
    function setupCategoryTileEffects() {
        var tiles = document.querySelectorAll('.category-tile');
        for (var i = 0; i < tiles.length; i++) {
            (function(tile) {
                if (tile._tileEffectDone) return;
                tile._tileEffectDone = true;

                tile.addEventListener('mouseenter', function() {
                    for (var j = 0; j < tiles.length; j++) {
                        if (tiles[j] !== tile && !tiles[j].classList.contains('active')) {
                            tiles[j].style.opacity = '0.6';
                        }
                    }
                });

                tile.addEventListener('mouseleave', function() {
                    for (var j = 0; j < tiles.length; j++) {
                        tiles[j].style.opacity = '';
                    }
                });
            })(tiles[i]);
        }
    }

    // ===== SCROLL PROGRESS =====
    function setupScrollProgress() {
        if (document.getElementById('promo-scroll-bar')) return;

        var bar = document.createElement('div');
        bar.id = 'promo-scroll-bar';
        bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;z-index:99999;pointer-events:none;width:0;' +
            'background:-webkit-linear-gradient(left,#CFAE6D,#FFD700);' +
            'background:linear-gradient(90deg,#CFAE6D,#FFD700);' +
            '-webkit-transition:width 0.15s ease;transition:width 0.15s ease;';
        document.body.appendChild(bar);

        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                bar.style.width = Math.min((scrollTop / docHeight) * 100, 100) + '%';
            }
        });
    }

    // ===== INIT =====
    function initAll() {
        var blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return false;

        setupRevealObserver();
        setupTiltEffect();
        setupImagePlaceholders();
        setupCategoryTileEffects();
        setupScrollProgress();

        console.log('[MITO] Promo page enhancer v4 yuklendi');
        return true;
    }

    function tryInit() {
        if (!initAll()) {
            setTimeout(tryInit, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(tryInit, 300); });
    } else {
        setTimeout(tryInit, 300);
    }

    // SPA navigasyon
    var root = document.getElementById('root');
    if (root) {
        var _promoObs = new MutationObserver(function(muts) {
            var onPromo = window.location.pathname.indexOf('promot') > -1 ||
                          window.location.pathname.indexOf('promo') > -1;
            if (!onPromo) return;

            for (var i = 0; i < muts.length; i++) {
                if (muts[i].addedNodes.length && document.querySelector('.blog-grid')) {
                    setTimeout(initAll, 200);
                    break;
                }
            }
        });
        _promoObs.observe(root, { childList: true, subtree: true });
    }

})();
