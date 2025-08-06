<script>
// Sidebar Hızlı Sıralama - Anında çalışır
(function() {
    'use strict';
    
    function reorderNow() {
        const sidebarBig = document.querySelector('.sidebar__big');
        if (!sidebarBig) {
            setTimeout(reorderNow, 10);
            return;
        }
        
        console.log('Sidebar sıralama başlatılıyor...');
        
        // Mevcut öğeleri kaydet
        const links = sidebarBig.querySelector('.sidebar__links');
        const actions = sidebarBig.querySelector('.sidebar__actions');
        
        // Casino ve Spor butonlarındaki yanlış metinleri düzelt
        if (links) {
            const casinoLink = links.querySelector('a[href*="casino"] span');
            const sportLink = links.querySelector('a[href*="sportsbook"] span');
            
            if (casinoLink && (casinoLink.textContent.includes('HEADER.CASINO') || casinoLink.textContent.includes('CASINO'))) {
                casinoLink.textContent = 'Casino';
            }
            if (sportLink && (sportLink.textContent.includes('HEADER.SPORTS') || sportLink.textContent.includes('SPOR'))) {
                sportLink.textContent = 'Spor';
            }
        }
        
        // Yeni sıralama
        sidebarBig.innerHTML = `
            ${links ? links.outerHTML : ''}
            
            <div class="sidebar__menu">
                <span class="sidebar__title">PROMOSYONLAR</span>
                <ul class="sidebar__nav sidebar__nav--border">
                    <li><a href="/tr/promotions"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#gift"></use></svg>Promosyonlar</a></li>
                    <li><a href="https://t.me/+Ulf7jOKPbHxkZDU0"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#telegram"></use></svg>Telegram</a></li>
                    <li><a class="lowbar__btn"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#head-set"></use></svg>Canlı Destek</a></li>
                </ul>
            </div>
            
            <div class="sidebar__menu">
                <span class="sidebar__title">MENÜ</span>
                <ul class="sidebar__nav sidebar__nav--border">
                    <li class="active"><a href="/tr/"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#homepage"></use></svg>Ana Sayfa</a></li>
                    <li><a href="/tr/vip"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#vip"></use></svg>VIP Kulübü</a></li>
                    <li><a href="/tr/casino"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#casino2"></use></svg>Casino</a></li>
                    <li><a href="/tr/sportsbook"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#sportsbook-basketball"></use></svg>Spor Bahisleri</a></li>
                    <li><a href="/tr/e-sport"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#gamer"></use></svg>E-Sport</a></li>
                    <li><a href="/tr/poker"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#pokr-side"></use></svg>Poker<span>Yeni</span></a></li>
                </ul>
            </div>
            
            <div class="sidebar__menu">
                <ul class="sidebar__nav sidebar__nav--border">
                    <span class="sidebar__title">OYUNLAR</span>
                    <li><a class="no-bg" href="/tr/casino/slots"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#slots2"></use></svg>Slotlar</a><button class="sidebar__collapsed collapsed" data-bs-toggle="collapse" data-bs-target="#collapse-menu1"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#arrow-right"></use></svg></button></li>
                    <ul id="collapse-menu1" class="sidebar__nav sidebar__nav--border sidebar__nav--collapse collapse">
                        <li><a href="/tr/casino/group/lobby"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#slots"></use></svg>Lobi</a></li>
                        <li><a href="/tr/casino/group/popular-games"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#popular"></use></svg>Popüler Oyunlar</a></li>
                        <li><a href="/tr/casino/group/new-releases"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#last-released"></use></svg>Yeni Çıkanlar</a></li>
                        <li><a href="/tr/casino/group/free-spins"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#freespin"></use></svg>Free Spins</a></li>
                        <li><a href="/tr/casino/group/enhanced-rtp"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#icon-enhanced-rtp"></use></svg>Geliştirilmiş RTP</a></li>
                        <li><a href="/tr/casino/group/instant-win"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#instant-win"></use></svg>Anında Kazanma</a></li>
                        <li><a href="/tr/casino/group/jackpot-games"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#jackpots"></use></svg>Jackpot Oyunları</a></li>
                        <li><a href="/tr/casino/group/bonus-buy"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#buy-bonus"></use></svg>Bonus Satın Al</a></li>
                    </ul>
                    <li><a class="no-bg" href="/tr/live-casino"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#live-casino"></use></svg>Canlı Casino</a><button class="sidebar__collapsed collapsed" data-bs-toggle="collapse" data-bs-target="#collapse-menu2"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#arrow-right"></use></svg></button></li>
                    <ul id="collapse-menu2" class="sidebar__nav sidebar__nav--border sidebar__nav--collapse collapse">
                        <li><a href="/tr/casino/group/live-lobby"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#live-lobby"></use></svg>Canlı Lobi</a></li>
                        <li><a href="/tr/casino/group/table-games"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#table-games"></use></svg>Masa Oyunları</a></li>
                        <li><a href="/tr/casino/group/roulette"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#roulette"></use></svg>Rulet</a></li>
                        <li><a href="/tr/casino/group/baccarat"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#baccarat"></use></svg>Bakarat</a></li>
                        <li><a href="/tr/casino/group/blackjack"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#blackjack"></use></svg>Blackjack</a></li>
                        <li><a href="/tr/casino/group/poker"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#poker"></use></svg>Poker</a></li>
                    </ul>
                    <li><a class="no-bg" href="/tr/sportsbook"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#sportsbook2"></use></svg>Spor Bahisleri</a><button class="sidebar__collapsed collapsed" data-bs-toggle="collapse" data-bs-target="#collapse-menu4"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#arrow-right"></use></svg></button></li>
                    <ul id="collapse-menu4" class="sidebar__nav sportsbook sidebar__nav--collapse collapse">
                        <li><a href="/tr/sportsbook/live-betting"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#live"></use></svg>Canlı</a></li>
                        <li><a href="/tr/sportsbook/upcoming"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#upcoming"></use></svg>Yaklaşan</a></li>
                        <li><a href="/tr/sportsbook/soccer"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#football"></use></svg>Futbol</a></li>
                        <li><a href="/tr/sportsbook/basketball"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#basketball"></use></svg>Basketbol</a></li>
                        <li><a href="/tr/sportsbook/american-football"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#american-football"></use></svg>Amerikan futbolu</a></li>
                        <li><a href="/tr/sportsbook/baseball"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#baseball"></use></svg>Beyzbol</a></li>
                        <li><a href="/tr/sportsbook/tennis"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#tennis"></use></svg>Tenis</a></li>
                        <li><a href="/tr/sportsbook/table-tennis"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#table-tennis"></use></svg>Masa tenisi</a></li>
                        <li><a href="/tr/sportsbook/volleyball"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#volleyball"></use></svg>Voleybol</a></li>
                        <li><a href="/tr/sportsbook/mma"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#mma"></use></svg>MMA</a></li>
                        <li><a href="/tr/sportsbook/ice-hockey"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#ice-hockey"></use></svg>Buz hokeyi</a></li>
                    </ul>
                </ul>
            </div>
            
            <div class="sidebar__menu">
                <span class="sidebar__title">DİĞER HİZMETLER</span>
                <ul class="sidebar__nav sidebar__nav--border">
                    <li><a href="/tr/challenges"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#challenge"></use></svg>Meydan Okumalar</a></li>
                    <li><a href="/tr/blog"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#blog"></use></svg>Blog</a></li>
                    <li><a href="/tr/tournaments"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#tournaments"></use></svg>Turnuvalar</a></li>
                    <li><a href="/tr/trade"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#chart"></use></svg>Trade<span>Yeni</span></a></li>
                </ul>
            </div>
            
            <div class="sidebar__menu">
                <span class="sidebar__title">EK BİLGİ</span>
                <ul class="sidebar__nav">
                    <li><a href="/tr/policy"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#privacy"></use></svg>Gizlilik Politikası</a></li>
                </ul>
            </div>
            
            ${actions ? actions.outerHTML : ''}
        `;
        
        // Canlı destek fonksiyonu
        document.querySelectorAll('.lowbar__btn').forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                if (!document.getElementById('comm100-container')) {
                    const div = document.createElement('div');
                    div.id = 'comm100-container';
                    div.innerHTML = '<div id="comm100-button-cf22035f-9040-4c87-aead-e206f7b7bb69"></div>';
                    document.body.appendChild(div);
                    
                    const script = document.createElement('script');
                    script.innerHTML = 'var Comm100API=Comm100API||{};(function(t){function e(e){var a=document.createElement("script"),c=document.getElementsByTagName("script")[0];a.type="text/javascript",a.async=!0,a.src=e+t.site_id,c.parentNode.insertBefore(a,c)}t.chat_buttons=t.chat_buttons||[],t.chat_buttons.push({code_plan:"cf22035f-9040-4c87-aead-e206f7b7bb69",div_id:"comm100-button-cf22035f-9040-4c87-aead-e206f7b7bb69"}),t.site_id=90006516,t.main_code_plan="cf22035f-9040-4c87-aead-e206f7b7bb69",e("https://service.bb44fsbnh.com/livechat.ashx?siteId="),setTimeout(function(){t.loaded||e("https://service.24juimk6ta.com/livechat.ashx?siteId=")},5e3)})(Comm100API||{})';
                    document.body.appendChild(script);
                    
                    setTimeout(() => {
                        if (window.Comm100API && window.Comm100API.showChat) {
                            window.Comm100API.showChat();
                        }
                    }, 1000);
                }
            };
        });
        
        // Güçlü dropdown fonksiyonu - sidebar__collapsed butonları için
        setTimeout(() => {
            // Tüm collapse butonlarını bul ve event ekle
            const collapseButtons = document.querySelectorAll('.sidebar__collapsed, [data-bs-toggle="collapse"]');
            
            collapseButtons.forEach(button => {
                // Önceki event'leri temizle
                button.onclick = null;
                button.removeEventListener('click', arguments.callee);
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const targetId = this.getAttribute('data-bs-target');
                    if (!targetId) return;
                    
                    const target = document.querySelector(targetId);
                    if (!target) return;
                    
                    console.log('Button clicked:', targetId);
                    
                    // Şu anda bu menü açık mı kontrol et (önce kontrol et!)
                    const isCurrentlyOpen = target.classList.contains('show') || target.style.display === 'block';
                    
                    console.log('Menu durumu öncesi:', targetId, 'açık mı:', isCurrentlyOpen);
                    
                    // Eğer şu anda açık olan menüye tekrar tıklanıyorsa, sadece kapat
                    if (isCurrentlyOpen) {
                        target.classList.remove('show');
                        target.style.display = 'none';
                        const arrow = this.querySelector('svg');
                        if (arrow) {
                            arrow.style.transform = 'rotate(0deg)';
                            arrow.style.transition = 'transform 0.2s ease';
                        }
                        console.log('Menu kapatıldı:', targetId);
                        return; // Buradan çık, diğer işlemleri yapma
                    }
                    
                    // Eğer farklı bir menü açıksa veya hiç menü açık değilse
                    // Önce tüm menüleri kapat
                    document.querySelectorAll('.sidebar__nav--collapse').forEach(menu => {
                        menu.classList.remove('show');
                        menu.style.display = 'none';
                    });
                    
                    // Tüm okları sıfırla
                    document.querySelectorAll('.sidebar__collapsed svg, [data-bs-toggle="collapse"] svg').forEach(arrow => {
                        arrow.style.transform = 'rotate(0deg)';
                        arrow.style.transition = 'transform 0.2s ease';
                    });
                    
                    // Şimdi hedef menüyü aç
                    target.style.display = 'block';
                    target.classList.add('show');
                    const arrow = this.querySelector('svg');
                    if (arrow) {
                        arrow.style.transform = 'rotate(90deg)';
                        arrow.style.transition = 'transform 0.2s ease';
                    }
                    console.log('Menu açıldı:', targetId);
                });
            });
            
            console.log('Collapse butonları ayarlandı:', collapseButtons.length);
        }, 200);
        
        console.log('Sidebar sıralama ve tüm fonksiyonlar tamamlandı');
    }
    
    // Anında çalıştır
    reorderNow();
    
})();
</script>