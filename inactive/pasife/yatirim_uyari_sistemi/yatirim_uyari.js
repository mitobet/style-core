<script>
/* =====================================================
   MITOBET - Yatırım Uyarı Sistemi
   Kripto para yatırma/çekme işlemlerinde uyarı gösterir
   ===================================================== */

(function() {
    'use strict';
    
    // Konfigürasyon
    const CONFIG = {
        cssPath: 'yatirim_uyari_sistemi/yatirim_uyari.css',
        warningId: 'mito-smart-contract-warning',
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
        const urlParams = new URLSearchParams(window.location.search);
        const currencyFromUrl = urlParams.get('currency');
        if (currencyFromUrl) {
            return currencyFromUrl.toUpperCase();
        }
        
        const hash = window.location.hash;
        const hashMatch = hash.match(/currency=([^&]+)/);
        if (hashMatch) {
            return hashMatch[1].toUpperCase();
        }
        
        const domCurrency = getCurrentCurrencyFromDOM();
        if (domCurrency) {
            return domCurrency.toUpperCase();
        }
        
        return null;
    }

    // DOM'dan mevcut seçili para birimini tespit et
    function getCurrentCurrencyFromDOM() {
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
                let currency = element.textContent?.trim() || 
                              element.getAttribute('data-currency') || 
                              element.value;
                
                if (currency) {
                    const currencyMatch = currency.match(/^([A-Z]{2,5})/);
                    if (currencyMatch) {
                        return currencyMatch[1];
                    }
                    
                    if (/^[A-Z]{2,5}$/.test(currency)) {
                        return currency;
                    }
                }
            }
        }
        
        const modal = findWalletModal();
        if (modal) {
            const allElements = modal.querySelectorAll('*');
            for (const element of allElements) {
                const text = element.textContent?.trim();
                if (text) {
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
        
        if (CONFIG.cryptoCurrencies.includes(upperCurrency)) {
            return true;
        }
        
        return CONFIG.cryptoCurrencies.some(crypto => 
            upperCurrency.includes(crypto) || crypto.includes(upperCurrency)
        );
    }

    // Deposit ve Withdraw tab kontrolü
    function isTargetTabActive() {
        if (!window.location.href.includes('modal=wallet')) {
            return false;
        }
        
        const currentCurrency = getCurrentCurrency();
        const isCrypto = isCryptoCurrency(currentCurrency);
        
        if (!isCrypto) {
            return false;
        }
        
        if (!window.location.href.includes('tab=')) {
            return true;
        }
        
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
    
    // Warning ekleme
    function addWarningToWallet() {
        if (!isTargetTabActive()) {
            removeExistingWarnings();
            return false;
        }
        
        const walletModal = findWalletModal();
        if (!walletModal) return false;
        
        if (document.querySelector(`#${CONFIG.warningId}`)) {
            return true;
        }
        
        const modalFormDiv = walletModal.querySelector('.modal__form');
        if (!modalFormDiv) return false;
        
        const currentLang = getCurrentLanguage();
        const warningMessage = CONFIG.messages[currentLang].warning;
        
        const warningHTML = `
            <div style="margin-top: 10px; margin-bottom: 10px; position: relative; z-index: 1000;">
                <div class="mito-warning-container" id="${CONFIG.warningId}">
                    <div class="mito-warning-text">
                        ${warningMessage}
                    </div>
                </div>
            </div>
        `;
        
        modalFormDiv.insertAdjacentHTML('beforeend', warningHTML);
        return true;
    }
    
    // Form error stillerini güncelle
    function updateFormErrorStyles() {
        if (!isTargetTabActive()) return;
        
        document.querySelectorAll(CONFIG.selectors.formErrors).forEach(error => {
            if (!error.classList.contains('mito-updated')) {
                error.classList.add('mito-updated');
            }
        });
    }
    
    // Ana güncelleme fonksiyonu
    function updateWarningSystem() {
        if (isTargetTabActive()) {
            addWarningToWallet();
            updateFormErrorStyles();
        } else {
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
    
    // Event listener'ları temizle
    function cleanup() {
        observers.forEach(observer => observer.disconnect());
        observers = [];
        
        if (periodicInterval) {
            clearInterval(periodicInterval);
            periodicInterval = null;
        }
    }
    
    // URL değişiklik izleme - Optimize edildi: interval kaldırıldı, sadece history API kullanılıyor
    function watchURLChanges() {
        // setInterval kaldırıldı - sadece history API ve popstate yeterli
        
        if (!window.mitoHistoryPatched) {
            const originalPushState = history.pushState;
            const originalReplaceState = history.replaceState;
            
            history.pushState = function() {
                originalPushState.apply(history, arguments);
                setTimeout(updateWarningSystem, 50);
            };
            
            history.replaceState = function() {
                originalReplaceState.apply(history, arguments);
                setTimeout(updateWarningSystem, 50);
            };
            
            window.mitoHistoryPatched = true;
        }
        
        window.addEventListener('popstate', updateWarningSystem);
    }
    
    // DOM değişiklik observer'ı
    function setupDOMObserver() {
        const debouncedUpdate = debounce(updateWarningSystem, 300);
        
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const id = node.id || '';
                            const className = node.className || '';
                            
                            if (id.includes('wallet') || id.includes('modal') ||
                                className.includes('modal') || className.includes('form')) {
                                shouldUpdate = true;
                                break;
                            }
                        }
                    }
                    if (shouldUpdate) break;
                }
                
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'style' &&
                    mutation.target.id?.includes('modal')) {
                    shouldUpdate = true;
                    break;
                }
            }
            
            if (shouldUpdate) {
                debouncedUpdate();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
        
        observers.push(observer);
    }
    
    // Tab click observer'ı
    function setupTabClickObserver() {
        document.body.addEventListener('click', function(e) {
            const target = e.target;
            
            if (target.tagName === 'BUTTON' || 
                target.classList.contains('tab') ||
                target.classList.contains('nav-link') ||
                target.hasAttribute('data-tab')) {
                setTimeout(updateWarningSystem, 50);
            }
        }, { passive: true });
    }
    
    // Periyodik kontrol - Optimize edildi: interval kaldırıldı, sadece DOM observer yeterli
    function startPeriodicCheck() {
        // setInterval kaldırıldı - MutationObserver zaten DOM değişikliklerini izliyor
        // Sadece wallet modal açıldığında çalışacak
    }
    
    // Ana başlatma fonksiyonu
    function init() {
        if (isInitialized) return;
        
        loadCSS();
        updateWarningSystem();
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
    
    window.addEventListener('beforeunload', cleanup);
    
})();
</script>