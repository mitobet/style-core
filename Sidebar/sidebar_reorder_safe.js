<script>
// Sidebar Tam Sıralama - İstenen Düzen
(function() {
    'use strict';
    
    let hasReordered = false;
    
    // Sayfa yenilemeden navigation fonksiyonu
    function navigateWithoutReload(url) {
        try {
            // URL'yi güncelle (sayfa yenilemeden)
            history.pushState({}, '', url);
            
            // Site'nin kendi AJAX navigation sistemini tetikle
            if (window.loadPage && typeof window.loadPage === 'function') {
                window.loadPage(url);
                return;
            }
            
            // Site router'ını tetikle
            if (window.router && typeof window.router.navigate === 'function') {
                window.router.navigate(url);
                return;
            }
            
            // Next.js router varsa
            if (window.next && window.next.router) {
                window.next.router.push(url);
                return;
            }
            
            // Vue router varsa
            if (window.$router) {
                window.$router.push(url);
                return;
            }
            
            // React router varsa
            if (window.history && window.history.pushState) {
                // PopState event'ini tetikle
                window.dispatchEvent(new PopStateEvent('popstate', {
                    state: { url: url }
                }));
                return;
            }
            
            // Son çare: normal yönlendirme
            window.location.href = url;
            
        } catch (error) {
            console.log('AJAX navigation hatası, normal yönlendirme yapılıyor:', error);
            window.location.href = url;
        }
    }
    
    function fullReorder() {
        if (hasReordered) return;
        
        console.log('Sidebar tam sıralama başlıyor...');
        
        // Hem web hem mobil sidebar'ı kontrol et
        let sidebar = document.querySelector('.sidebar__big');
        
        // Eğer .sidebar__big yoksa mobil sidebar'ı dene
        if (!sidebar) {
            sidebar = document.querySelector('.mobile-sidebar') || 
                     document.querySelector('.sidebar-mobile') || 
                     document.querySelector('.sidebar');
        }
        
        if (!sidebar) {
            console.log('Hiçbir sidebar bulunamadı (web/mobil)!');
            return;
        }
        
        console.log('Bulunan sidebar:', sidebar.className);
        
        // Mobil cihaz kontrolü
        const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
        console.log('Mobil cihaz:', isMobile);
        
        try {
            // Mevcut elementleri tanımla
            const allLinks = sidebar.querySelectorAll('.sidebar__links');
            const allMenus = sidebar.querySelectorAll('.sidebar__menu');
            const actionsDiv = sidebar.querySelector('.sidebar__actions');
            
            const casinoSporLinks = allLinks[0]; // Casino + Spor
            let bonusTalepLinks = allLinks[1]; // Bonus Talep (varsa)
            const menuDiv = allMenus[0]; // Menü kısmı
            const promosyonlarDiv = allMenus[1]; // Promosyonlar
            const ekBilgiDiv = allMenus[2]; // Ek Bilgi
            
            // Giriş yapılıp yapılmadığını kontrol et
            const isLoggedIn = allLinks.length >= 2 && bonusTalepLinks;
            console.log('Giriş yapılmış:', isLoggedIn);
            
            console.log('Elementler kontrol ediliyor:', {
                allLinks: allLinks.length,
                allMenus: allMenus.length,
                menuDiv: !!menuDiv,
                promosyonlarDiv: !!promosyonlarDiv,
                ekBilgiDiv: !!ekBilgiDiv,
                actionsDiv: !!actionsDiv,
                isLoggedIn: isLoggedIn
            });
            
            if (!menuDiv || !promosyonlarDiv || !ekBilgiDiv || !actionsDiv) {
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
            
             // Bonus Talep'i giriş durumuna göre yerleştir
            if (!isLoggedIn) {
                // Giriş yapılmamışsa Bonus Talep'i Ek Bilgi'ye ekle
                const bonusTalepExists = ekBilgiUL.querySelector('a[href*="bonus-request"]');
                if (!bonusTalepExists) {
                    console.log('Bonus Talep Ek Bilgi\'ye ekleniyor (giriş yapılmamış)...');
                    const bonusLi = document.createElement('li');
                    bonusLi.className = '';
                    bonusLi.innerHTML = '<a href="/tr?modal=bonus-request"><svg class="svg-icon"><use href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#gift" xlink:href="/static/media/sprite.bce01d9c40dd918c38bcbf36110f6884.svg#gift"></use></svg>Bonus Talep</a>';
                    ekBilgiUL.appendChild(bonusLi);
                }
            } else {
                console.log('Bonus Talep üstte büyük buton olarak kalacak (giriş yapılmış)...');
            }
            
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
            
            // Menü'yü temizle ve yeniden sırala (event'leri koruyarak)
            menuUL.innerHTML = '';
            orderedMenu.forEach(item => {
                menuUL.appendChild(item);
            });
            
            // Sadece accordion toggle - basit ve etkili
            setTimeout(function() {
                console.log('Accordion toggle sistemi kuruluyor...');
                
                // Accordion butonlarını bul ve direkt event ekle
                const accordionButtons = sidebar.querySelectorAll('.sidebar__collapsed');
                
                accordionButtons.forEach(function(button) {
                    // Eski event'leri temizle
                    button.replaceWith(button.cloneNode(true));
                });
                
                // Yeni butonları bul ve event ekle
                const freshButtons = sidebar.querySelectorAll('.sidebar__collapsed');
                
                freshButtons.forEach(function(button) {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const targetSelector = this.getAttribute('data-bs-target');
                        if (!targetSelector) return;
                        
                        const collapseElement = document.querySelector(targetSelector);
                        if (!collapseElement) return;
                        
                        const isOpen = collapseElement.classList.contains('show');
                        
                        console.log('🎯 Accordion tıklandı:', targetSelector, isOpen ? 'KAPANıYOR' : 'AÇıLıYOR');
                        
                        if (isOpen) {
                            // Kapat
                            collapseElement.classList.add('collapse');
                            collapseElement.classList.remove('show');
                            this.classList.add('collapsed');
                            this.setAttribute('aria-expanded', 'false');
                        } else {
                            // Önce diğerlerini kapat
                            const allOpen = sidebar.querySelectorAll('.sidebar__nav--collapse.show');
                            allOpen.forEach(el => {
                                el.classList.add('collapse');
                                el.classList.remove('show');
                                const btn = sidebar.querySelector(`[data-bs-target="#${el.id}"]`);
                                if (btn) {
                                    btn.classList.add('collapsed');
                                    btn.setAttribute('aria-expanded', 'false');
                                }
                            });
                            
                            // Şimdi aç
                            collapseElement.classList.remove('collapse');
                            collapseElement.classList.add('show');
                            this.classList.remove('collapsed');
                            this.setAttribute('aria-expanded', 'true');
                        }
                    });
                });
                
                // Link navigation için ayrı sistem
                sidebar.addEventListener('click', function(e) {
                    const link = e.target.closest('a');
                    if (!link || link.classList.contains('sidebar__collapsed')) return;
                    
                    const href = link.getAttribute('href');
                    if (href && href !== '#' && !href.startsWith('javascript:')) {
                        e.preventDefault();
                        
                        // Özel yönlendirmeler
                        if (href.includes('/casino/slots')) {
                            navigateWithoutReload('/tr/casino/group/lobby');
                            console.log('Slotlar -> Lobby');
                        } else if (href.includes('/live-casino')) {
                            navigateWithoutReload('/tr/casino/group/live-lobby');
                            console.log('Canlı Casino -> Live Lobby');
                        } else {
                            navigateWithoutReload(href);
                        }
                    }
                });
                
                console.log('✅ Accordion sistemi hazır!');
                
            }, 100);
            
            // Casino sayfasında akordiyonu otomatik aç
            if (window.location.pathname.includes('/casino')) {
                setTimeout(function() {
                    const collapseMenu = sidebar.querySelector('#collapse-menu1');
                    const button = sidebar.querySelector('[data-bs-target="#collapse-menu1"]');
                    
                    if (collapseMenu && button) {
                        // Akordiyonu aç
                        collapseMenu.classList.remove('collapse');
                        collapseMenu.classList.add('show');
                        button.classList.remove('collapsed');
                        button.setAttribute('aria-expanded', 'true');
                        
                        console.log('Casino sayfasında Slot akordiyonu açıldı');
                    }
                }, 200);
            }
            
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
            
                                     // Yeni sıralama giriş durumuna göre
            sidebar.appendChild(casinoSporLinks); // Casino + Spor üstte kalacak
            
            if (isLoggedIn && bonusTalepLinks) {
                console.log('Giriş yapılmış - Bonus Talep üstte ekleniyor');
                sidebar.appendChild(bonusTalepLinks); // Bonus Talep büyük buton üstte
            } else {
                console.log('Giriş yapılmamış - Bonus Talep altta olacak');
            }
            
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
        setTimeout(fullReorder, 3000);
        setTimeout(fullReorder, 5000);
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryMultiple);
    } else {
        tryMultiple();
    }
    
    // Interval ile sürekli kontrol et (20 saniye boyunca)
    const checkInterval = setInterval(function() {
        if (hasReordered) {
            clearInterval(checkInterval);
            return;
        }
        fullReorder();
    }, 1000);
    
    // 20 saniye sonra interval'i durdur
    setTimeout(function() {
        clearInterval(checkInterval);
    }, 20000);
    
    // Mobil için ekstra kontroller
    // Orientation change
    window.addEventListener('orientationchange', function() {
        if (!hasReordered) {
            setTimeout(fullReorder, 500);
        }
    });
    
    // Resize event
    window.addEventListener('resize', function() {
        if (!hasReordered) {
            setTimeout(fullReorder, 300);
        }
    });
    
    // Touch event (mobil etkileşim)
    document.addEventListener('touchstart', function() {
        if (!hasReordered) {
            setTimeout(fullReorder, 100);
        }
    }, { once: true });
    
    // Visibility change (sayfa focus)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && !hasReordered) {
            setTimeout(fullReorder, 200);
        }
    });
    
    // MutationObserver - DOM değişikliklerini izle
    const observer = new MutationObserver(function(mutations) {
        if (hasReordered) {
            observer.disconnect();
            return;
        }
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Sidebar eklenince veya değişince dene
                if (mutation.target.classList && 
                    (mutation.target.classList.contains('sidebar__big') || 
                     mutation.target.querySelector('.sidebar__big'))) {
                    console.log('Sidebar DOM değişikliği algılandı');
                    setTimeout(fullReorder, 100);
                }
            }
        });
    });
    
    // Body'yi izle
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // 30 saniye sonra observer'ı durdur
    setTimeout(function() {
        observer.disconnect();
    }, 30000);
    
})();
</script>