<script>
// Sidebar Tam Sıralama - İstenen Düzen
(function() {
    'use strict';
    
    let hasReordered = false;
    let resizeHandlerAttached = false;
    let currentWheelImg = null;
    
    // SPA Navigation + Black Screen Koruması
    function navigateWithoutReload(url) {
        try {
            // 1. URL'yi güncelle (sayfa yenilemeden)
            history.pushState({ path: url }, '', url);
            
            // 2. Black screen kontrolü için marker
            let contentLoaded = false;
            let checkAttempts = 0;
            const maxAttempts = 2; // 200ms (100ms x 2) - Hızlı geçiş
            
            // 3. İçerik yükleme kontrolü
            const checkContentInterval = setInterval(() => {
                checkAttempts++;
                
                // Ana içerik container'ı kontrol et
                const mainContent = document.getElementById('main__content') || 
                                  document.querySelector('.main-content') ||
                                  document.querySelector('[class*="main"]');
                
                // Eğer içerik varsa ve yüklendiyse
                if (mainContent && mainContent.innerHTML.trim().length > 100) {
                    contentLoaded = true;
                    clearInterval(checkContentInterval);
                }
                
                // Timeout - içerik yüklenmediyse fallback
                if (checkAttempts >= maxAttempts && !contentLoaded) {
                    clearInterval(checkContentInterval);
                    window.location.href = url;
                }
            }, 100);
            
            // 4. PopState event'i tetikle (SPA router için)
            window.dispatchEvent(new PopStateEvent('popstate', {
                state: { path: url }
            }));
            
            // 5. Custom event'ler tetikle (farklı SPA framework'leri için)
            window.dispatchEvent(new CustomEvent('spa-navigate', {
                detail: { url: url }
            }));
            
            // 6. Hash change event'i tetikle (eski SPA sistemleri için)
            if (url.includes('#')) {
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
            
            // 7. Site'nin kendi navigation sistemini tetikle
            if (window.loadPage && typeof window.loadPage === 'function') {
                window.loadPage(url);
                contentLoaded = true;
                clearInterval(checkContentInterval);
            }
            
            // 8. Router API kontrolü
            if (window.router && typeof window.router.navigate === 'function') {
                window.router.navigate(url);
                contentLoaded = true;
                clearInterval(checkContentInterval);
            }
            
            // 9. Scroll to top (SPA için)
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
            
        } catch (error) {
            // Hata durumunda direkt yönlendirme
            window.location.href = url;
        }
    }
    
    function fullReorder() {
        if (hasReordered) return;
        
        // Dil tespiti - Her zaman TR sıralaması kullanılacak, sadece içerik dili değişecek
        const currentLang = window.location.pathname.startsWith('/en') ? 'en' : 'tr';
        const langPrefix = `/${currentLang}`;
        
        // Hem web hem mobil sidebar'ı kontrol et
        let sidebar = document.querySelector('.sidebar__big');
        
        // Eğer .sidebar__big yoksa mobil sidebar'ı dene
        if (!sidebar) {
            sidebar = document.querySelector('.mobile-sidebar') || 
                     document.querySelector('.sidebar-mobile') || 
                     document.querySelector('.sidebar');
        }
        
        if (!sidebar) {
            return;
        }
        
        // Mobil cihaz kontrolü
        const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
        
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
            
            if (!menuDiv || !promosyonlarDiv || !ekBilgiDiv || !actionsDiv) {
                return;
            }
            
            // 1. Promosyonlar bölümüne Telegram, Canlı Destek ve Bonus Talep ekle
            const promosyonlarUL = promosyonlarDiv.querySelector('ul');
            const ekBilgiUL = ekBilgiDiv.querySelector('ul');
            
            // Canlı Destek'i Ek Bilgi'den al, Promosyonlar'a taşı
            const canliDestek = ekBilgiUL.querySelector('li:first-child');
            if (canliDestek) {
                promosyonlarUL.appendChild(canliDestek);
            }
            
            // Telegram linki ekle (yoksa)
            const telegramExists = promosyonlarUL.querySelector('a[href*="telegram"]');
            if (!telegramExists) {
                const telegramLi = document.createElement('li');
                telegramLi.className = '';
                telegramLi.innerHTML = '<a href="https://t.me/+9VwSnEpsgB00MmFk" class="telegram-link"><img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/1xwgNIaAxMb7cqSf1soFhnZ7QBFA2rkmeTzfKBYa.svg" class="telegram-icon" alt="Telegram">Telegram</a>';
                promosyonlarUL.insertBefore(telegramLi, promosyonlarUL.children[1]); // Promosyonlar'dan sonra
            }
            
             // Bonus Talep'i giriş durumuna göre yerleştir
            if (!isLoggedIn) {
                // Giriş yapılmamışsa Bonus Talep'i Ek Bilgi'ye ekle
                const bonusTalepExists = ekBilgiUL.querySelector('a[href*="bonus-request"]');
                if (!bonusTalepExists) {
                    const bonusLi = document.createElement('li');
                    bonusLi.className = '';
                    bonusLi.innerHTML = `<a href="${langPrefix}?modal=bonus-request" class="bonus-request-link"><img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/fgQ0BrRTxckTxXYtq0Dsy5LuxHdOecr80zIZ74YH.svg" class="bonus-icon" alt="Bonus">Bonus Talep</a>`;
                    ekBilgiUL.appendChild(bonusLi);
                }
            }
            
            // Turnuvalar Promosyonlar'dan kaldırılacak, sonra Menü'ye eklenecek
            const turnuvalar = promosyonlarUL.querySelector(`a[href="${langPrefix}/tournaments"]`);
            if (turnuvalar) {
                const turnuvalarLi = turnuvalar.closest('li');
                turnuvalarLi.remove(); // Önce kaldır
            }
            
                        // 2. Menü sıralaması ve E-Sport, Poker'i Oyunlar'a taşı
            const oyunlarUL = menuDiv.querySelectorAll('ul')[1]; // İkinci UL (Oyunlar)
            const menuUL = menuDiv.querySelector('ul'); // İlk UL (Menü)
            
            // E-Sport'u Menü'den çıkar, Oyunlar'a taşı
            const eSportMenuItem = menuUL.querySelector(`a[href="${langPrefix}/e-sport"]`);
            if (eSportMenuItem) {
                const eSportLi = eSportMenuItem.closest('li');
                oyunlarUL.appendChild(eSportLi); // Oyunlar'ın sonuna ekle
            }
           
           // Poker'i Menü'den çıkar, Oyunlar'a taşı
            const pokerMenuItem = menuUL.querySelector(`a[href="${langPrefix}/poker"]`);
            if (pokerMenuItem) {
                const pokerLi = pokerMenuItem.closest('li');
                oyunlarUL.appendChild(pokerLi); // Oyunlar'ın sonuna ekle
            }
            
            // Turnuvaları Menü'ye yeni element olarak ekle
            const turnuvalarExists = menuUL.querySelector(`a[href="${langPrefix}/tournaments"]`);
            if (!turnuvalarExists) {
                const turnuvalarLi = document.createElement('li');
                turnuvalarLi.className = '';
                turnuvalarLi.innerHTML = `<a href="${langPrefix}/tournaments" class="tournament-link"><img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/mCU8jYTx62bnXXpm99uTSYCOAySV2ivxwViHoBuW.svg" class="tournament-icon" alt="Turnuvalar">Turnuvalar</a>`;
                menuUL.appendChild(turnuvalarLi);
            }
            
            // 3. Menü'yü istenen sıraya göre düzenle
            const menuItems = Array.from(menuUL.children);
            const orderedMenu = [];
            
            // İstenen sıralama - Her zaman TR sıralaması kullanılacak
            const menuOrder = [
                `${langPrefix}/sportsbook`, // Spor bahisleri
                `${langPrefix}/casino`, // Casino
                `${langPrefix}/favorites`, // Favoriler
                `${langPrefix}/vip`, // VIP Club
                `${langPrefix}/trade`, // Kripto Trade
                `${langPrefix}/tournaments`, // Turnuva
                `${langPrefix}/challenges` // Meydan okumalar
                // Blog kaldırıldı - gizlendi
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

            // Casino linkini Lobby'ye yönlendir (dil algılı, domain bağımsız)
            const lobbyPath = `${langPrefix}/casino/group/lobby`;
            const casinoAnchors = menuUL.querySelectorAll(`a[href="${langPrefix}/casino"], a[href="${langPrefix}/casino/"]`);
            casinoAnchors.forEach(a => a.setAttribute('href', lobbyPath));
            
            // Sadece accordion toggle - basit ve etkili
            setTimeout(function() {
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
                
                // ⚡ BONUS BUTONU ÖZEL CLICK HANDLER - Garantili çalışma
                function setupBonusButtonHandler() {
                    const bonusButtons = document.querySelectorAll('.sidebar__link--bonus, a[href*="modal=bonus-request"]');
                    bonusButtons.forEach(btn => {
                        if (btn.dataset.bonusHandlerSet) return;
                        btn.dataset.bonusHandlerSet = 'true';
                        
                        // Click handler
                        btn.addEventListener('click', function(e) {
                            const href = this.getAttribute('href');
                            if (href && href.includes('modal=')) {
                                // Normal link davranışı - modal açılsın
                                window.location.href = href;
                            }
                        }, { capture: false });
                        
                        // Touch handler (mobil için)
                        btn.addEventListener('touchend', function(e) {
                            e.preventDefault();
                            const href = this.getAttribute('href');
                            if (href && href.includes('modal=')) {
                                window.location.href = href;
                            }
                        }, { passive: false });
                    });
                }
                
                // Bonus handler'ı kur (periyodik kontrol kaldırıldı)
                setupBonusButtonHandler();
                // Sadece 2 kere daha dene (interval yerine)
                setTimeout(setupBonusButtonHandler, 1000);
                setTimeout(setupBonusButtonHandler, 3000);
                
                // Link navigation için SPA sistemi - Smooth geçiş
                function handleNavigation(e) {
                    const link = e.target.closest('a');
                    if (!link || link.classList.contains('sidebar__collapsed')) return;
                    
                    // ⚡ BONUS BUTONU - Özel handler'a bırak
                    if (link.classList.contains('sidebar__link--bonus') || (link.getAttribute('href') && link.getAttribute('href').includes('modal=bonus-request'))) {
                        return; // Bonus handler'a bırak
                    }
                    
                    // ⚡ DİL LİNKLERİ - Dil handler'a bırak
                    if (link.closest('.sidebar__lang-menu, .sidebar__lang-small-menu')) {
                        return; // Dil değiştirme handler'ına bırak
                    }
                    
                    const href = link.getAttribute('href');
                    if (!href || href === '#' || href.startsWith('javascript:')) return;
                    
                    // ⚡ HARİCİ LİNKLER - SPA'ya GİRMEZ (Telegram, vb.)
                    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
                        return; // SPA'yı atla, normal link gibi aç
                    }
                    
                    // ⚡ MODAL LİNKLER - SPA'ya GİRMEZ (Bonus Talep, vb.)
                    if (href.includes('?modal=') || href.includes('&modal=')) {
                        return; // SPA'yı atla, normal modal aç
                    }
                    
                    // ✅ İÇ SAYFALAR - SPA İLE SMOOTH GEÇİŞ (Sürekli devam eder)
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // Özel yönlendirmeler
                    let targetUrl = href;
                    if (/^\/(tr|en)\/casino\/?$/.test(href)) {
                        targetUrl = `${langPrefix}/casino/group/lobby`;
                    } else if (href.includes('/casino/slots')) {
                        targetUrl = `${langPrefix}/casino/group/lobby`;
                    } else if (href.includes('/live-casino')) {
                        targetUrl = `${langPrefix}/casino/group/live-lobby`;
                    }
                    
                    // SPA navigation başlat
                    navigateWithoutReload(targetUrl);
                }
                
                // TÜM cihazlar için basit click sistemi - gecikme YOK
                sidebar.addEventListener('click', handleNavigation, { capture: true });
                
                // Mobil için ek touch desteği - daha hızlı
                if ('ontouchstart' in window) {
                    let touchStartY = 0;
                    let touchStartX = 0;
                    let touchMoved = false;
                    
                    sidebar.addEventListener('touchstart', function(e) {
                        const link = e.target.closest('a');
                        if (!link || link.classList.contains('sidebar__collapsed')) return;
                        
                        touchStartY = e.touches[0].clientY;
                        touchStartX = e.touches[0].clientX;
                        touchMoved = false;
                    }, { passive: true });
                    
                    sidebar.addEventListener('touchmove', function(e) {
                        if (!touchMoved) {
                            const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
                            const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
                            if (deltaY > 10 || deltaX > 10) {
                                touchMoved = true;
                            }
                        }
                    }, { passive: true });
                    
                    sidebar.addEventListener('touchend', function(e) {
                        const link = e.target.closest('a');
                        if (!link || link.classList.contains('sidebar__collapsed')) return;
                        
                        // Kaydırma yoksa = tıklama
                        if (!touchMoved) {
                            const href = link.getAttribute('href');
                            
                            // ⚡ MODAL LİNKLER - Normal davranış (Bonus Talep, vb.)
                            if (href && (href.includes('?modal=') || href.includes('&modal='))) {
                                // preventDefault çağırma, normal link gibi çalışsın
                                return;
                            }
                            
                            // ⚡ HARİCİ LİNKLER - Normal davranış (Telegram, vb.)
                            if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))) {
                                // preventDefault çağırma, normal link gibi çalışsın
                                return;
                            }
                            
                            // ⚡ DİL LİNKLERİ - Dil handler'a bırak
                            if (link.closest('.sidebar__lang-menu, .sidebar__lang-small-menu')) {
                                return; // Dil değiştirme handler'ına bırak
                            }
                            
                            e.preventDefault();
                            handleNavigation(e);
                        }
                    }, { passive: false });
                }
                
            }, 100);
            
            // ======= DİL DROPDOWN - BASİTLEŞTİRİLMİŞ MOBİL UYUMLU ÇÖZÜM =======
            
            function toggleLanguageMenu(button) {
                // Container bul
                const container = button.closest('.sidebar__lang, .sidebar__lang-small');
                if (!container) return;
                
                // Menu bul
                let menu = container.querySelector('.dropdown-menu, .sidebar__lang-menu, .sidebar__lang-small-menu');
                if (!menu) return;
                
                // Toggle
                const isOpen = menu.classList.contains('show') || menu.style.display === 'block';
                
                // Tüm menüleri kapat
                document.querySelectorAll('.dropdown-menu.sidebar__lang-menu, .sidebar__lang-small-menu').forEach(function(m) {
                    m.style.display = 'none';
                    m.classList.remove('show');
                });
                
                // Tüm butonlardan show class'ını kaldır
                document.querySelectorAll('.sidebar__lang-btn, .sidebar__lang-small-btn').forEach(function(b) {
                    b.classList.remove('show');
                });
                
                // Bu menüyü aç/kapat
                if (!isOpen) {
                    menu.style.display = 'block';
                    menu.classList.add('show');
                    button.classList.add('show');
                    
                    // Menü açıldıktan sonra linklere SPA dil değiştirme ekle
                    setTimeout(function() {
                        var links = menu.querySelectorAll('a');
                        links.forEach(function(link) {
                            if (link.getAttribute('data-lang-ready')) return;
                            link.setAttribute('data-lang-ready', 'true');
                            
                            var href = link.getAttribute('href');
                            
                            // Hedef dili belirle
                            var targetLang = 'tr';
                            if (href && href.includes('/en')) targetLang = 'en';
                            else if (href && href.includes('/az')) targetLang = 'az';
                            else if (href && href.includes('/tr')) targetLang = 'tr';
                            
                            link.setAttribute('data-target-lang', targetLang);
                            link.removeAttribute('href');
                            link.style.cursor = 'pointer';
                            
                            // SPA Dil değiştirme fonksiyonu
                            function goToLang() {
                                var lang = link.getAttribute('data-target-lang');
                                var currentPath = window.location.pathname;
                                var currentSearch = window.location.search;
                                
                                // Mevcut path'ten dili çıkar
                                var pathWithoutLang = currentPath.replace(/^\/(tr|en|az)(\/|$)/, '/');
                                if (pathWithoutLang === '/') pathWithoutLang = '';
                                
                                // Yeni URL oluştur
                                var newPath = '/' + lang + pathWithoutLang;
                                if (newPath === '/' + lang) newPath = '/' + lang + '/';
                                
                                // Query string'i koru
                                newPath = newPath + currentSearch;
                                
                                // Menüyü kapat
                                menu.style.display = 'none';
                                menu.classList.remove('show');
                                button.classList.remove('show');
                                
                                // Sidebar'ı kapat
                                var sidebarEl = document.querySelector('.sidebar');
                                if (sidebarEl) sidebarEl.classList.remove('active');
                                
                                // SPA navigasyonu
                                navigateWithoutReload(newPath);
                            }
                            
                            link.addEventListener('click', goToLang);
                            link.addEventListener('touchend', function(e) {
                                e.preventDefault();
                                goToLang();
                            });
                        });
                    }, 10);
                }
            }
            
            // Window global fonksiyon
            window.toggleLanguageMenu = toggleLanguageMenu;
            
            function attachLanguageEvents() {
                // Bootstrap dropdown'ları kapat - SADECE SIDEBAR İÇİNDE
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function(btn) {
                        if (btn.classList.contains('sidebar__lang-btn') || btn.classList.contains('sidebar__lang-small-btn')) {
                            btn.removeAttribute('data-bs-toggle');
                            btn.removeAttribute('aria-expanded');
                        }
                    });
                }
                
                // TÜM dil butonlarını bul
                const langButtons = document.querySelectorAll('.sidebar__lang-btn, .sidebar__lang-small-btn');
                
                langButtons.forEach(function(btn) {
                    // Daha önce event eklendi mi kontrol et
                    if (btn.getAttribute('data-lang-event-added') === 'true') return;
                    btn.setAttribute('data-lang-event-added', 'true');
                    
                    // Flag: işlem yapıldı mı?
                    let menuActionDone = false;
                    
                    // Touch event (iPhone/iPad için - EN ÖNCELİKLİ)
                    btn.addEventListener('touchend', function(e) {
                        if (menuActionDone) return;
                        menuActionDone = true;
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLanguageMenu(this);
                    }, { passive: false });
                    
                    // Click event (Desktop için)
                    btn.addEventListener('click', function(e) {
                        if (menuActionDone) return;
                        menuActionDone = true;
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLanguageMenu(this);
                    }, { passive: false });
                    
                    // Touch/mouse başlangıcında flag'i sıfırla
                    btn.addEventListener('touchstart', function() {
                        menuActionDone = false;
                    }, { passive: true });
                    
                    btn.addEventListener('mousedown', function() {
                        menuActionDone = false;
                    }, { passive: true });
                });
            }
            
            // Dil seçeneklerine ONCLICK ekleme - EN BASİT ÇÖZÜM
            function attachLangOptionEvents() {
                const langOptions = document.querySelectorAll('.sidebar__lang-menu a, .sidebar__lang-small-menu a');
                langOptions.forEach(function(link) {
                    // Zaten onclick varsa atla
                    if (link.getAttribute('data-lang-click-set')) return;
                    link.setAttribute('data-lang-click-set', 'true');
                    
                    // Doğrudan onclick attribute ekle
                    link.onclick = function(e) {
                        e.preventDefault();
                        var href = this.getAttribute('href');
                        if (href) {
                            window.location.href = href;
                        }
                        return false;
                    };
                });
            }
            
            // İlk yükleme - sadece 2 deneme yeterli (3 yerine)
            setTimeout(function() {
                attachLanguageEvents();
                attachLangOptionEvents();
            }, 200);
            setTimeout(function() {
                attachLanguageEvents();
                attachLangOptionEvents();
            }, 1500);
            
            // Dışarı tıklandığında kapat (hem touch hem mouse için)
            function closeLangMenuOnOutsideClick(e) {
                if (!e.target.closest('.sidebar__lang, .sidebar__lang-small')) {
                    document.querySelectorAll('.dropdown-menu.sidebar__lang-menu, .sidebar__lang-small-menu').forEach(function(m) {
                        m.style.display = 'none';
                        m.classList.remove('show');
                    });
                    document.querySelectorAll('.sidebar__lang-btn, .sidebar__lang-small-btn').forEach(function(b) {
                        b.classList.remove('show');
                    });
                }
            }
            document.addEventListener('touchstart', closeLangMenuOnOutsideClick, { passive: true });
            document.addEventListener('mousedown', closeLangMenuOnOutsideClick, { passive: true });
            
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
                    }
                }, 200);
            }
            
            // 3. Casino, Spor ve Trade başlıklarını düzelt
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
            
            // Trade başlığını ve NEW etiketini dile göre düzelt
            const tradeLink = sidebar.querySelector(`a[href="${langPrefix}/trade"]`);
            if (tradeLink) {
                // Önce içerikteki tüm metni al
                const tradeContent = tradeLink.textContent.trim();
                
                // Trade linkinin içeriğini temizle
                tradeLink.innerHTML = '';
                
                // Trade ikonu ekle - yeni SVG ikonu (beyaz renkte)
                const tradeIcon = document.createElement('img');
                tradeIcon.className = 'svg-icon';
                tradeIcon.src = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/gDI9d49MVye0NYdRYbrpFCPktCLsEuEYFEb186e3.svg';
                tradeIcon.alt = 'Trade';
                tradeIcon.style.width = '24px';
                tradeIcon.style.height = '24px';
                tradeIcon.style.filter = 'brightness(0) invert(1)'; // Beyaz renk için
                tradeLink.appendChild(tradeIcon);
                
                // Trade ismini dile göre ekle
                const tradeText = document.createTextNode(
                    currentLang === 'tr' ? 'Kripto Trade' :
                    currentLang === 'en' ? 'Crypto Trade' :
                    currentLang === 'az' ? 'Kripto Ticarət' : 'Crypto Trade'
                );
                tradeLink.appendChild(tradeText);
                
                // NEW etiketini dile göre ekle
                const newSpan = document.createElement('span');
                newSpan.className = 'new';
                newSpan.textContent = currentLang === 'tr' ? 'YENİ' : 'NEW';
                tradeLink.appendChild(newSpan);
            }
            
            // 4. Casino ve Spor'u yan yana yerleştir, Şans Çarkı'nı alta ekle
            const casinoLink = casinoSporLinks.querySelector('a[href*="casino"]');
            const sporLink = casinoSporLinks.querySelector('a[href*="sportsbook"]');
            
            // Yeni yapı oluştur
            const rowDiv = document.createElement('div');
            rowDiv.className = 'sidebar__links-row';
            
            if (casinoLink) rowDiv.appendChild(casinoLink);
            if (sporLink) rowDiv.appendChild(sporLink);
            
            casinoSporLinks.innerHTML = '';
            casinoSporLinks.appendChild(rowDiv);
            
            // Şans Çarkı butonunu ekle
            const wheelButton = document.createElement('a');
            wheelButton.className = 'sidebar__link sidebar__link--wheel';
            wheelButton.href = `${langPrefix}/wheel`;
            
            // Görseli img tag ile ekle (responsive - ekran boyutuna göre)
            const wheelImg = document.createElement('img');
            
            // Ekran genişliğine göre uygun görseli seç
            const isMobileView = window.innerWidth <= 767;
            const desktopImg = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/gbHlLDaZQ8rCLyoXQkqw16wzjdsbTHvbudIzkn3g.png';
            const mobileImg = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/QcX0IqUMs8RAW6Ab9ByDgE63neMFIzw9ABiLnU3A.png'; // 211x46 boyutunda
            
            wheelImg.src = isMobileView ? mobileImg : desktopImg;
            wheelImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
                display: block;
            `;
            wheelButton.appendChild(wheelImg);
            
            // Referansı kaydet
            currentWheelImg = wheelImg;
            
            // Resize handler'ı sadece bir kez ekle
            if (!resizeHandlerAttached) {
                window.addEventListener('resize', function() {
                    if (currentWheelImg) {
                        const nowMobile = window.innerWidth <= 767;
                        const desktopSrc = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/gbHlLDaZQ8rCLyoXQkqw16wzjdsbTHvbudIzkn3g.png';
                        const mobileSrc = 'https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/QcX0IqUMs8RAW6Ab9ByDgE63neMFIzw9ABiLnU3A.png';
                        currentWheelImg.src = nowMobile ? mobileSrc : desktopSrc;
                    }
                });
                resizeHandlerAttached = true;
            }
            
            casinoSporLinks.appendChild(wheelButton);
            
            // 5. Sidebar'ı yeniden sırala
            sidebar.innerHTML = '';
            
            // Yeni sıralama giriş durumuna göre
            sidebar.appendChild(casinoSporLinks); // Casino + Spor + Şans Çarkı üstte
            
            if (isLoggedIn && bonusTalepLinks) {
                sidebar.appendChild(bonusTalepLinks); // Bonus Talep büyük buton üstte
            }
            
            sidebar.appendChild(promosyonlarDiv);
            sidebar.appendChild(menuDiv);
            sidebar.appendChild(ekBilgiDiv);
            sidebar.appendChild(actionsDiv);
            
            hasReordered = true;
            
        } catch (error) {
            // Hata durumunda sessizce geç
        }
    }
    
    // OPTİMİZE EDİLMİŞ - Daha az deneme, daha akıllı kontrol
    function tryMultiple() {
        // Sadece 3 deneme yeterli (6 yerine)
        setTimeout(fullReorder, 100);
        setTimeout(fullReorder, 500);
        setTimeout(fullReorder, 1500);
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryMultiple);
    } else {
        tryMultiple();
    }
    
    // Interval KALDIRILDI - sadece observer kullanılacak
    // Eski: 20 saniye boyunca her 1 saniye = 20 kontrol
    // Yeni: Sadece gerektiğinde (observer ile)
    
    // Mobil için ekstra kontroller - SADECE 1 KERE
    window.addEventListener('orientationchange', function() {
        if (!hasReordered) {
            setTimeout(fullReorder, 500);
        }
    }, { once: true });
    
    // Visibility change - SADECE 1 KERE
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && !hasReordered) {
            setTimeout(fullReorder, 200);
        }
    }, { once: true });
    
    // MutationObserver - DOM değişikliklerini izle (OPTİMİZE)
    let observerTimeout;
    const observer = new MutationObserver(function(mutations) {
        if (hasReordered) {
            observer.disconnect();
            return;
        }
        
        // Throttle - çok sık tetiklenmesin
        if (observerTimeout) return;
        
        let shouldReorder = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.target.classList) {
                if (mutation.target.classList.contains('sidebar__big') || 
                    mutation.target.classList.contains('sidebar')) {
                    shouldReorder = true;
                    break;
                }
            }
        }
        
        if (shouldReorder) {
            observerTimeout = setTimeout(function() {
                observerTimeout = null;
                fullReorder();
            }, 200);
        }
    });
    
    // Sadece sidebar container'ı izle (body yerine)
    const sidebarContainer = document.querySelector('.sidebar') || document.body;
    observer.observe(sidebarContainer, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // 10 saniye sonra observer'ı durdur (30 yerine)
    setTimeout(function() {
        observer.disconnect();
    }, 10000);
    
    // Dil butonları temizleme - TEK SEFERLİK (interval kaldırıldı)
    function cleanLangButtons() {
        document.querySelectorAll('.sidebar__lang-btn, .sidebar__lang-small-btn').forEach(function(btn) {
            btn.removeAttribute('onclick');
            btn.removeAttribute('data-onclick-added');
            btn.removeAttribute('data-click-added');
        });
    }
    
    // Sadece başlangıçta ve reorder sonrası çalıştır
    setTimeout(cleanLangButtons, 100);
    setTimeout(cleanLangButtons, 1000);
    
})();
</script>
</script>


