<script>
// Jojova Sohbet butonu - Sadece mobilde VE login olmuş kullanıcılara görünür olacak şekilde
(function() {
    // Mobil cihaz kontrolü
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }
    
    // Login durumunu kontrol eden fonksiyon - basitleştirilmiş ve güvenilir
    function isUserLoggedIn() {
        // En güvenilir yöntem: header--logged class'ını kontrol et
        // Bu class sadece login olmuş kullanıcılarda bulunur
        return !!document.querySelector('.header.header--logged');
    }

    // Butonu oluşturan fonksiyon
    function createChatButton() {
        // Eğer buton zaten varsa tekrar oluşturma
        if (document.querySelector('.jojova_sohbet_button')) {
            return;
        }
        
        // Eğer mobil değilse buton oluşturma (login kontrolü kaldırıldı)
        if (!isMobile()) {
            return;
        }

        // Buton container'ı oluştur
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'jojova_sohbet_container';
        buttonContainer.style.width = '100%';
        buttonContainer.style.padding = '10px 15px';
        buttonContainer.style.backgroundColor = '#273341';
        buttonContainer.style.boxSizing = 'border-box';
        buttonContainer.style.zIndex = '1000'; // Header'ın altında ama oyunların üstünde
        buttonContainer.style.position = 'relative';
        
        // Butonu oluştur
        const button = document.createElement('button');
        button.className = 'jojova_sohbet_button';
        button.type = 'button';
        
        // Buton stillerini ayarla
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.width = '100%';
        button.style.height = '46px';
        button.style.padding = '0 18px';
        button.style.margin = '0 auto';
        button.style.borderRadius = '12px';
        button.style.color = 'var(--tf-tc)';
        button.style.textDecoration = 'none';
        button.style.fontSize = '18px';
        button.style.fontWeight = '700';
        button.style.textTransform = 'uppercase';
        button.style.lineHeight = '1';
        button.style.whiteSpace = 'nowrap';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.style.border = '2px solid rgba(255, 229, 92, 0.2)';
        button.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)';
        button.style.boxShadow = '0 3px 12px rgba(255, 229, 92, 0.15)';
        button.style.zIndex = '1000'; // Header'ın altında ama oyunların üstünde
        
        // Buton içeriği
        const span = document.createElement('span');
        span.textContent = 'Jojova Sohbet';
        span.style.position = 'relative';
        span.style.zIndex = '2';
        button.appendChild(span);
        
        // Chat icon ekle
        const iconSpan = document.createElement('span');
        iconSpan.textContent = '💬';
        iconSpan.style.marginRight = '8px';
        iconSpan.style.fontSize = '20px';
        iconSpan.style.position = 'relative';
        iconSpan.style.zIndex = '2';
        button.insertBefore(iconSpan, span);
        
        // Shine efekti için overlay
        const shineOverlay = document.createElement('span');
        shineOverlay.style.position = 'absolute';
        shineOverlay.style.top = '0';
        shineOverlay.style.left = '-100%';
        shineOverlay.style.width = '100%';
        shineOverlay.style.height = '100%';
        shineOverlay.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)';
        shineOverlay.style.transition = 'left 0.6s ease';
        shineOverlay.style.zIndex = '1';
        button.appendChild(shineOverlay);
        
        // Hover efekti
        button.addEventListener('mouseenter', function() {
            button.style.borderColor = 'rgba(255, 229, 92, 0.4)';
            button.style.background = 'linear-gradient(135deg, rgba(255, 229, 92, 0.08) 0%, rgba(255, 229, 92, 0.04) 100%)';
            button.style.color = '#ffffff';
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 10px 30px rgba(255, 229, 92, 0.3)';
            shineOverlay.style.left = '100%';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.borderColor = 'rgba(255, 229, 92, 0.2)';
            button.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)';
            button.style.color = 'var(--tf-tc)';
            button.style.transform = '';
            button.style.boxShadow = '0 3px 12px rgba(255, 229, 92, 0.15)';
            shineOverlay.style.left = '-100%';
        });
        
        // Butona tıklama olayı ekle - React uyumlu
        button.onclick = function() {
            // Header'daki sohbet butonunu bul
            const chatButton = document.querySelector('#chatSidebar');
            
            if (chatButton) {
                console.log('Sohbet butonu bulundu, React olayı tetikleniyor');
                
                // React olay tetikleme - mousedown ve mouseup olayları
                // mousedown
                const mousedownEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                chatButton.dispatchEvent(mousedownEvent);
                
                // mouseup - kısa bir gecikme ile
                setTimeout(() => {
                    const mouseupEvent = new MouseEvent('mouseup', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    chatButton.dispatchEvent(mouseupEvent);
                    
                    // click olayını da tetikle
                    const clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    chatButton.dispatchEvent(clickEvent);
                    
                    console.log('Sohbet butonu olayları tetiklendi');
                }, 50);
            } else {
                console.warn('Sohbet butonu bulunamadı');
            }
        };
        
        // Butonu container'a ekle
        buttonContainer.appendChild(button);
        
        // Z-index ayarları - oyun frame'lerini engellememesi için
        const style = document.createElement('style');
        style.textContent = `
            .jojova_sohbet_container {
                z-index: 1000 !important;
                position: relative !important;
            }
            .jojova_sohbet_button {
                z-index: 1000 !important;
                position: relative !important;
            }
            /* Oyun frame'lerinin z-index'ini koru */
            iframe[src*="casino"], iframe[src*="game"], iframe[src*="slot"], 
            iframe[src*="pragmatic"], iframe[src*="evolution"], 
            .game-frame, .casino-frame {
                z-index: 9999 !important;
            }
            /* Header'ın z-index'ini koru */
            .header, .header--logged {
                z-index: 10000 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Butonu header ve main__content arasına ekle
        const header = document.querySelector('.header') || document.querySelector('.header.header--logged');
        const mainContent = document.querySelector('#main__content');
        
        if (header && mainContent && header.parentNode) {
            // Butonu eklemeden önce CSS ile görünür yap
            buttonContainer.style.display = 'block';
            header.parentNode.insertBefore(buttonContainer, mainContent);
            console.log('Jojova Sohbet butonu eklendi');
        } else {
            console.warn('Header veya main__content bulunamadı, buton eklenemedi');
        }
    }

    // Sayfa yüklendiğinde ve resize olduğunda kontrol et - OPTİMİZE EDİLDİ
    let resizeTimeout;
    function initChatButton() {
        // İlk yükleme
        createChatButton();
        
        // Pencere boyutu değiştiğinde kontrol et - DEBOUNCE EKLENDİ
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const button = document.querySelector('.jojova_sohbet_button');
                
                if (isMobile() && !button) {
                    createChatButton();
                } else if (!isMobile() && button) {
                    const container = document.querySelector('.jojova_sohbet_container');
                    if (container && container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }
            }, 250); // 250ms debounce
        });
        
        // DOM değişikliklerini izle (SPA için) - THROTTLE EKLENDİ
        let observerTimeout;
        const observer = new MutationObserver(function(mutations) {
            if (observerTimeout) return; // Throttle
            
            observerTimeout = setTimeout(function() {
                observerTimeout = null;
                const mainContentExists = document.querySelector('#main__content');
                const buttonExists = document.querySelector('.jojova_sohbet_button');
                
                if (isMobile() && mainContentExists && !buttonExists) {
                    createChatButton();
                } else if (!isMobile() && buttonExists) {
                    const container = document.querySelector('.jojova_sohbet_container');
                    if (container && container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }
            }, 500); // 500ms throttle
        });
        
        // Sadece main__content'i izle (body yerine daha spesifik)
        const mainContent = document.querySelector('#main__content');
        if (mainContent) {
            observer.observe(mainContent, {
                childList: true,
                subtree: false // subtree kaldırıldı
            });
        }
    }

    // Sayfa yüklendiğinde çalıştır - OPTİMİZE EDİLDİ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initChatButton, 300);
        });
    } else {
        setTimeout(initChatButton, 300);
    }
    
    // URL değişikliklerini izle (SPA için) - TEK OBSERVER YETERLİ
    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(function() {
                const buttonExists = document.querySelector('.jojova_sohbet_button');
                if (isMobile() && !buttonExists) {
                    createChatButton();
                } else if (!isMobile() && buttonExists) {
                    const container = document.querySelector('.jojova_sohbet_container');
                    if (container && container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }
            }, 500);
        }
    });
    
    // Sadece title değişikliğini izle (daha hafif)
    urlObserver.observe(document.querySelector('title') || document.head, { 
        childList: true, 
        subtree: false 
    });
    
    // Popstate event'i de dinle (geri/ileri butonları için)
    window.addEventListener('popstate', function() {
        setTimeout(function() {
            const buttonExists = document.querySelector('.jojova_sohbet_button');
            if (isMobile() && !buttonExists) {
                createChatButton();
            } else if (!isMobile() && buttonExists) {
                const container = document.querySelector('.jojova_sohbet_container');
                if (container && container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }
        }, 500);
    });
})();
</script>