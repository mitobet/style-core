<script>
// Footer Backlink Injector - jojovagiris.cc
(function() {
  'use strict';
  
  function injectBacklink() {
    const footer = document.querySelector('.footer__cellar') || 
                   document.querySelector('.footer__copyright') || 
                   document.querySelector('.footer');
    
    if (footer && !document.querySelector('#jojova-backlink')) {
      const backlink = document.createElement('div');
      backlink.id = 'jojova-backlink';
      backlink.style.cssText = 'margin-top: 20px; font-size: 14px; color: var(--tf-tc2); opacity: 0.8;';
      backlink.innerHTML = '<a href="https://jojovagiris.cc" rel="dofollow" style="color: var(--tf-tc2); text-decoration: none;">Jojova Giriş</a>';
      footer.appendChild(backlink);
    }
  }
  
  // Sayfa yüklendiğinde çalıştır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectBacklink, 1000);
    });
  } else {
    setTimeout(injectBacklink, 1000);
  }
  
})();
</script>
