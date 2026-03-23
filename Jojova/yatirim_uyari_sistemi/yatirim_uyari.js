(function() {
    'use strict';
    
    // Konfigürasyon
    const CONFIG = {
        cssPath: 'yatirim_uyari_sistemi/yatirim_uyari.css',
        warningId: 'jojova-smart-contract-warning',
        selectors: {
            walletModal: ['#wallet-modal', '[id*="wallet"]', '.modal[style*="display: block"]'],
            formCellar: '.form__cellar',
            formErrors: '.form__note.error',
            withdrawButtons: 'button, input[type="submit"], .btn',
            currencySelectors: [
                '.currency-selector',
                '.currency-dropdown',
                '[data-currency]',
                '.selected-currency',
                '.currency-item.active',
                '.currency-item.selected',
                '.modal__form select',
                '.form-select',
                'select[name*="currency"]',
                'select[name*="coin"]',
                '.currency-symbol',
                '.coin-symbol'
            ]
        },
        withdrawKeywords: ['Çek', 'Withdraw', 'TALEP'],
        // Kripto para birimleri listesi
        cryptoCurrencies: [
            'USDT', 'BTC', 'ADA', 'AVAX', 'XRP', 'SHIB', 'LINK', 'USDC', 'BNB', 'ETH', 'TRX', 'DOGE', 'LTC',
            // Ek yaygın kriptolar
            'SOL', 'DOT', 'MATIC', 'UNI', 'BCH', 'XLM', 'ALGO', 'VET', 'ICP', 'FIL', 'ETC', 'NEAR', 'ATOM', 'HBAR'
        ],
        messages: {
            tr: {
                warning: '<strong>• Dikkat:</strong> Akıllı sözleşme cüzdanlarından yapılan para yatırma işlemleri desteklenmemektedir. Bu tür işlemlerde fonlarınızın kaybolma riski bulunmaktadır.'
            },
            en: {
                warning: '<strong>• Warning:</strong> Deposits from smart contract wallets are not supported. There is a risk of losing your funds in such transactions.'
            }
        }
    };
    
    // Durum yönetimi
    let isInitialized = false;
    let observers = [];
    let periodicInterval = null;
    
    // Dil tespiti
    function getCurrentLanguage() {
        return window.location.href.includes('/tr/') ? 'tr' : 'en';
    }

    // Mevcut seçili para birimini tespit et
    function getCurrentCurrency() {
        // Önce URL'den para birimi tespiti - en güvenilir yöntem
        const urlParams = new URLSearchParams(window.location.search);
        const currencyFromUrl = urlParams.get('currency');
        if (currencyFromUrl) {
            console.log('JOJOVA Currency detected from URL:', currencyFromUrl.toUpperCase());
            return currencyFromUrl.toUpperCase();
        }
        
        // URL'de currency yoksa hash'ten kontrol et
        const hash = window.location.hash;
        const hashMatch = hash.match(/currency=([^&]+)/);
        if (hashMatch) {
            console.log('JOJOVA Currency detected from hash:', hashMatch[1].toUpperCase());
            return hashMatch[1].toUpperCase();
        }
        
        // URL'de currency yoksa DOM'dan seçili para birimini tespit et
        const domCurrency = getCurrentCurrencyFromDOM();
        if (domCurrency) {
            console.log('JOJOVA Currency detected from DOM:', domCurrency.toUpperCase());
            return domCurrency.toUpperCase();
        }
        
        console.log('JOJOVA No currency detected');
        return null;
    }

    // DOM'dan mevcut seçili para birimini tespit et
    function getCurrentCurrencyFromDOM() {
        // Çeşitli selektörlerle seçili para birimini bul
        const selectors = [
            '.currency-item.active',
            '.currency-item.selected',
            '.selected-currency',
            '.currency-selector .active',
            '.currency-dropdown .selected',
            '[data-currency].active',
            '[data-currency].selected',
            '.modal__form select option:checked',
            '.form-select option:checked',
            'select[name*="currency"] option:checked',
            'select[name*="coin"] option:checked',
            '.currency-symbol.active',
            '.coin-symbol.active',
            '.currency-list .selected',
            '.crypto-currency.active'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                // Element'in text içeriğinden para birimini çıkar
                let currency = element.textContent?.trim() || 
                              element.getAttribute('data-currency') || 
                              element.value;
                
                if (currency) {
                    // Sadece para birimi kodunu al (örn: "BTC Bitcoin" -> "BTC")
                    const currencyMatch = currency.match(/^([A-Z]{2,5})/);
                    if (currencyMatch) {
                        return currencyMatch[1];
                    }
                    
                    // Eğer direkt para birimi kodu ise
                    if (/^[A-Z]{2,5}$/.test(currency)) {
                        return currency;
                    }
                }
            }
        }
        
        // Alternatif yöntem: Modal içindeki tüm elementleri tara
        const modal = findWalletModal();
        if (modal) {
            const allElements = modal.querySelectorAll('*');
            for (const element of allElements) {
                const text = element.textContent?.trim();
                if (text) {
                    // Kripto para birimi pattern'ini ara
                    for (const crypto of CONFIG.cryptoCurrencies) {
                        if (text.includes(crypto) && 
                            (element.classList.contains('active') || 
                             element.classList.contains('selected') ||
                             element.style.display !== 'none')) {
                            return crypto;
                        }
                    }
                }
            }
        }
        
        return null;
    }
    
    // Para biriminin kripto olup olmadığını kontrol et
    function isCryptoCurrency(currency) {
        if (!currency) return false;
        
        const upperCurrency = currency.toUpperCase();
        
        // Direkt eşleşme kontrolü
        if (CONFIG.cryptoCurrencies.includes(upperCurrency)) {
            return true;
        }
        
        // Kısmi eşleşme kontrolü (örn: "BTC Bitcoin" için)
        return CONFIG.cryptoCurrencies.some(crypto => 
            upperCurrency.includes(crypto) || crypto.includes(upperCurrency)
        );
    }

    // Deposit ve Withdraw tab kontrolü - kripto kontrolü eklendi
    function isTargetTabActive() {
        // Wallet modal açıksa kontrol et
        if (!window.location.href.includes('modal=wallet')) {
            return false;
        }
        
        // Kripto para birimi kontrolü
        const currentCurrency = getCurrentCurrency();
        const isCrypto = isCryptoCurrency(currentCurrency);
        
        console.log('JOJOVA Currency check:', {
            currency: currentCurrency,
            isCrypto: isCrypto,
            url: window.location.href,
            domDetection: !!getCurrentCurrencyFromDOM()
        });
        
        if (!isCrypto) {
            return false; // Kripto değilse uyarı gösterme
        }
        
        // Eğer tab parametresi yoksa default deposit tab'ı aktiftir
        if (!window.location.href.includes('tab=')) {
            return true; // Default deposit tab
        }
        
        // Tab parametresi varsa deposit veya withdraw kontrolü yap
        return window.location.href.includes('tab=deposit') || 
               window.location.href.includes('tab=withdraw');
    }
    
    // CSS yükleme
    function loadCSS() {
        if (document.querySelector(`link[href="${CONFIG.cssPath}"]`)) return;
        
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = CONFIG.cssPath;
        document.head.appendChild(cssLink);
    }

    // Mevcut warning'leri temizle
    function removeExistingWarnings() {
        document.querySelectorAll(`#${CONFIG.warningId}`).forEach(warning => {
            warning.parentElement?.remove();
        });
    }
    
    // Wallet modal bulma
    function findWalletModal() {
        for (const selector of CONFIG.selectors.walletModal) {
            const modal = document.querySelector(selector);
            if (modal) return modal;
        }
        return null;
    }
    
    // Warning ekleme - deposit ve withdraw tab'larında
    function addWarningToWallet() {
        // Önce target tab kontrolü yap
        if (!isTargetTabActive()) {
            removeExistingWarnings();
            return false;
        }
        
        const walletModal = findWalletModal();
        if (!walletModal) return false;
        
        // Eğer warning zaten varsa tekrar ekleme
        if (document.querySelector(`#${CONFIG.warningId}`)) {
            return true;
        }
        
        // modal__form div'ini bul
        const modalFormDiv = walletModal.querySelector('.modal__form');
        if (!modalFormDiv) return false;
        
        // Dil bazlı mesaj al
        const currentLang = getCurrentLanguage();
        const warningMessage = CONFIG.messages[currentLang].warning;
        
        const warningHTML = `
            <div style="margin-top: 10px; margin-bottom: 10px; position: relative; z-index: 1000;">
                <div class="jojova-warning-container" id="${CONFIG.warningId}">
                    <div class="jojova-warning-text">
                        ${warningMessage}
                    </div>
                </div>
            </div>
        `;
        
        // modal__form'ın en altına ekle
        modalFormDiv.insertAdjacentHTML('beforeend', warningHTML);
        return true;
    }
    
    // Form error stillerini güncelle
    function updateFormErrorStyles() {
        if (!isTargetTabActive()) return;
        
        document.querySelectorAll(CONFIG.selectors.formErrors).forEach(error => {
            if (!error.classList.contains('jojova-updated')) {
                error.classList.add('jojova-updated');
            }
        });
    }
    
    // Ana güncelleme fonksiyonu
    function updateWarningSystem() {
        if (isTargetTabActive()) {
            addWarningToWallet();
            updateFormErrorStyles();
        } else {
            // Target tab değilse warning'i kaldır
            removeExistingWarnings();
        }
    }
    
    // Debounce fonksiyonu
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Çekim butonu kontrolü
    function isWithdrawButton(button) {
        const text = button.textContent || '';
        return CONFIG.withdrawKeywords.some(keyword => text.includes(keyword));
    }
    
    // Event listener'ları temizle
    function cleanup() {
        observers.forEach(observer => observer.disconnect());
        observers = [];
        
        if (periodicInterval) {
            clearInterval(periodicInterval);
            periodicInterval = null;
        }
    }
    
    // URL değişiklik izleme - OPTİMİZE EDİLDİ (interval kaldırıldı)
    function watchURLChanges() {
        // History API override - tek seferlik (interval yerine event-driven)
        if (!window.jojovaHistoryPatched) {
            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;
            
            history.pushState = function() {
                originalPushState.apply(history, arguments);
                setTimeout(updateWarningSystem, 100);
            };
            
            history.replaceState = function() {
                originalReplaceState.apply(history, arguments);
                setTimeout(updateWarningSystem, 100);
            };
            
            window.jojovaHistoryPatched = true;
        }
        
        window.addEventListener('popstate', updateWarningSystem);
        window.addEventListener('hashchange', updateWarningSystem);
    }
    
    // DOM değişiklik observer'ı - DAHA DA OPTİMİZE
    function setupDOMObserver() {
        const debouncedUpdate = debounce(updateWarningSystem, 500); // 300 yerine 500
        
        let mutationCount = 0;
        const observer = new MutationObserver(function(mutations) {
            mutationCount++;
            
            // 50 mutation sonra observer'ı durdur
            if (mutationCount > 50) {
                observer.disconnect();
                return;
            }
            
            let shouldUpdate = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const id = node.id || '';
                            const className = typeof node.className === 'string' ? node.className : '';
                            
                            // Sadece wallet/modal ile ilgili değişiklikleri izle
                            if (id.includes('wallet') || id.includes('modal') ||
                                className.includes('modal') || className.includes('wallet')) {
                                shouldUpdate = true;
                                break;
                            }
                        }
                    }
                    if (shouldUpdate) break;
                }
            }
            
            if (shouldUpdate) {
                debouncedUpdate();
            }
        });
        
        // Sadece main content'i izle (body yerine)
        const mainContent = document.getElementById('main__content') || document.body;
        observer.observe(mainContent, {
            childList: true,
            subtree: true,
            attributes: false // Attribute izleme kaldırıldı
        });
        
        observers.push(observer);
        
        // 60 saniye sonra observer'ı durdur
        setTimeout(() => observer.disconnect(), 60000);
    }
    
    // Tab click observer'ı - optimize edilmiş
    function setupTabClickObserver() {
        // Event delegation kullanarak performansı artır
        document.body.addEventListener('click', function(e) {
            const target = e.target;
            
            // Tab benzeri elementlere tıklanırsa
            if (target.tagName === 'BUTTON' || 
                target.classList.contains('tab') ||
                target.classList.contains('nav-link') ||
                target.hasAttribute('data-tab')) {
                setTimeout(updateWarningSystem, 50);
            }
        }, { passive: true });
    }
    
    // Periyodik kontrol - KALDIRILDI, sadece event-driven
    function startPeriodicCheck() {
        // Artık periyodik kontrol yok, history API ve observer yeterli
        // Bu fonksiyon geriye dönük uyumluluk için boş bırakıldı
    }
    
    // Ana başlatma fonksiyonu - optimize edilmiş
    function init() {
        if (isInitialized) return;
        
        // CSS yükle
        loadCSS();
        
        // İlk güncelleme
        updateWarningSystem();
        
        // Observer'ları başlat
        setupDOMObserver();
        setupTabClickObserver();
        watchURLChanges();
        startPeriodicCheck();
        
        isInitialized = true;
    }
    
    // Event listener'lar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', init);
    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateWarningSystem();
        }
    });
    
    // Sayfa kapatılırken temizlik
    window.addEventListener('beforeunload', cleanup);
    
})(); 