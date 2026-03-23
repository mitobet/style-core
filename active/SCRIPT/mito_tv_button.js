(function() {
    'use strict';

    var DESKTOP_TV_ORIG = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/08q1fN1eVVRaHZJ3kCPfvIsldskFz2kFqelrp40l.png';
    var MOBILE_TV_ORIG = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/GakckagaakasdqGVAEgA/statics/6oLnWMti5FNnahtOYcXR0gChURUjr3uu7xgtLIad.png';
    var TV_LINK = 'https://mito.ws/tv';

    var _proxyBase = 'https://' + 'wsrv.nl' + '/?url=';
    var DESKTOP_TV = _proxyBase + encodeURIComponent(DESKTOP_TV_ORIG);
    var MOBILE_TV = _proxyBase + encodeURIComponent(MOBILE_TV_ORIG);

    var added = false;

    function injectCSS() {
        var styleId = 'mito-tv-styles';
        if (document.getElementById(styleId)) return;

        var style = document.createElement('style');
        style.id = styleId;
        style.textContent =
            'a.sidebar__link--mitotv{overflow:hidden!important;position:relative!important;transition:all .4s cubic-bezier(.4,0,.2,1)!important;box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 20px rgba(154,106,12,.15)!important}' +
            'a.sidebar__link--mitotv:hover{transform:translateY(-4px)!important;box-shadow:0 8px 25px rgba(0,0,0,.3),0 0 35px rgba(154,106,12,.4),0 0 50px rgba(154,106,12,.2)!important;filter:brightness(1.08)!important}' +
            'a.sidebar__link--mitotv:before{content:""!important;position:absolute!important;top:0!important;left:-100%!important;width:100%!important;height:100%!important;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)!important;transition:left .6s ease!important;z-index:1!important;pointer-events:none!important}' +
            'a.sidebar__link--mitotv:hover:before{left:100%!important}' +
            '@keyframes mitoTVPulse{0%,100%{box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 20px rgba(154,106,12,.15)}50%{box-shadow:0 4px 15px rgba(0,0,0,.2),0 0 30px rgba(154,106,12,.25),0 0 45px rgba(154,106,12,.15)}}' +
            'a.sidebar__link--mitotv{animation:mitoTVPulse 3s ease-in-out infinite!important}' +
            'a.sidebar__link--mitotv:hover{animation:none!important}' +
            '@media(max-width:767px){a.sidebar__link--mitotv:hover{transform:translateY(-2px)!important}}';

        document.head.appendChild(style);
    }

    function addTV() {
        if (added) return;

        var promoButton = document.querySelector('a[href*="promotions"]');
        if (!promoButton) return;

        var promoParent = promoButton.closest('.sidebar__links');
        if (!promoParent) return;

        var sidebar = promoParent.parentElement;
        if (!sidebar) return;

        if (document.querySelector('.sidebar__link--mitotv')) {
            added = true;
            return;
        }

        var tvWrapper = document.createElement('div');
        tvWrapper.className = 'sidebar__links custom_side';

        var tvButton = document.createElement('a');
        tvButton.className = 'sidebar__link sidebar__link--casino sidebar__link--mitotv w-100';
        tvButton.href = TV_LINK;
        tvButton.target = '_blank';
        tvButton.style.cssText = 'height:46px;';

        var isMobile = window.innerWidth <= 767;
        var imgUrl = isMobile ? MOBILE_TV : DESKTOP_TV;
        tvButton.style.background = 'url("' + imgUrl + '") center center / cover no-repeat';

        var testImg = new Image();
        testImg.onload = function() {
            tvButton.style.background = 'url("' + imgUrl + '") center center / cover no-repeat';
        };
        testImg.onerror = function() {
            var origUrl = isMobile ? MOBILE_TV_ORIG : DESKTOP_TV_ORIG;
            tvButton.style.background = 'url("' + origUrl + '") center center / cover no-repeat';
        };
        testImg.src = imgUrl;

        tvWrapper.appendChild(tvButton);

        if (promoParent.nextSibling) {
            sidebar.insertBefore(tvWrapper, promoParent.nextSibling);
        } else {
            sidebar.appendChild(tvWrapper);
        }

        added = true;
    }

    injectCSS();

    setTimeout(addTV, 100);
    setTimeout(addTV, 500);
    setTimeout(addTV, 1000);
    setTimeout(addTV, 2000);
    setTimeout(addTV, 3000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addTV);
    } else {
        addTV();
    }

    var interval = setInterval(function() {
        if (added) {
            clearInterval(interval);
            return;
        }
        addTV();
    }, 1000);

    setTimeout(function() { clearInterval(interval); }, 20000);

})();
