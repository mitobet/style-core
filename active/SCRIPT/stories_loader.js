(function() {
    'use strict';

    // Keep in sync with popup.js (CAMPAIGN_PROMO_END_MS). After this instant (TRT +03:00) first story is removed.
    var CAMPAIGN_PROMO_END_MS = Date.parse('2027-12-31T23:59:59+03:00');
    function isCampaignPromoActive() {
        return Date.now() < CAMPAIGN_PROMO_END_MS;
    }

    var PROXY = 'https://wsrv.nl/?url=';

    var RAW_IMG_FIRST = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/t12Ka8jsT3Fa0xpT9wDY7acuBoY7bHnehmFjJgpu.jpg';
    var RAW_IMG_1 = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/74Lny8THQCnRaGYc6dLs2Zx1wiig7UgMg4dpH5Zw.jpg';
    var RAW_IMG_2 = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/tv9PveV1lEVjh7bOlwkRmjcWL3aB30w9QzIH3ysP.jpg';

    var STORIES_FULL = [
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_FIRST) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_FIRST) + '&w=720&q=80&output=webp',
            link:   window.location.origin + '/tr/promotion/1000-tlye-1000-tl-nakit-bonus',
            linkText: 'Detaylar',
            duration: 5000
        },
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_1) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_1) + '&w=720&q=80&output=webp',
            link:   window.location.origin + '/tr/promotion/1000-tlye-1000-tl-nakit-bonus',
            linkText: 'Detaylar',
            duration: 5000
        },
        {
            avatar: PROXY + encodeURIComponent(RAW_IMG_2) + '&w=120&h=120&fit=cover&output=webp',
            src:    PROXY + encodeURIComponent(RAW_IMG_2) + '&w=720&q=80&output=webp',
            link:   window.location.origin + '/tr/promotion/15-yatirim-bonusu-10-kayip-bonusu',
            linkText: 'Detaylar',
            duration: 5000
        }
    ];

    var STORIES = [];

    function rebuildStoriesArray() {
        STORIES.length = 0;
        var src = isCampaignPromoActive() ? STORIES_FULL : STORIES_FULL.slice(1);
        for (var i = 0; i < src.length; i++) {
            STORIES.push(src[i]);
        }
    }

    var currentIdx = 0;
    var storyTimer = null;
    var isOpen = false;
    var booted = false;
    var touchStartX = 0;
    var touchStartY = 0;
    var mouseStartX = 0;
    var mouseStartY = 0;
    var swipeGuard = false;

    var elModal = null;
    var elImg = null;
    var elBar = null;
    var elLink = null;

    function clearTimer() {
        if (storyTimer !== null) {
            clearTimeout(storyTimer);
            storyTimer = null;
        }
    }

    function resetBar() {
        if (!elBar) return;
        elBar.style.transition = 'none';
        elBar.style.width = '0%';
        elBar.offsetWidth;
    }

    function startBar(duration) {
        resetBar();
        setTimeout(function() {
            if (!elBar) return;
            elBar.style.transition = 'width ' + (duration / 1000) + 's linear';
            elBar.style.width = '100%';
        }, 30);
    }

    function openStory(idx) {
        if (!elModal) return;
        clearTimer();
        currentIdx = idx;
        var story = STORIES[idx];

        elImg.src = story.src;
        elLink.href = story.link;

        if (!isOpen) {
            isOpen = true;
            document.body.style.overflow = 'hidden';
            elModal.style.display = 'flex';
            setTimeout(function() {
                elModal.classList.add('ms-open');
            }, 10);
        }

        startBar(story.duration);
        storyTimer = setTimeout(function() {
            nextStory();
        }, story.duration);
    }

    function closeStory() {
        if (!elModal) return;
        clearTimer();
        resetBar();
        isOpen = false;
        elModal.classList.remove('ms-open');
        document.body.style.overflow = '';
        setTimeout(function() {
            if (!isOpen) {
                elModal.style.display = 'none';
                if (elImg) elImg.src = '';
            }
        }, 300);
    }

    function nextStory() {
        clearTimer();
        if (currentIdx < STORIES.length - 1) {
            openStory(currentIdx + 1);
        } else {
            closeStory();
        }
    }

    function prevStory() {
        clearTimer();
        if (currentIdx > 0) {
            openStory(currentIdx - 1);
        } else {
            openStory(0);
        }
    }

    function renderModal() {
        if (document.getElementById('ms-modal')) return;

        elModal = document.createElement('div');
        elModal.id = 'ms-modal';
        elModal.style.display = 'none';

        var progress = document.createElement('div');
        progress.className = 'ms-progress';
        elBar = document.createElement('div');
        elBar.className = 'ms-bar';
        progress.appendChild(elBar);

        elImg = document.createElement('img');
        elImg.className = 'ms-img';
        elImg.alt = '';

        var tapLeft = document.createElement('div');
        tapLeft.className = 'ms-tap-left';
        tapLeft.addEventListener('click', function(e) {
            e.stopPropagation();
            if (swipeGuard) { swipeGuard = false; return; }
            prevStory();
        });

        var tapRight = document.createElement('div');
        tapRight.className = 'ms-tap-right';
        tapRight.addEventListener('click', function(e) {
            e.stopPropagation();
            if (swipeGuard) { swipeGuard = false; return; }
            nextStory();
        });

        var closeBtn = document.createElement('button');
        closeBtn.className = 'ms-close';
        closeBtn.type = 'button';
        closeBtn.innerHTML = '&#10005;';
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeStory();
        });

        elLink = document.createElement('a');
        elLink.className = 'ms-link';
        elLink.target = '_self';
        elLink.innerHTML =
            '<svg class="ms-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="18 15 12 9 6 15"></polyline>' +
            '</svg>' +
            '<span>Detaylar</span>';
        elLink.addEventListener('click', function(e) {
            e.stopPropagation();
            clearTimer();
            var href = elLink.href;
            closeStory();
            if (href) window.location.href = href;
        });

        elModal.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        elModal.addEventListener('touchend', function(e) {
            var dx = e.changedTouches[0].clientX - touchStartX;
            var dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
            if (dx < 0) nextStory();
            else prevStory();
        }, { passive: true });

        elModal.addEventListener('mousedown', function(e) {
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            swipeGuard = false;
        });

        elModal.addEventListener('mouseup', function(e) {
            var dx = e.clientX - mouseStartX;
            var dy = e.clientY - mouseStartY;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
            swipeGuard = true;
            if (dx < 0) nextStory();
            else prevStory();
        });

        elModal.appendChild(progress);
        elModal.appendChild(elImg);
        elModal.appendChild(tapLeft);
        elModal.appendChild(tapRight);
        elModal.appendChild(closeBtn);
        elModal.appendChild(elLink);

        document.body.appendChild(elModal);
    }

    function onCampaignPromoEnd() {
        if (Date.now() < CAMPAIGN_PROMO_END_MS) return;
        rebuildStoriesArray();
        var w = document.getElementById('mito-stories');
        if (w && w.firstElementChild) {
            w.removeChild(w.firstElementChild);
        }
        if (isOpen && elModal && STORIES.length > 0) {
            var newIdx = currentIdx === 0 ? 0 : (currentIdx - 1);
            if (newIdx >= STORIES.length) {
                closeStory();
            } else {
                openStory(newIdx);
            }
        } else if (isOpen && STORIES.length === 0) {
            closeStory();
        }
    }

    function scheduleCampaignPromoEnd() {
        var ms = CAMPAIGN_PROMO_END_MS - Date.now();
        if (ms <= 0 || !isCampaignPromoActive()) return;
        setTimeout(function() {
            onCampaignPromoEnd();
        }, ms);
    }

    function renderWidget() {
        if (document.getElementById('mito-stories')) return;

        rebuildStoriesArray();

        var container = document.createElement('div');
        container.id = 'mito-stories';

        for (var i = 0; i < STORIES.length; i++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.className = 'ms-avatar';
                btn.type = 'button';

                var img = document.createElement('img');
                img.src = STORIES[idx].avatar;
                img.alt = '';
                img.draggable = false;

                btn.appendChild(img);
                btn.addEventListener('click', function() {
                    openStory(idx);
                });
                container.appendChild(btn);
            })(i);
        }

        var slider = document.querySelector('.swiper')
            || document.querySelector('[class*="swiper"]')
            || document.querySelector('[class*="slider"]')
            || document.querySelector('[class*="carousel"]')
            || document.querySelector('[class*="banner"]');

        if (slider && slider.parentNode) {
            slider.parentNode.insertBefore(container, slider);
        } else {
            var main = document.getElementById('main__content')
                || document.getElementById('main')
                || document.querySelector('main');
            if (main) {
                main.insertBefore(container, main.firstChild);
            } else {
                document.body.appendChild(container);
            }
        }
    }

    function isHomePath() {
        var path = window.location.pathname.replace(/\/$/, '');
        return path === '' || /^\/[a-z]{2}$/.test(path);
    }

    function handleNav() {
        setTimeout(function() {
            if (window.innerWidth > 768) return;
            var widget = document.getElementById('mito-stories');
            if (isHomePath()) {
                if (!widget) renderWidget();
            } else {
                if (widget && widget.parentNode) widget.parentNode.removeChild(widget);
            }
        }, 200);
    }

    function boot() {
        if (booted) return;
        if (window.innerWidth > 768) return;
        if (!isHomePath()) return;
        booted = true;
        rebuildStoriesArray();
        renderWidget();
        renderModal();
        scheduleCampaignPromoEnd();

        window.addEventListener('popstate', handleNav);

        var origPush = history.pushState;
        history.pushState = function() {
            origPush.apply(this, arguments);
            handleNav();
        };
        var origReplace = history.replaceState;
        history.replaceState = function() {
            origReplace.apply(this, arguments);
            handleNav();
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
