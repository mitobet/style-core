<script>
// Sidebar Tam Sıralama - İstenen Düzen
(function() {
    'use strict';
    
    let hasReordered = false;
    
    function fullReorder() {
        if (hasReordered) return;
        
        console.log('Sidebar tam sıralama başlıyor...');
        
        const sidebar = document.querySelector('.sidebar__big');
        if (!sidebar) {
            console.log('Sidebar bulunamadı!');
            return;
        }
        
        try {
            // Mevcut elementleri tanımla
            const allLinks = sidebar.querySelectorAll('.sidebar__links');
            const allMenus = sidebar.querySelectorAll('.sidebar__menu');
            const actionsDiv = sidebar.querySelector('.sidebar__actions');
            
            const casinoSporLinks = allLinks[0]; // Casino + Spor
            const bonusTalepLinks = allLinks[1]; // Bonus Talep
            const menuDiv = allMenus[0]; // Menü kısmı
            const promosyonlarDiv = allMenus[1]; // Promosyonlar
            const ekBilgiDiv = allMenus[2]; // Ek Bilgi
            
            console.log('Elementler kontrol ediliyor:', {
                allLinks: allLinks.length,
                allMenus: allMenus.length,
                menuDiv: !!menuDiv,
                promosyonlarDiv: !!promosyonlarDiv,
                ekBilgiDiv: !!ekBilgiDiv,
                actionsDiv: !!actionsDiv
            });
            
            if (!menuDiv || !promosyonlarDiv || !ekBilgiDiv || !actionsDiv || allLinks.length < 2) {
                console.log('Gerekli elementler bulunamadı, bekleniyor...');
                return;
            }
            
            // 1. Promosyonlar bölümüne Telegram, Canlı Destek ve Bonus Talep ekle
            const promosyonlarUL = promosyonlarDiv.querySelector('ul');
            const ekBilgiUL = ekBilgiDiv.querySelector('ul');
            
            // Canlı Destek'i Ek Bilgi'den al, Promosyonlar'a taşı
            const canliDestek = ekBilgiUL.querySelector('li:first-child');
            if (canliDestek) {
                console.log('Canlı Destek taşınıyor...');
                promosyonlarUL.appendChild(canliDestek);
            }
            
            // Telegram linki ekle (yoksa)
            const telegramExists = promosyonlarUL.querySelector('a[href*="telegram"]');
            if (!telegramExists) {
                console.log('Telegram ekleniyor...');
                const telegramLi = document.createElement('li');
                telegramLi.className = '';
                telegramLi.innerHTML = '<a href="https://t.me/jojova_resmi"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#telegram" xlink:href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#telegram"></use></svg>Telegram</a>';
                promosyonlarUL.insertBefore(telegramLi, promosyonlarUL.children[1]); // Promosyonlar'dan sonra
            }
            
                         // Bonus Talep Promosyonlar'a eklenmeyecek, üstte büyük buton olacak
             console.log('Bonus Talep üstte büyük buton olarak kalacak...');
            
            // Turnuvalar Promosyonlar'dan kaldırılacak, sonra Menü'ye eklenecek
            const turnuvalar = promosyonlarUL.querySelector('a[href="/tr/tournaments"]');
            if (turnuvalar) {
                const turnuvalarLi = turnuvalar.closest('li');
                console.log('Turnuvalar Promosyonlar\'dan kaldırılıyor...');
                turnuvalarLi.remove(); // Önce kaldır
            }
            
                        // 2. Menü sıralaması ve E-Sport, Poker'i Oyunlar'a taşı
            const oyunlarUL = menuDiv.querySelectorAll('ul')[1]; // İkinci UL (Oyunlar)
            const menuUL = menuDiv.querySelector('ul'); // İlk UL (Menü)
            
            // E-Sport'u Menü'den çıkar, Oyunlar'a taşı
            const eSportMenuItem = menuUL.querySelector('a[href="/tr/e-sport"]');
            if (eSportMenuItem) {
                const eSportLi = eSportMenuItem.closest('li');
                console.log('E-Sport Oyunlar bölümüne taşınıyor...');
                oyunlarUL.appendChild(eSportLi); // Oyunlar'ın sonuna ekle
            }
           
           // Poker'i Menü'den çıkar, Oyunlar'a taşı
            const pokerMenuItem = menuUL.querySelector('a[href="/tr/poker"]');
            if (pokerMenuItem) {
                const pokerLi = pokerMenuItem.closest('li');
                console.log('Poker Oyunlar bölümüne taşınıyor...');
                oyunlarUL.appendChild(pokerLi); // Oyunlar'ın sonuna ekle
            }
            
            // Turnuvaları Menü'ye yeni element olarak ekle
            const turnuvalarExists = menuUL.querySelector('a[href="/tr/tournaments"]');
            if (!turnuvalarExists) {
                console.log('Turnuvalar Menü\'ye ekleniyor...');
                const turnuvalarLi = document.createElement('li');
                turnuvalarLi.className = '';
                turnuvalarLi.innerHTML = '<a href="/tr/tournaments"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#tournaments" xlink:href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#tournaments"></use></svg>Turnuvalar</a>';
                menuUL.appendChild(turnuvalarLi);
            }
            
            // 3. Menü'yü istenen sıraya göre düzenle
            console.log('Menü sıralaması düzenleniyor...');
            const menuItems = Array.from(menuUL.children);
            const orderedMenu = [];
            
            // İstenen sıralama
            const menuOrder = [
                '/tr/sportsbook', // Spor bahisleri
                '/tr/casino', // Casino
                '/tr/favorites', // Favoriler
                '/tr/vip', // VIP Club
                '/tr/trade', // Trade
                '/tr/tournaments', // Turnuva
                '/tr/challenges', // Meydan okumalar
                '/tr/blog' // Blog
            ];
            
            // Sıraya göre elementleri düzenle
            menuOrder.forEach(href => {
                const item = menuItems.find(li => {
                    const link = li.querySelector('a[href="' + href + '"]');
                    return link !== null;
                });
                if (item) {
                    orderedMenu.push(item);
                }
            });
            
            // Kalanları ekle (Ana Sayfa gibi)
            menuItems.forEach(item => {
                if (!orderedMenu.includes(item)) {
                    orderedMenu.unshift(item); // Başa ekle
                }
            });
            
            // Menü'yü temizle ve yeniden sırala
            menuUL.innerHTML = '';
            orderedMenu.forEach(item => {
                menuUL.appendChild(item);
            });
            
            // 3. Casino ve Spor başlıklarını düzelt
            const casinoLinks = sidebar.querySelectorAll('.sidebar__link--casino');
            casinoLinks.forEach(link => {
                const span = link.querySelector('span');
                if (span) {
                    const text = span.textContent.trim();
                    if (text === 'HEADER.CASINO') {
                        span.textContent = 'Casino';
                    } else if (text === 'HEADER.SPORTS') {
                        span.textContent = 'Spor';
                    }
                }
            });
            
            // 4. Sidebar'ı yeniden sırala
            console.log('Sidebar yeniden sıralanıyor...');
            sidebar.innerHTML = '';
            
                         // Yeni sıralama: Casino/Spor (üstte), Bonus Talep (üstte), Promosyonlar, Menü, Ek Bilgi, Actions
             // Bonus Talep büyük buton olarak üstte geri geldi
             sidebar.appendChild(casinoSporLinks); // Casino + Spor üstte kalacak
             sidebar.appendChild(bonusTalepLinks); // Bonus Talep büyük buton üstte
             sidebar.appendChild(promosyonlarDiv);
             sidebar.appendChild(menuDiv);
             sidebar.appendChild(ekBilgiDiv);
             sidebar.appendChild(actionsDiv);
            
            hasReordered = true;
            console.log('Sidebar tam sıralama tamamlandı!');
            
        } catch (error) {
            console.error('Sidebar sıralama hatası:', error);
        }
    }
    
    // Çoklu deneme stratejisi
    function tryMultiple() {
        setTimeout(fullReorder, 100);
        setTimeout(fullReorder, 500);
        setTimeout(fullReorder, 1000);
        setTimeout(fullReorder, 2000);
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryMultiple);
    } else {
        tryMultiple();
    }
    
    // Interval ile sürekli kontrol et (10 saniye boyunca)
    const checkInterval = setInterval(function() {
        if (hasReordered) {
            clearInterval(checkInterval);
            return;
        }
        fullReorder();
    }, 1000);
    
    // 10 saniye sonra interval'i durdur
    setTimeout(function() {
        clearInterval(checkInterval);
    }, 10000);
    
})();
</script>