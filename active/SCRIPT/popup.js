// MITOBET - Ultra Premium Gorsel Popup
(function() {
    'use strict';

    var POPUP_IMAGE = 'https://dummyimage.com/598x629/1a1a2e/cfae6d&text=MITOBET+KAMPANYA';
    var POPUP_LINK = 'https://mitobonus.com/survey/mitobet-buyuk-cekilis-e9e4aff7';
    var POPUP_DELAY = 1500;
    var CTA_TEXT = 'HEMEN KATIL';
    var PARTICLE_COUNT = 35;

    function injectStyles() {
        if (document.getElementById('mito-popup-styles')) return;
        var s = document.createElement('style');
        s.id = 'mito-popup-styles';
        s.textContent =
            '@keyframes mitoPopFadeIn{0%{opacity:0}100%{opacity:1}}' +
            '@keyframes mitoPopScaleIn{0%{transform:scale(.6) translateY(30px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}' +
            '@keyframes mitoPopGlow{0%,100%{box-shadow:0 0 30px rgba(207,174,109,.3),0 0 60px rgba(207,174,109,.15),0 20px 60px rgba(0,0,0,.5)}50%{box-shadow:0 0 50px rgba(207,174,109,.5),0 0 100px rgba(207,174,109,.25),0 20px 60px rgba(0,0,0,.5)}}' +
            '@keyframes mitoPopParticle{0%{transform:translateY(0) scale(1);opacity:.7}100%{transform:translateY(-120px) scale(0);opacity:0}}' +
            '@keyframes mitoPopShine{0%{left:-150%}100%{left:150%}}' +
            '@keyframes mitoPopBorder{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}' +
            '@keyframes mitoPopCloseIn{0%{transform:rotate(-90deg) scale(0);opacity:0}100%{transform:rotate(0) scale(1);opacity:1}}' +
            '@keyframes mitoPopFadeOut{0%{opacity:1}100%{opacity:0}}' +
            '@keyframes mitoPopScaleOut{0%{transform:scale(1) translateY(0);opacity:1}100%{transform:scale(.7) translateY(40px);opacity:0}}' +
            '#mito-popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;' +
                'background:radial-gradient(ellipse at center,rgba(0,0,0,.85) 0%,rgba(0,0,0,.95) 100%);' +
                'display:flex;justify-content:center;align-items:center;z-index:99999;' +
                'animation:mitoPopFadeIn .4s ease-out forwards;' +
                'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}' +
            '#mito-popup-overlay.mito-pop-out{animation:mitoPopFadeOut .35s ease-in forwards}' +
            '.mito-pop-box{position:relative;overflow:visible;' +
                'animation:mitoPopScaleIn .5s cubic-bezier(.34,1.56,.64,1) .1s both,mitoPopGlow 4s ease .6s infinite}' +
            '.mito-pop-box.mito-pop-box-out{animation:mitoPopScaleOut .35s ease-in forwards}' +
            '.mito-pop-frame{position:relative;border-radius:16px;overflow:hidden;background:#0d0d1a;padding:3px}' +
            '.mito-pop-border-glow{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;border-radius:18px;' +
                'background:linear-gradient(135deg,#cfae6d,#f5d98a,#b8973d,#cfae6d,#f5d98a);' +
                'background-size:300% 300%;animation:mitoPopBorder 4s ease infinite;z-index:0}' +
            '.mito-pop-inner{position:relative;z-index:1;border-radius:14px;overflow:hidden;background:#0d0d1a}' +
            '.mito-pop-img-wrap{position:relative;cursor:pointer;overflow:hidden;display:block;line-height:0}' +
            '.mito-pop-img-wrap::after{content:"";position:absolute;top:0;left:-150%;width:80%;height:100%;' +
                'background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);' +
                'transform:skewX(-20deg);animation:mitoPopShine 4s ease-in-out 1.5s infinite;pointer-events:none}' +
            '.mito-pop-img{width:100%;height:auto;display:block;transition:transform .4s ease,filter .4s ease}' +
            '.mito-pop-img-wrap:hover .mito-pop-img{transform:scale(1.03);filter:brightness(1.1)}' +
            '.mito-pop-cta{display:block;width:100%;padding:14px 0;text-align:center;' +
                'font-family:inherit;font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;' +
                'text-decoration:none;color:#0d0d1a;' +
                'background:linear-gradient(135deg,#cfae6d 0%,#f5d98a 50%,#cfae6d 100%);background-size:200% 100%;' +
                'border:none;cursor:pointer;transition:background-position .4s ease,transform .15s ease;' +
                'position:relative;overflow:hidden}' +
            '.mito-pop-cta:hover{background-position:100% 0;transform:scale(1.02)}' +
            '.mito-pop-cta:active{transform:scale(.98)}' +
            '.mito-pop-cta::after{content:"";position:absolute;top:0;left:-100%;width:60%;height:100%;' +
                'background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);' +
                'transform:skewX(-20deg);transition:left .6s ease}' +
            '.mito-pop-cta:hover::after{left:150%}' +
            '.mito-pop-close{position:absolute;top:-14px;right:-14px;width:36px;height:36px;' +
                'border:2px solid rgba(207,174,109,.6);background:rgba(13,13,26,.95);color:#cfae6d;' +
                'font-size:20px;line-height:1;border-radius:50%;cursor:pointer;' +
                'display:flex;justify-content:center;align-items:center;z-index:10;' +
                'transition:all .25s ease;animation:mitoPopCloseIn .4s ease .5s both;' +
                'backdrop-filter:blur(4px)}' +
            '.mito-pop-close:hover{background:#cfae6d;color:#0d0d1a;border-color:#cfae6d;' +
                'transform:rotate(90deg) scale(1.15);box-shadow:0 0 20px rgba(207,174,109,.5)}' +
            '.mito-pop-particles{position:absolute;top:0;left:0;width:100%;height:100%;' +
                'pointer-events:none;overflow:hidden;z-index:0;border-radius:18px}' +
            '.mito-pop-particle{position:absolute;bottom:-10px;width:4px;height:4px;border-radius:50%;' +
                'animation:mitoPopParticle linear infinite;opacity:.7}' +
            '@media(max-width:768px){' +
                '.mito-pop-box{width:92vw;max-width:380px}' +
                '.mito-pop-close{top:-12px;right:-12px;width:32px;height:32px;font-size:18px}' +
                '.mito-pop-cta{padding:12px 0;font-size:13px;letter-spacing:1.5px}' +
            '}' +
            '@media(min-width:769px){.mito-pop-box{width:598px}}';
        document.head.appendChild(s);
    }

    function createParticles(container) {
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            var p = document.createElement('span');
            p.className = 'mito-pop-particle';
            var size = 2 + Math.random() * 4;
            var left = Math.random() * 100;
            var dur = 2 + Math.random() * 4;
            var delay = Math.random() * 5;
            var isGold = Math.random() > 0.3;
            var alpha = (0.4 + Math.random() * 0.6).toFixed(2);
            var alphaB = (0.3 + Math.random() * 0.5).toFixed(2);
            var color = isGold
                ? 'rgba(207,174,109,' + alpha + ')'
                : 'rgba(245,217,138,' + alphaB + ')';
            var glow = isGold
                ? 'rgba(207,174,109,.4)'
                : 'rgba(245,217,138,.3)';
            p.style.cssText =
                'left:' + left + '%;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:' + color + ';' +
                'animation-duration:' + dur + 's;' +
                'animation-delay:' + delay + 's;' +
                'box-shadow:0 0 ' + (size * 2) + 'px ' + glow + ';';
            container.appendChild(p);
        }
    }

    function showPopup() {
        if (document.body.dataset.mitoPopupShown === '1' || document.getElementById('mito-popup-overlay')) return;
        injectStyles();

        var overlay = document.createElement('div');
        overlay.id = 'mito-popup-overlay';

        var box = document.createElement('div');
        box.className = 'mito-pop-box';

        var particles = document.createElement('div');
        particles.className = 'mito-pop-particles';
        createParticles(particles);

        var frame = document.createElement('div');
        frame.className = 'mito-pop-frame';

        var borderGlow = document.createElement('div');
        borderGlow.className = 'mito-pop-border-glow';

        var inner = document.createElement('div');
        inner.className = 'mito-pop-inner';

        var imgWrap = document.createElement('a');
        imgWrap.className = 'mito-pop-img-wrap';
        imgWrap.href = POPUP_LINK;
        imgWrap.target = '_blank';
        imgWrap.rel = 'noopener';

        var img = document.createElement('img');
        img.className = 'mito-pop-img';
        img.src = POPUP_IMAGE;
        img.alt = 'Mitobet Kampanya';
        img.draggable = false;

        var cta = document.createElement('a');
        cta.className = 'mito-pop-cta';
        cta.href = POPUP_LINK;
        cta.target = '_blank';
        cta.rel = 'noopener';
        cta.textContent = CTA_TEXT;

        var closeBtn = document.createElement('button');
        closeBtn.className = 'mito-pop-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Kapat');
        closeBtn.innerHTML = '&#10005;';

        function closePopup() {
            overlay.classList.add('mito-pop-out');
            box.classList.add('mito-pop-box-out');
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 380);
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
        inner.appendChild(imgWrap);
        inner.appendChild(cta);
        frame.appendChild(borderGlow);
        frame.appendChild(inner);
        box.appendChild(particles);
        box.appendChild(frame);
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
