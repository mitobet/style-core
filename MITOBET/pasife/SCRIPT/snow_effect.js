/* =====================================================
   MITOBET - Kar Yağışı Efekti (Sürekli Loop)
   Sadece Anasayfada - İlk 3sn yoğun, sonra seyrek
   ===================================================== */

(function() {
    'use strict';
    
    // Sadece anasayfada çalış
    const path = window.location.pathname;
    if (path !== '/' && path !== '/tr' && path !== '/tr/') return;
    
    // Zaten çalıştıysa tekrar çalışmasın
    if (window.snowEffectLoaded) return;
    window.snowEffectLoaded = true;
    
    // Ayarlar
    const CONFIG = {
        snowflakeCount: 30,    // Aynı anda maksimum kar tanesi
        spawnInterval: 200,    // İlk 3sn: Her 200ms'de bir
        slowInterval: 250      // 3sn sonra: Her 250ms'de bir (saniyede 4)
    };
    
    // Container oluştur
    const container = document.createElement('div');
    container.id = 'snow-container';
    container.innerHTML = `
        <style>
            #snow-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 99999;
                overflow: hidden;
            }
            
            .snowflake {
                position: absolute;
                top: -30px;
                color: #FFFFFF;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
                animation: snowfall linear forwards;
                will-change: transform;
                filter: blur(1px);
            }
            
            @keyframes snowfall {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                5% {
                    opacity: 1;
                }
                95% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(105vh) translateX(50px) rotate(360deg);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❉'];
    let activeFlakes = 0;
    
    // Tek bir kar tanesi oluştur
    function createSnowflake() {
        if (activeFlakes >= CONFIG.snowflakeCount) return;
        
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        
        // Rastgele değerler
        const startX = Math.random() * 100;
        const size = Math.random() * 1.2 + 0.6;
        const duration = Math.random() * 3 + 4; // 4-7 saniye
        const opacity = Math.random() * 0.5 + 0.5;
        
        flake.style.cssText = `
            left: ${startX}%;
            font-size: ${size}rem;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;
        
        container.appendChild(flake);
        activeFlakes++;
        
        // Animasyon bitince kaldır
        setTimeout(() => {
            flake.remove();
            activeFlakes--;
        }, duration * 1000);
    }
    
    // Sayfa yüklenince başlat
    function init() {
        document.body.appendChild(container);
        
        // İlk 3 saniye yoğun kar
        let fastInterval = setInterval(createSnowflake, CONFIG.spawnInterval);
        
        // Başlangıçta birkaç tane ekle
        for (let i = 0; i < 10; i++) {
            setTimeout(createSnowflake, i * 100);
        }
        
        // 3 saniye sonra yavaşlat (saniyede 4)
        setTimeout(() => {
            clearInterval(fastInterval);
            setInterval(createSnowflake, CONFIG.slowInterval);
        }, 3000);
    }
    
    // DOM hazır olunca başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
