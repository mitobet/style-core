<script>
// Basit slot link yönlendirmesi ve akordiyon kontrol sistemi
(function() {
    // Sayfa yüklendiğinde casino sayfasındaysak akordiyonu aç
    if (window.location.pathname === '/tr/casino/') {
        setTimeout(() => {
            const collapseMenu = document.querySelector('#collapse-menu1');
            const button = document.querySelector('.sidebar__collapsed');
            
            if (collapseMenu && button) {
                // Bootstrap Collapse instance oluştur
                const bsCollapse = new bootstrap.Collapse(collapseMenu, {
                    toggle: false
                });
                
                // Akordiyonu aç
                bsCollapse.show();
                
                console.log('Casino sayfasında akordion açıldı');
            }
        }, 500);
    }
    
    // Akordiyon menü kontrol sistemi - sadece bir tane açık kalmalı
    document.addEventListener('click', function(e) {
        const accordionButton = e.target.closest('[data-bs-toggle="collapse"]');
        
        if (accordionButton) {
            // Tüm açık akordiyonları bul
            const allCollapses = document.querySelectorAll('.collapse.show');
            const targetId = accordionButton.getAttribute('data-bs-target') || 
                           accordionButton.getAttribute('href');
            
            // Mevcut tıklanan hedef dışındaki tüm akordiyonları kapat
            allCollapses.forEach(collapse => {
                if (collapse.id !== targetId.replace('#', '')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        }
    });
    
    // Sayfa içeriğini değiştiren fonksiyon
    function navigateToPage(url) {
        // URL'yi değiştir
        history.pushState({}, '', url);
        
        // Popstate event'ini tetikle (sayfa değişimini simüle et)
        window.dispatchEvent(new PopStateEvent('popstate'));
        
        // Eğer site AJAX navigation kullanıyorsa, o sistemini tetikle
        if (window.loadPage && typeof window.loadPage === 'function') {
            window.loadPage(url);
        }
        
        // Alternatif: Site'nin kendi navigation sistemini tetikle
        if (window.router && typeof window.router.navigate === 'function') {
            window.router.navigate(url);
        }
        
        console.log('Sayfa yenilemeden yönlendirme:', url);
    }
    
    // Link yönlendirme sistemi
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Slot linki tıklandıysa casino'ya yönlendir
        if (href && href.includes('/casino/slots')) {
            e.preventDefault();
            navigateToPage('/tr/casino/');
        }
        
        // Live casino linki tıklandıysa live-lobby'ye yönlendir
        if (href && href.includes('/live-casino')) {
            e.preventDefault();
            navigateToPage('/tr/casino/group/live-lobby');
        }
    });
    
    // Browser geri/ileri butonları için
    window.addEventListener('popstate', function(e) {
        console.log('URL değişti:', window.location.pathname);
        // Burada sayfa içeriğini güncelle
    });
})();
</script>