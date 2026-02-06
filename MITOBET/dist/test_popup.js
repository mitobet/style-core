/* MITOBET - GitHub CDN Test Popup */
(function() {
    if (document.getElementById('mito-cdn-test')) return;

    var popup = document.createElement('div');
    popup.id = 'mito-cdn-test';
    popup.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999999;' +
        'background:linear-gradient(135deg,#1a1a2e,#16213e);color:#CFAE6D;' +
        'padding:16px 24px;border-radius:10px;font-family:sans-serif;font-size:14px;' +
        'box-shadow:0 8px 32px rgba(0,0,0,0.6);border:1px solid rgba(207,174,109,0.4);' +
        'max-width:280px;opacity:0;transform:translateY(20px);' +
        'transition:opacity 0.4s ease,transform 0.4s ease;';

    popup.innerHTML = '<div style="font-weight:700;font-size:15px;margin-bottom:6px;">CDN Test Basarili!</div>' +
        '<div style="color:rgba(255,255,255,0.7);font-size:12px;line-height:1.4;">Bu mesaj GitHub + jsDelivr CDN uzerinden yuklendi.</div>';

    document.body.appendChild(popup);

    // Fade in
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0)';
        });
    });

    // 5sn sonra kapat
    setTimeout(function() {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        setTimeout(function() { popup.remove(); }, 400);
    }, 5000);

    console.log('[MITO CDN TEST] Popup yuklendi - GitHub CDN calisiyor!');
})();
