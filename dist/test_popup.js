/* MITOBET - GitHub CDN Test - Kirmizi Bildirim */
(function() {
    if (document.getElementById('mito-cdn-test')) return;

    var popup = document.createElement('div');
    popup.id = 'mito-cdn-test';
    popup.style.cssText = 'position:fixed;top:20px;right:20px;z-index:999999;' +
        'background:linear-gradient(135deg,#dc2626,#991b1b);color:#fff;' +
        'padding:14px 22px;border-radius:8px;font-family:sans-serif;font-size:13px;' +
        'box-shadow:0 8px 32px rgba(220,38,38,0.4);border:1px solid rgba(255,255,255,0.2);' +
        'max-width:300px;opacity:0;transform:translateY(-20px);' +
        'transition:opacity 0.4s ease,transform 0.4s ease;';

    popup.innerHTML = '<div style="font-weight:700;font-size:14px;margin-bottom:4px;">CDN Aktif!</div>' +
        '<div style="color:rgba(255,255,255,0.85);font-size:11px;line-height:1.4;">Bu bildirim GitHub CDN uzerinden yuklendi.</div>';

    document.body.appendChild(popup);

    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0)';
        });
    });

    setTimeout(function() {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-20px)';
        setTimeout(function() { popup.remove(); }, 400);
    }, 5000);

    console.log('[MITO CDN] Kirmizi bildirim yuklendi - CDN calisiyor!');
})();
