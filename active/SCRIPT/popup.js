// MITOBET - Elit Premium Gorsel Popup
(function() {
    'use strict';

    var POPUP_IMAGE = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/KAgXuYzzLkDen3U2fdJI3hHie8DlTNtJoWv27xCQ.gif';
    var POPUP_LINK = 'https://mitobonus.com/survey/mitobet-buyuk-cekilis-e9e4aff7';
    var POPUP_DELAY = 1500;
    var PARTICLE_COUNT = 18;

    function injectStyles() {
        if (document.getElementById('mito-popup-css')) return;
        var s = document.createElement('style');
        s.id = 'mito-popup-css';
        s.textContent =
            '@keyframes mpFadeIn{0%{opacity:0}100%{opacity:1}}' +
            '@keyframes mpSlideIn{0%{transform:scale(.92) translateY(18px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}' +
            '@keyframes mpFadeOut{0%{opacity:1}100%{opacity:0}}' +
            '@keyframes mpSlideOut{0%{transform:scale(1) translateY(0);opacity:1}100%{transform:scale(.92) translateY(18px);opacity:0}}' +
            '@keyframes mpBorder{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}' +
            '@keyframes mpShine{0%{left:-120%}100%{left:120%}}' +
            '@keyframes mpFloat{0%{transform:translateY(0) scale(1);opacity:.6}100%{transform:translateY(-100px) scale(0);opacity:0}}' +
            '@keyframes mpCloseIn{0%{transform:scale(0) rotate(-90deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}' +

            '#mito-popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;' +
                'background:rgba(0,0,0,.88);' +
                'display:flex;justify-content:center;align-items:center;z-index:99999;' +
                'animation:mpFadeIn .35s ease-out forwards;' +
                'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
            '#mito-popup-overlay.mp-closing{animation:mpFadeOut .3s ease-in forwards}' +

            '.mp-box{position:relative;overflow:visible;' +
                'animation:mpSlideIn .45s cubic-bezier(.22,.9,.36,1) .08s both}' +
            '.mp-box.mp-closing{animation:mpSlideOut .3s ease-in forwards}' +

            '.mp-border{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:13px;' +
                'background:linear-gradient(135deg,#cfae6d,#f5d98a,#8a6d2f,#cfae6d,#f5d98a);' +
                'background-size:400% 400%;animation:mpBorder 6s linear infinite;z-index:0}' +

            '.mp-content{position:relative;z-index:1;border-radius:12px;overflow:hidden;line-height:0}' +

            '.mp-img-wrap{display:block;position:relative;overflow:hidden;cursor:pointer;line-height:0}' +
            '.mp-img-wrap::after{content:"";position:absolute;top:0;left:-120%;width:60%;height:100%;' +
                'background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);' +
                'transform:skewX(-18deg);pointer-events:none;animation:mpShine 5s ease-in-out 2s infinite}' +
            '.mp-img{width:100%;height:auto;display:block;transition:transform .5s cubic-bezier(.25,.46,.45,.94),filter .5s ease}' +
            '.mp-img-wrap:hover .mp-img{transform:scale(1.025);filter:brightness(1.08)}' +

            '.mp-close{position:absolute;top:-10px;right:-10px;width:28px;height:28px;' +
                'border:1px solid rgba(207,174,109,.5);background:rgba(10,10,20,.9);color:rgba(207,174,109,.8);' +
                'font-size:14px;line-height:1;border-radius:50%;cursor:pointer;' +
                'display:flex;justify-content:center;align-items:center;z-index:10;' +
                'transition:all .3s ease;animation:mpCloseIn .35s ease .45s both;' +
                'backdrop-filter:blur(4px)}' +
            '.mp-close:hover{background:#cfae6d;color:#0a0a14;border-color:#cfae6d;' +
                'transform:rotate(90deg) scale(1.1)}' +

            '.mp-particles{position:absolute;top:0;left:0;width:100%;height:100%;' +
                'pointer-events:none;overflow:hidden;z-index:0;border-radius:13px}' +
            '.mp-dot{position:absolute;bottom:-6px;border-radius:50%;' +
                'animation:mpFloat linear infinite;opacity:.6}' +

            '@media(max-width:768px){' +
                '.mp-box{width:95vw;max-width:800px}' +
                '.mp-close{top:-9px;right:-9px;width:26px;height:26px;font-size:12px}' +
            '}' +
            '@media(min-width:769px){.mp-box{width:800px}}';
        document.head.appendChild(s);
    }

    function createParticles(container) {
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            var dot = document.createElement('span');
            dot.className = 'mp-dot';
            var size = 1.5 + Math.random() * 2.5;
            var left = Math.random() * 100;
            var dur = 3 + Math.random() * 5;
            var delay = Math.random() * 6;
            var alpha = (0.3 + Math.random() * 0.4).toFixed(2);
            dot.style.cssText =
                'left:' + left + '%;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:rgba(207,174,109,' + alpha + ');' +
                'box-shadow:0 0 ' + (size + 1) + 'px rgba(207,174,109,.2);' +
                'animation-duration:' + dur + 's;' +
                'animation-delay:' + delay + 's;';
            container.appendChild(dot);
        }
    }

    function showPopup() {
        if (document.body.dataset.mitoPopupShown === '1' || document.getElementById('mito-popup-overlay')) return;
        injectStyles();

        var overlay = document.createElement('div');
        overlay.id = 'mito-popup-overlay';

        var box = document.createElement('div');
        box.className = 'mp-box';

        var particles = document.createElement('div');
        particles.className = 'mp-particles';
        createParticles(particles);

        var border = document.createElement('div');
        border.className = 'mp-border';

        var content = document.createElement('div');
        content.className = 'mp-content';

        var imgWrap = document.createElement('a');
        imgWrap.className = 'mp-img-wrap';
        imgWrap.href = POPUP_LINK;
        imgWrap.target = '_blank';
        imgWrap.rel = 'noopener';

        var img = document.createElement('img');
        img.className = 'mp-img';
        img.src = POPUP_IMAGE;
        img.alt = 'Mitobet Kampanya';
        img.draggable = false;

        var closeBtn = document.createElement('button');
        closeBtn.className = 'mp-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Kapat');
        closeBtn.innerHTML = '&#10005;';

        var closed = false;
        function closePopup() {
            if (closed) return;
            closed = true;
            overlay.classList.add('mp-closing');
            box.classList.add('mp-closing');
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 320);
            document.body.dataset.mitoPopupShown = '1';
        }

        closeBtn.onclick = function(e) { e.stopPropagation(); closePopup(); };
        overlay.onclick = function(e) { if (e.target === overlay) closePopup(); };

        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closePopup();
                document.removeEventListener('keydown', onEsc);
            }
        });

        imgWrap.appendChild(img);
        content.appendChild(imgWrap);
        box.appendChild(particles);
        box.appendChild(border);
        box.appendChild(content);
        box.appendChild(closeBtn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(showPopup, POPUP_DELAY); });
    } else {
        setTimeout(showPopup, POPUP_DELAY);
    }
})();
