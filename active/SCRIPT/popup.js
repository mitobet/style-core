// MITOBET - Görsel Popup
(function() {
    'use strict';

    var POPUP_IMAGE = 'https://dummyimage.com/598x629/1a1a2e/cfae6d&text=MITOBET+KAMPANYA';
    var POPUP_LINK = 'https://mitobonus.com/survey/mitobet-buyuk-cekilis-e9e4aff7';
    var POPUP_DELAY = 1500;

    function showPopup() {
        if (document.body.dataset.mitoPopupShown === '1' || document.getElementById('mito-popup-overlay')) return;

        var overlay = document.createElement('div');
        overlay.id = 'mito-popup-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:99999;opacity:0;transition:opacity 0.3s ease;';

        var box = document.createElement('div');
        box.style.cssText = 'position:relative;width:598px;height:629px;border-radius:15px;background:transparent;display:flex;justify-content:center;align-items:center;overflow:hidden;transform:scale(0.5);transition:transform 0.3s ease;';

        if (window.innerWidth <= 768) {
            box.style.width = '90vw';
            box.style.height = 'auto';
            box.style.maxWidth = '400px';
            box.style.maxHeight = '420px';
        }

        var img = document.createElement('img');
        img.src = POPUP_IMAGE;
        img.style.cssText = 'width:100%;height:100%;object-fit:contain;border-radius:12px;cursor:pointer;';
        img.onclick = function() { window.open(POPUP_LINK, '_blank'); };

        var close = document.createElement('button');
        close.innerHTML = '&times;';
        close.style.cssText = 'position:absolute;top:10px;right:10px;width:35px;height:35px;border:none;background:rgba(0,0,0,0.6);color:#fff;font-size:28px;line-height:1;border-radius:50%;cursor:pointer;display:flex;justify-content:center;align-items:center;transition:background 0.2s;z-index:1;';
        close.onmouseenter = function() { close.style.background = 'rgba(255,0,0,0.8)'; };
        close.onmouseleave = function() { close.style.background = 'rgba(0,0,0,0.6)'; };

        function closePopup() {
            overlay.style.opacity = '0';
            box.style.transform = 'scale(0.5)';
            setTimeout(function() { overlay.parentNode && overlay.parentNode.removeChild(overlay); }, 300);
            document.body.dataset.mitoPopupShown = '1';
        }

        close.onclick = closePopup;
        overlay.onclick = function(e) { if (e.target === overlay) closePopup(); };

        box.appendChild(img);
        box.appendChild(close);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        setTimeout(function() {
            overlay.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, 10);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(showPopup, POPUP_DELAY); });
    } else {
        setTimeout(showPopup, POPUP_DELAY);
    }
})();
