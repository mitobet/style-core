<script>
/* =====================================================
   MITOBET - Theme Toggle (Dark/Light Mode)
   Kullanıcı seçimli tema değiştirme
   ===================================================== */

(function() {
    'use strict';
    
    // Zaten çalıştıysa tekrar çalışmasın
    if (window.mitoThemeToggleLoaded) return;
    window.mitoThemeToggleLoaded = true;
    
    // Config
    const CONFIG = {
        storageKey: 'mito-theme',
        defaultTheme: 'dark',
        darkBg: '#181818',
        lightBg: '#f5f5f5'
    };
    
    // Mevcut temayı al
    function getCurrentTheme() {
        return localStorage.getItem(CONFIG.storageKey) || CONFIG.defaultTheme;
    }
    
    // Temayı uygula
    function applyTheme(theme) {
        const isDark = theme === 'dark';
        
        // HTML attribute
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.body.setAttribute('data-bs-theme', theme);
        
        // Class
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
        document.body.classList.toggle('dark', isDark);
        document.body.classList.toggle('light', !isDark);
        
        // LocalStorage
        localStorage.setItem(CONFIG.storageKey, theme);
        localStorage.setItem('theme', theme);
        localStorage.setItem('data-bs-theme', theme);
        
        // Buton ikonunu güncelle
        updateToggleButton(isDark);
        
        // Custom CSS değişkenleri
        applyThemeStyles(isDark);
    }
    
    // Tema stillerini uygula
    function applyThemeStyles(isDark) {
        let styleEl = document.getElementById('mito-theme-styles');
        
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'mito-theme-styles';
            document.head.appendChild(styleEl);
        }
        
        if (isDark) {
            styleEl.textContent = `
                /* Dark Mode - Mito */
                html, body {
                    background-color: ${CONFIG.darkBg} !important;
                }
                
                .sidebar, #sidebar, .sidebar__big, .sidebar__head, #sidebar-content {
                    background: ${CONFIG.darkBg} !important;
                }
                
                .sidebar__nav a, .sidebar__nav span {
                    color: rgba(255, 255, 255, 0.85) !important;
                }
                
                .sidebar__nav li.active > a {
                    background: linear-gradient(135deg, #CFAE6D 0%, #b8973d 100%) !important;
                    color: #FFFFFF !important;
                }
                
                .sidebar__nav svg, .sidebar__nav .svg-icon {
                    stroke: rgba(255, 255, 255, 0.7) !important;
                }
                
                .sidebar__nav li.active svg {
                    stroke: #FFFFFF !important;
                }
                
                .header, #header, .header__content {
                    background: ${CONFIG.darkBg} !important;
                }
                
                #main, #main__content, .main__content {
                    background: ${CONFIG.darkBg} !important;
                }
            `;
        } else {
            styleEl.textContent = `
                /* Light Mode - Mito */
                html, body {
                    background-color: ${CONFIG.lightBg} !important;
                }
                
                .sidebar, #sidebar, .sidebar__big, .sidebar__head, #sidebar-content {
                    background: #FFFFFF !important;
                    border-right: 1px solid rgba(207, 174, 109, 0.3) !important;
                }
                
                .sidebar__nav a, .sidebar__nav span {
                    color: #1a1a1a !important;
                }
                
                .sidebar__nav a:hover {
                    color: #000000 !important;
                    background: rgba(207, 174, 109, 0.15) !important;
                }
                
                .sidebar__nav li.active > a {
                    background: linear-gradient(135deg, #CFAE6D 0%, #b8973d 100%) !important;
                    color: #FFFFFF !important;
                }
                
                .sidebar__nav svg, .sidebar__nav .svg-icon {
                    stroke: #5a5a5a !important;
                }
                
                .sidebar__nav a:hover svg {
                    stroke: #CFAE6D !important;
                }
                
                .sidebar__nav li.active svg {
                    stroke: #FFFFFF !important;
                }
                
                .sidebar__title, .sidebar__menu-title {
                    color: #8a7a5a !important;
                }
                
                .header, #header, .header__content {
                    background: #FFFFFF !important;
                }
                
                .header__content a, .header__content span {
                    color: #1a1a1a !important;
                }
                
                #main, #main__content, .main__content {
                    background: ${CONFIG.lightBg} !important;
                }
                
                /* Cards & Containers */
                .card, .section, [class*="container"] {
                    background: #FFFFFF !important;
                }
            `;
        }
    }
    
    // Toggle butonunu güncelle
    function updateToggleButton(isDark) {
        const btn = document.getElementById('mito-theme-toggle');
        if (!btn) return;
        
        const icon = btn.querySelector('.theme-icon');
        
        if (icon) {
            icon.innerHTML = isDark ? '☀️' : '🌙';
        }
        
        btn.title = isDark ? 'Açık Moda Geç' : 'Koyu Moda Geç';
    }
    
    // Toggle butonu oluştur ve ekle
    function createToggleButton() {
        // Zaten varsa ekleme
        if (document.getElementById('mito-theme-toggle')) return;
        
        // Sidebar actions bul
        const actionsDiv = document.querySelector('.sidebar__actions');
        if (!actionsDiv) return;
        
        const isDark = getCurrentTheme() === 'dark';
        
        // Buton oluştur
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'mito-theme-toggle';
        toggleBtn.className = 'mito-theme-toggle-btn';
        toggleBtn.innerHTML = `<span class="theme-icon">${isDark ? '☀️' : '🌙'}</span>`;
        toggleBtn.title = isDark ? 'Açık Moda Geç' : 'Koyu Moda Geç';
        
        // Stil ekle - Sol tarafta sabit
        toggleBtn.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            margin: 0;
            margin-right: auto;
            background: linear-gradient(135deg, rgba(207, 174, 109, 0.15) 0%, rgba(207, 174, 109, 0.05) 100%);
            border: 1px solid rgba(207, 174, 109, 0.3);
            border-radius: 50%;
            color: #CFAE6D;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
        `;
        
        // Hover efekti
        toggleBtn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(207, 174, 109, 0.25) 0%, rgba(207, 174, 109, 0.15) 100%)';
            this.style.borderColor = '#CFAE6D';
            this.style.boxShadow = '0 4px 15px rgba(207, 174, 109, 0.3)';
        });
        
        toggleBtn.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, rgba(207, 174, 109, 0.15) 0%, rgba(207, 174, 109, 0.05) 100%)';
            this.style.borderColor = 'rgba(207, 174, 109, 0.3)';
            this.style.boxShadow = 'none';
        });
        
        // Click event
        toggleBtn.addEventListener('click', function() {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
        
        // Actions div stilini düzelt - sol ve sağ arasında boşluk
        actionsDiv.style.cssText = `
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 8px 12px !important;
            width: 100% !important;
        `;
        
        // Actions div'in başına ekle (sol tarafa)
        actionsDiv.insertBefore(toggleBtn, actionsDiv.firstChild);
    }
    
    // Başlat
    function init() {
        // Kayıtlı temayı uygula
        const savedTheme = getCurrentTheme();
        applyTheme(savedTheme);
        
        // Toggle butonunu ekle
        createToggleButton();
    }
    
    // DOM hazır olunca başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Sayfa tam yüklenince tekrar dene (React render sonrası)
    window.addEventListener('load', function() {
        setTimeout(init, 500);
        setTimeout(init, 1500);
    });
    
    // MutationObserver - sidebar yüklenince buton ekle
    const observer = new MutationObserver(function(mutations) {
        const actionsDiv = document.querySelector('.sidebar__actions');
        if (actionsDiv && !document.getElementById('mito-theme-toggle')) {
            createToggleButton();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 30 saniye sonra observer'ı durdur
    setTimeout(function() {
        observer.disconnect();
    }, 30000);
    
})();
</script>