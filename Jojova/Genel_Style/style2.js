<script>
(function() {
  // SPA Navigasyon - Sayfa yenilemeden yönlendirme
  window.navigateWithoutReload = function(url) {
    // History API ile URL'i değiştir (sayfa yenilemez)
    history.pushState(null, '', url);
    
    // Popstate event'i tetikle (framework'ün router'ı algılar)
    const popStateEvent = new PopStateEvent('popstate', { state: null });
    window.dispatchEvent(popStateEvent);
  };
  
  // Sayfa içeriğini güncelleyen ana fonksiyon
  function updatePageContent() {
    var targetDiv = document.getElementById("banners-wrapper");
    var mainSlider = document.getElementById("main-slider");

    if (!targetDiv) {
      return;
    }
    
    // Mevcut dili al
    const currentLang = getCurrentLanguage();
    const t = translations[currentLang];
    
    // Dil bazlı relative URL'ler - domain'e bağımlı değil
    const langPrefix = currentLang === 'en' ? '/en' : '/tr';
    
    // Main slider'ı gizle ve içeriğini temizle - sadece varsa
    if (mainSlider && mainSlider.id === 'main-slider') {
      mainSlider.style.display = 'none';
      mainSlider.innerHTML = '';
    }
    
    // Eğer div bulunduysa içine metin ekle
    if (targetDiv) {
      
       // Slider Container - En üstte olacak (SPA Navigasyon)
       const sliderContainer = `
           <!-- Desktop Swiper Slider -->
           <div class="main-slider-container">
               <div class="swiper main-slider">
                   <div class="swiper-wrapper">
                       
                       <!-- Slide 1 - NEW -->
                       <div class="swiper-slide">
                           <div class="slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/jQMoRFXZ4Wf3aEaKqEDlfxihkqzb2c3hAjasYlR8.png" alt="Slide 2" class="slider-image">
                           </div>
                       </div>
                       
                       <!-- Slide 2 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/i7XUaFcZxjrr5JUOrnK1INmeGhLnPbA7GAUA0lQx.png" alt="Slide 2" class="slider-image">
                           </div>
                       </div>

                       <!-- Slide 3 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/crsIJYbRFcbVhKmBAZo4mTpDJiP3omWQzl237hy1.png" alt="Slide 3" class="slider-image">
                           </div>
                       </div>

                       <!-- Slide 4 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/t14v7zHjn9tx7Ariu8EzH26TdGjsYFqUiTUBcDD0.png" alt="Slide 4" class="slider-image">
                           </div>
                       </div>

                   </div>
                   
                   <!-- Pagination - Sol alt köşe -->
                   <div class="swiper-pagination"></div>
               </div>
           </div>

           <!-- Mobile Swiper Slider -->
           <div class="mobile-slider-container">
               <div class="swiper mobile-slider">
                   <div class="swiper-wrapper">
                       
                       <!-- Mobile Slide 1 - NEW -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/4rBPygBwpsIUAHRz2vBpM6THyfC8MgjmyEbuzQTI.png" alt="Mobile Slide 2" class="mobile-slider-image">
                           </div>
                       </div>
                       
                       <!-- Mobile Slide 2 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/J3qQrJO21QWoAv5uyD9eYrkUwsikP2u9bAIXKopL.png" alt="Mobile Slide 2" class="mobile-slider-image">
                           </div>
                       </div>

                       <!-- Mobile Slide 3 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Mv8x7iVqQ3aScDlxsIbKXAroPF8gFpuQe2E29PqT.png" alt="Mobile Slide 3" class="mobile-slider-image">
                           </div>
                       </div>

                       <!-- Mobile Slide 4 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container" onclick="navigateWithoutReload('${langPrefix}/promotions')" style="cursor: pointer;">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Bapj61C3FNBMLXIxih5rTgNqmRHt2lc6NyiCS7Ve.png" alt="Mobile Slide 4" class="mobile-slider-image">
                           </div>
                       </div>

                   </div>
                   
                   <!-- Mobile Pagination -->
                   <div class="swiper-pagination"></div>
               </div>
           </div>
       `;

    // Payment Container - SPA Yönlendirme (Sayfa yenilemeden) - PASİF
          /*
          const sliderBottom = `
              <div class="slider-bottom-container">
                  <div class="slider-bottom-grid">
                      <!-- Üst Sol: Slot Oyunları -->
                      <div class="slider-bottom-item" onclick="navigateWithoutReload('${langPrefix}/casino/group/lobby')">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/EIpBfslRNFy6SBmrupvVsBFX2gdFHFaVBC8T3fAR.png" alt="Slot Oyunları" class="slider-bottom-image">
                      </div>
                      <!-- Üst Sağ: Canlı Casino -->
                      <div class="slider-bottom-item" onclick="navigateWithoutReload('${langPrefix}/casino/group/live-lobby')">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/A5mm1VoGRciOn75iKVCg4DI4aivDPabFKkHwA0XQ.png" alt="Canlı Casino" class="slider-bottom-image">
                      </div>
                      <!-- Alt Sol: Spor Oyunları -->
                      <div class="slider-bottom-item" onclick="navigateWithoutReload('${langPrefix}/sportsbook')">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/AoqGK76s6ZWSyg0H70D3meqrXIZdwYcNtSAmKsom.png" alt="Spor Oyunları" class="slider-bottom-image">
                      </div>
                      <!-- Alt Sağ: JojoVIP Club -->
                      <div class="slider-bottom-item" onclick="navigateWithoutReload('${langPrefix}/vip')">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/5DPopoH61Dj5fqZ5lmMM0gWZsXekd3EopM4KP6QO.png" alt="JojoVIP Club" class="slider-bottom-image">
                      </div>
                  </div>
              </div>
          `;
          */
          const sliderBottom = ''; // Pasif - kaldırıldı



       // Sport Banner Container - Geçici olarak pasife alındı (ilerde tekrar eklenebilir)
       /*
       const sportBannerContainer = `
           <div class="banner-container" style="">
               <div class="banner-inner">
                   <div class="banner-content">
                       <div class="banner-left">
                           <div class="banner-text-wrapper">
                               <div class="banner-text">
                                   <h2 class="banner-title">${t.sportBannerTitle}</h2>
                                   <p class="banner-subtitle">${t.sportBannerSubtitle}</p>
                               </div>
                           </div>
                           
                           <div class="sports-buttons" onclick="window.open('https://jojovatv.com/', '_blank')">
                               <button class="sports-button">
                                   <img src="https://cdn.lexcore.space/playico/assets/football-2.png" alt="Futbol" class="sports-icon">
                                   <span id="football-text">${t.football}</span>
                               </button>
                               <span class="separator">|</span>
                               <button class="sports-button">
                                   <img src="https://cdn.lexcore.space/playico/assets/basketball-2.png" alt="Basketbol" class="sports-icon">
                                   <span id="basketball-text">${t.basketball}</span>
                               </button>
                               <span class="separator">|</span>
                               <button class="sports-button">
                                   <img src="https://cdn.lexcore.space/playico/assets/tennis-2.png" alt="Tenis" class="sports-icon">
                                   <span id="tennis-text">${t.tennis}</span>
                               </button>
                           </div>
                       </div>
                       <div class="banner-right">
                           <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/MZBbAtrG9ueqTvmzjVo25cHaHn16oDVO5kpKB49d.png" alt="Players" class="players-image">
                       </div>
                   </div>
               </div>
           </div>
       `;
       */




      // Big Wins wrapper'ı ve VIP bölümünü gizle, Jackpot container'ı en alta al
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        #jackpots-container { 
          position: relative !important;
          margin-top: 20px !important;
        }
        #big-wins-wrapper {
          display: block !important; 
          opacity: 1 !important;
          visibility: visible !important;
          position: relative !important;
          left: auto !important;
          pointer-events: auto !important;
          z-index: auto !important;
        }
        .vip, .vip__title, .vip__text, .vip__btn {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
        }
        div.row:has(.vip) {
          display: none !important;
        }
        /* Jackpot Container Konumlandırma */
        #jackpots-container {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          margin: 20px 0 !important;
          padding: 0 !important;
        }
        
        @media (max-width: 768px) {
          #jackpots-container {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          .popular-sports-container {
            order: 5 !important; /* Mobilde normal sırada */
          }
          .container {
            display: flex !important;
            flex-direction: column !important;
          }
        }
        
        /* ——— JOJOVA JACKPOT TEMA - DÜZENLİ RENKLER ——— */
        /* Jackpot Görsel Değiştirme */
        /* Jackpot logoları doğrudan hedeflenen elementlerde değiştirildi */
        .jackpot__logo.try {
          content: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/IgRDqbUdcdEu8Y68oWxmR7cygTrGSAjac1QIu0MP.png') !important;
        }
        
        .jackpot__logo.usd {
          content: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/mJZfyoxEkJNxSqAw4sMDHyRar6JUXOZ6HOAHqCqO.png') !important;
        }
        
        .jackpot__logo.btc {
          content: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Hn14MBJa2UOMdOiiIkc4MushJW0mRZPgS48pwrjL.png') !important;
        }
        
        /* Ana Jackpot Container - Şeffaf Arka Plan + Sarı Border */
        .jackpot {
          background: transparent !important;
          border: 2px solid #FFE55C !important;
          box-shadow: none !important;
          border-radius: 12px !important;
        }
        
        .jackpot:after {
          display: none !important;
        }
        
        .jackpot:before {
          display: none !important;
        }
        
        /* Tüm Jackpot Değerleri - Siyah Arka Plan + Beyaz Yazı + Sarı Border */
        .jackpot__value--grand,
        .jackpot__value--grand-gold,
        .jackpot__value--grand-7,
        .jackpot__value--major,
        .jackpot__value--major-gold,
        .jackpot__value--major-7,
        .jackpot__value--major-zebra,
        .jackpot__value--minor,
        .jackpot__value--minor-gold,
        .jackpot__value--minor-7,
        .jackpot__value--minor-zebra,
        .jackpot__value--mini,
        .jackpot__value--mini-gold,
        .jackpot__value--mini-7,
        .jackpot__value--mini-zebra,
        .jackpot__value--zebra {
          background: #000000 !important;
          border: 0.2px solid #FFE55C !important;
          box-shadow: none !important;
        }
        
        .jackpot__value--grand span,
        .jackpot__value--grand-gold span,
        .jackpot__value--grand-7 span,
        .jackpot__value--major span,
        .jackpot__value--major-gold span,
        .jackpot__value--major-7 span,
        .jackpot__value--major-zebra span,
        .jackpot__value--minor span,
        .jackpot__value--minor-gold span,
        .jackpot__value--minor-7 span,
        .jackpot__value--minor-zebra span,
        .jackpot__value--mini span,
        .jackpot__value--mini-gold span,
        .jackpot__value--mini-7 span,
        .jackpot__value--mini-zebra span,
        .jackpot__value--zebra span {
          background: #000000 !important;
          color: #ffffff !important;
        }
        
        /* Tüm before elementlerini kaldır (glow efektleri) */
        .jackpot__value--grand:before,
        .jackpot__value--grand-gold:before,
        .jackpot__value--grand-7:before,
        .jackpot__value--major:before,
        .jackpot__value--major-gold:before,
        .jackpot__value--major-7:before,
        .jackpot__value--major-zebra:before,
        .jackpot__value--minor:before,
        .jackpot__value--minor-gold:before,
        .jackpot__value--minor-7:before,
        .jackpot__value--minor-zebra:before,
        .jackpot__value--mini:before,
        .jackpot__value--mini-gold:before,
        .jackpot__value--mini-7:before,
        .jackpot__value--mini-zebra:before,
        .jackpot__value--zebra:before {
          display: none !important;
          box-shadow: none !important;
        }
        
        /* Tüm Nokta Efektleri - Düzeltilmiş Iconlar */
        .jackpot__value span:after,
        .jackpot__value span:before {
          background-color: #FFE55C !important;
          box-shadow: none !important;
          content: "●" !important;
          font-size: 8px !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
        }
        
        /* Bozuk iconları düzelt */
        .jackpot__value--grand span:after,
        .jackpot__value--grand span:before,
        .jackpot__value--grand-gold span:after,
        .jackpot__value--grand-gold span:before {
          content: "♦" !important;
          background: none !important;
          color: #FFE55C !important;
          font-size: 12px !important;
          width: auto !important;
          height: auto !important;
        }
        
        .jackpot__value--major span:after,
        .jackpot__value--major span:before,
        .jackpot__value--major-7 span:after,
        .jackpot__value--major-7 span:before {
          content: "7" !important;
          background: none !important;
          color: #FFE55C !important;
          font-size: 12px !important;
          width: auto !important;
          height: auto !important;
        }
        
        .jackpot__value--zebra span:after,
        .jackpot__value--zebra span:before {
          content: "●" !important;
          background: #FFE55C !important;
          color: #000 !important;
          font-size: 8px !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
        }
        
        /* Jackpot Logo Wrapper - Çerçevesiz ve Glow'suz */
        .jackpot__logo-wrapper,
        .jackpot__logo-wrapper--try,
        .jackpot__logo-wrapper--usd,
        .jackpot__logo-wrapper--btc {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        
        /* Jackpot Başlık ve Metin */
        .jackpot__title {
          color: #FFE55C !important;
          text-shadow: none !important;
        }
        
        .jackpot__text {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .jackpot__text b {
          color: #FFE55C !important;
        }
        
        /* Jackpot Button */
        .jackpot__btn {
          background: linear-gradient(135deg, #FFE55C 0%, #FFD24D 100%) !important;
          color: #000 !important;
          font-weight: 700 !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
        }
        
        .jackpot__btn:hover {
          background: linear-gradient(135deg, #FFD24D 0%, #FFC940 100%) !important;
          color: #000 !important;
          box-shadow: none !important;
          transform: translateY(-2px) !important;
        }
        
        /* Animasyon Kaldırıldı - Glow Yok */
        .jackpot__value--grand,
        .jackpot__value--grand-gold,
        .jackpot__value--zebra {
          animation: none !important;
        }
        
        /* Mobil Uyumluluk */
        @media (max-width: 768px) {
          .jackpot {
            margin: 8px 4px !important;
            padding: 0 6px !important;
          }
          
          .jackpot__btn {
            width: 100px !important;
            height: 36px !important;
            font-size: 11px !important;
          }
          
          .jackpot__logo {
            max-width: 80px !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      // Jackpot container'ı pb-component-wrapper altına al
      const jackpotsContainer = document.getElementById('jackpots-container');
      if (jackpotsContainer) {
        jackpotsContainer.style.cssText = 'background: transparent !important; border: none !important; margin: 20px 0 !important; padding: 0 !important;';
      }
      
      // Big Wins wrapper'ını göster
      const bigWinsWrapper = document.getElementById('big-wins-wrapper');
      if (bigWinsWrapper) {
        bigWinsWrapper.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; position: relative !important; left: auto !important; pointer-events: auto !important; z-index: auto !important;';
      }
      
      // VIP elementlerini gizle
      const vipElements = document.querySelectorAll('.vip, .vip__title, .vip__text, .vip__btn');
      vipElements.forEach(element => {
        element.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important;';
      });
      
      // VIP içeren row'ları gizle
      const vipRows = document.querySelectorAll('div.row');
      vipRows.forEach(row => {
        if (row.querySelector('.vip')) {
          row.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important;';
        }
      });
      
      // Last Bets Wrapper'ı gizle (Web & Mobil)
      const lastBetsWrapper = document.getElementById('last-bets-wrapper');
      if (lastBetsWrapper) {
        lastBetsWrapper.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important;';
      }
      
      // Futbol Sekmesi Container - SPA YÖNLENDİRME (Sayfa yenilemeden)
      const futbolSekmesiContainer = `
          <div class="pb-component-wrapper" style="margin-top: 10px;">
              <div class="futbol-banner-container col-4 futbol-banner-without-titles" data-scroll-lock-scrollable="">
                  <div class="futbol-banner-info futbol-banner bundesliga" aria-label="Bundesliga" onclick="navigateWithoutReload('${langPrefix}/sportsbook')" style="cursor: pointer;">
                      <img alt="Bundesliga" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/aIbhaWSGcJcneCnwIXAnsWFLYnF6bvyvNVOUiFMZ.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Bundesliga</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner laliga" aria-label="La Liga" onclick="navigateWithoutReload('${langPrefix}/sportsbook')" style="cursor: pointer;">
                      <img alt="La Liga" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/HeuC8ictUKIrSTxeXuGySfo2FvUxmY40MnnlGgeG.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">La Liga</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner premier-league" aria-label="Premier League" onclick="navigateWithoutReload('${langPrefix}/sportsbook')" style="cursor: pointer;">
                      <img alt="Premier League" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/o1q4JAyJc20PBfujBi0DtJHtRjhCxRYjxzteEt5I.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Premier League</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner serie-a" aria-label="Serie A" onclick="navigateWithoutReload('${langPrefix}/sportsbook')" style="cursor: pointer;">
                      <img alt="Serie A" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/nMaflwuXV12Dd5DFW1sRBcKmyev0a3E5XhJPYYk5.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Serie A</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner super-lig" aria-label="Süper Lig" onclick="navigateWithoutReload('${langPrefix}/sportsbook')" style="cursor: pointer;">
                      <img alt="Süper Lig" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/yONpfInMNDkU8hNochP0gmn0aZ2xjSe8unyItHaa.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Süper Lig</div>
                  </div>
              </div>
          </div>
      `;

      // İçeriği targetDiv'e ekle - slider en üstte (futbol sekmesi aşağıya taşınacak)
      targetDiv.innerHTML = '<div class="container">' + sliderContainer + '</div>';
      
      // Futbol banner'ı "OYNAMAYA DEVAM ET" üstüne taşı
      setTimeout(() => {
        // Zaten eklendiyse tekrar ekleme
        if (document.querySelector('#futbol-banner-moved')) return;
        
        const lastPlayedWrapper = document.getElementById('last-played-games-wrapper');
        if (lastPlayedWrapper && lastPlayedWrapper.parentNode) {
          // Futbol sekmesi container'ı oluştur
          const futbolDiv = document.createElement('div');
          futbolDiv.innerHTML = futbolSekmesiContainer;
          const futbolElement = futbolDiv.firstElementChild;
          futbolElement.id = 'futbol-banner-moved';
          
          // last-played-games-wrapper'ın önüne ekle
          lastPlayedWrapper.parentNode.insertBefore(futbolElement, lastPlayedWrapper);
        }
      }, 200);
      
      // Jackpot container'ı pb-component-wrapper altına taşı
      setTimeout(() => {
        const jackpotContainer = document.getElementById('jackpots-container');
        const pbWrapper = document.querySelector('.pb-component-wrapper');
        const containerDiv = document.querySelector('.container');
        
        if (jackpotContainer && pbWrapper && containerDiv) {
          // Önce jackpot'u container'dan çıkar
          if (jackpotContainer.parentNode) {
            jackpotContainer.parentNode.removeChild(jackpotContainer);
          }
          // Sonra pb-component-wrapper'ın altına ekle
          pbWrapper.insertAdjacentElement('afterend', jackpotContainer);
        }
      }, 300);
      


      // İçerik eklendikten sonra DOM'dan elementleri al
      const topGamesWrapper = document.getElementById('top-games-wrapper');
      const bannerswrapper = document.getElementById('banners-wrapper');

      // Elementler varsa topGamesWrapper'ı banners-wrapper'dan sonra ekle
      if (topGamesWrapper && bannerswrapper && bannerswrapper.parentNode) {
        bannerswrapper.parentNode.insertBefore(topGamesWrapper, bannerswrapper.nextSibling);
      } else {
      }

      // Futbol Sekmesi CSS'ini yükle
      if (!document.querySelector('#futbol-sekmesi-css')) {
        const futbolCSS = document.createElement('link');
        futbolCSS.id = 'futbol-sekmesi-css';
        futbolCSS.rel = 'stylesheet';
        futbolCSS.href = './futbol_sekmesi/futbol_sekmesi.css';
        document.head.appendChild(futbolCSS);
      }

      // Slider'ları başlat - Timeout ile bekle DOM yüklensin
      setTimeout(() => {
        initializeSliders();
      }, 800);
    } else {
    }
  }

  // Slider initialization fonksiyonu
  function initializeSliders() {
    
    // Swiper CSS ve JS dosyalarını yükle
    if (!document.querySelector('link[href*="swiper"]')) {
      const swiperCSS = document.createElement('link');
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css';
      document.head.appendChild(swiperCSS);
      
      // Local CSS'imizi CDN'den sonra yükle ki bizim stiller öncelikli olsun
      setTimeout(() => {
        if (!document.querySelector('#custom-swiper-css')) {
          const customCSS = document.createElement('link');
          customCSS.id = 'custom-swiper-css';
          customCSS.rel = 'stylesheet';
          customCSS.href = './Genel_Style/swiper-slider.css';
          document.head.appendChild(customCSS);
        }
      }, 100);
    }
    
    // Swiper JS yükle veya varsa direkt kullan
    function createSliders() {
      
      // Desktop Slider
      const desktopSlider = document.querySelector('.main-slider');
      if (desktopSlider) {
        
        if (typeof Swiper !== 'undefined') {
          const swiper = new Swiper('.main-slider', {
            loop: true,
            loopAdditionalSlides: 1,
            loopedSlides: 6,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            speed: 600,
            pagination: {
              el: '.main-slider .swiper-pagination',
              clickable: true,
              dynamicBullets: false,
              renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
              },
            },
            navigation: false,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            effect: 'slide',
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            simulateTouch: true,
            resistance: true,
            resistanceRatio: 0.85,
            followFinger: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            updateOnWindowResize: true,
            observer: true,
            observeParents: true,
            on: {
              slideChange: function () {
                // Pagination güncellenmesini zorla
                this.pagination.render();
                this.pagination.update();
              },
              touchEnd: function () {
                // Manuel slide sonrası autoplay'i yeniden başlat
                this.autoplay.stop();
                this.autoplay.start();
              }
            }
          });
        }
      }

      // Mobile Slider
      const mobileSlider = document.querySelector('.mobile-slider');
      if (mobileSlider) {
        
        if (typeof Swiper !== 'undefined') {
          const mobileSwiper = new Swiper('.mobile-slider', {
            loop: true,
            loopAdditionalSlides: 1,
            loopedSlides: 6,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            speed: 600,
            pagination: {
              el: '.mobile-slider .swiper-pagination',
              clickable: true,
              dynamicBullets: false,
              renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
              },
            },
            navigation: false,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            effect: 'slide',
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            simulateTouch: true,
            resistance: true,
            resistanceRatio: 0.85,
            followFinger: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            updateOnWindowResize: true,
            observer: true,
            observeParents: true,
            on: {
              slideChange: function () {
                // Pagination güncellenmesini zorla
                this.pagination.render();
                this.pagination.update();
              },
              touchEnd: function () {
                // Manuel slide sonrası autoplay'i yeniden başlat
                this.autoplay.stop();
                this.autoplay.start();
              }
            }
          });
        }
      }
    }
    
    // Swiper zaten varsa direkt kullan
    if (typeof Swiper !== 'undefined') {
      createSliders();
    } else {
      // Swiper JS'i yükle
      if (!document.querySelector('script[src*="swiper"]')) {
        const swiperJS = document.createElement('script');
        swiperJS.src = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';
        swiperJS.onload = function() {
          setTimeout(createSliders, 100);
        };
        document.head.appendChild(swiperJS);
      } else {
        // Script var ama Swiper yok, bekle
        let attempts = 0;
        const checkSwiper = setInterval(() => {
          attempts++;
          if (typeof Swiper !== 'undefined') {
            clearInterval(checkSwiper);
            createSliders();
          } else if (attempts > 50) { // 5 saniye bekle
            clearInterval(checkSwiper);
          }
        }, 100);
      }
    }
  }

  // Dil algılama fonksiyonu
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/en/') || path.startsWith('/en')) {
      return 'en';
    }
    return 'tr'; // Varsayılan Türkçe
  }

  // Çoklu dil metinleri
  const translations = {
    tr: {
      welcomeTitle1: "Türkiye'nin İlk Kripto",
      welcomeTitle2: "Casinosu!",
      welcomeTitleMobile: "Türkiye'nin İlk Kripto Casinosu!",
      joinButton: "Jojova'ya Katıl",
      casinoTitle: "Casino",
      sportsTitle: "Sports",
      paymentTitle: "Güvenli Kripto İşlemleri",
      paymentSubtitle: "10'dan fazla para birimi ile bahis yap!",
      paymentButton: "Kripto Satın Al",


      sportsTitle2: "Popüler Sporlar",
      sportsAll: "Tümü",
      football: "Futbol",
      basketball: "Basketbol",
      volleyball: "Voleybol",
      tennis: "Tenis",
      esports: "E-spor",
      sportBannerTitle: "Tüm sporları izle",
      sportBannerSubtitle: "ve canlı bahis yap."
    },
    en: {
      welcomeTitle1: "Crypto Casino and",
      welcomeTitle2: "Crypto Trade",
      welcomeTitleMobile: "Crypto Casino and Crypto Trade",
      joinButton: "Join Jojova",
      casinoTitle: "Casino",
      sportsTitle: "Sports",
      paymentTitle: "Secure Crypto Transactions",
      paymentSubtitle: "Bet with more than 10 currencies!",
      paymentButton: "Buy Crypto",


      sportsTitle2: "Popular Sports",
      sportsAll: "All",
      football: "Football",
      basketball: "Basketball",
      volleyball: "Volleyball",
      tennis: "Tennis",
      esports: "E-sports",
      sportBannerTitle: "Watch all sports",
      sportBannerSubtitle: "and place live bets."
    }
  };

  // Ana sayfada olup olmadığımızı kontrol eden fonksiyon - daha kapsamlı
  function isHomePage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    
    // Ana sayfa kontrolü - hem TR hem EN için
    return path === '/' || 
           path === '/tr/' || 
           path === '/tr' ||
           path === '/en/' ||
           path === '/en' ||
           path === '/index.html' || 
           path === '/index' ||
           path === '' ||
           path.endsWith('/') ||
           path.match(/^\/(tr|en)?\/?$/);
  }

  // Mobil cihaz kontrolü
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }

  // Sayfa cache'den gelip gelmediğini kontrol et
  function isPageFromCache() {
    return window.performance && 
           window.performance.navigation && 
           (window.performance.navigation.type === 2 || // TYPE_BACK_FORWARD
            window.performance.navigation.type === 1);  // TYPE_RELOAD
  }

  // Süper agresif güncelleme - hiçbir durumda kaçırma
  function superForceUpdate() {
    if (isHomePage()) {
      // Anında güncelle
      updatePageContent();
      
      // Tek güncelleme ile yeterli
      setTimeout(() => {
        if (isHomePage()) {
          const welcomeContainer = document.getElementById("welcome-id-new");
          if (!welcomeContainer) {
            updatePageContent();
          }
        }
      }, 100);
    }
  }

  // Optimize edilmiş kontrol sistemi
  function startContinuousCheck() {
    // Ana kontrol döngüsü - daha az agresif
    const mainIntervalId = setInterval(function() {
      if (isHomePage()) {
        const targetDiv = document.getElementById("banners-wrapper");
        const sliderContainer = document.querySelector('.main-slider-container');
        
        // Eğer banners-wrapper var ama slider-container yoksa güncelle
        if (targetDiv && !sliderContainer) {
          updatePageContent();
        }
        
        // Main slider görünürse tekrar gizle
        const mainSlider = document.getElementById("main-slider");
        if (mainSlider && mainSlider.style.display !== 'none') {
          mainSlider.style.display = 'none';
          mainSlider.innerHTML = '';
        }
        
        // Jackpot container'ın konumunu kontrol et ve düzelt
        const jackpotContainer = document.getElementById('jackpots-container');
        const pbWrapper = document.querySelector('.pb-component-wrapper');
        if (jackpotContainer && pbWrapper && jackpotContainer.previousElementSibling !== pbWrapper) {
          if (jackpotContainer.parentNode) {
            jackpotContainer.parentNode.removeChild(jackpotContainer);
          }
          pbWrapper.insertAdjacentElement('afterend', jackpotContainer);
        }
        
        // Altta çıkan mini-slider'ı kaldır
        const miniSwipers = document.querySelectorAll('.swiper-initialized.swiper-horizontal.swiper-backface-hidden');
        miniSwipers.forEach(swiper => {
          // İçeriğinde jackpot görselleri var mı kontrol et
          const jackpotImages = swiper.querySelectorAll('img[src*="mini-sliders/mJZfyoxEkJNxSqAw4sMDHyRar6JUXOZ6HOAHqCqO.png"], img[src*="mini-sliders/IgRDqbUdcdEu8Y68oWxmR7cygTrGSAjac1QIu0MP.png"], img[src*="mini-sliders/Hn14MBJa2UOMdOiiIkc4MushJW0mRZPgS48pwrjL.png"]');
          if (jackpotImages.length > 0) {
            swiper.style.display = 'none';
            swiper.style.visibility = 'hidden';
            swiper.style.height = '0';
            swiper.style.overflow = 'hidden';
          }
        });
        
        // VIP elementlerini ve Big Wins wrapper'ını sürekli kontrol et ve gizle
        const vipElements = document.querySelectorAll('.vip, .vip__title, .vip__text, .vip__btn');
        vipElements.forEach(element => {
          if (element.style.display !== 'none') {
            element.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important;';
          }
        });
        
        // Big Wins wrapper'ını sürekli göster
        const bigWinsWrapper = document.getElementById('big-wins-wrapper');
        if (bigWinsWrapper) {
          bigWinsWrapper.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; position: relative !important; left: auto !important; pointer-events: auto !important; z-index: auto !important;';
        }
        
        const vipRows = document.querySelectorAll('div.row');
        vipRows.forEach(row => {
          if (row.querySelector('.vip') && row.style.display !== 'none') {
            row.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important;';
          }
        });
        
        // Last Bets Wrapper'ı gizle (Web & Mobil)
        const lastBetsWrapper = document.getElementById('last-bets-wrapper');
        if (lastBetsWrapper) {
          lastBetsWrapper.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important;';
        }
      }
    }, 3000); // Her 3 saniyede kontrol et
    
    // İlk yükleme için hızlı kontrol - sadece 2 saniye
    let quickCheckCount = 0;
    const quickIntervalId = setInterval(function() {
      quickCheckCount++;
      
      if (quickCheckCount > 10) { // 2 saniye sonra durdur
        clearInterval(quickIntervalId);
        return;
      }
      
      if (isHomePage()) {
        const targetDiv = document.getElementById("banners-wrapper");
        const sliderContainer = document.querySelector('.main-slider-container');
        
        if (targetDiv && !sliderContainer) {
          updatePageContent();
        }
      }
    }, 200); // Her 200ms kontrol et
  }

  // Jojova Sohbet butonunu yükle
  function loadJojovaSohbetResources() {
    // Sadece JS yükle (CSS kaldırıldı, stiller JS içinde)
    if (!document.querySelector('script[src*="jojova_sohbet.js"]')) {
      const chatJS = document.createElement('script');
      chatJS.src = './header_button_ekleme/jojova_sohbet.js';
      document.head.appendChild(chatJS);
    }
  }

  // Safari için History API Override - Her URL değişikliğini yakala
  function overrideHistoryForSafari() {
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    
    history.pushState = function() {
      pushState.apply(history, arguments);
      setTimeout(() => {
        superForceUpdate();
      }, 50);
    };
    
    history.replaceState = function() {
      replaceState.apply(history, arguments);
      setTimeout(() => {
        superForceUpdate();
      }, 50);
    };
  }

  // Sayfa yüklendiğinde ve URL değiştiğinde içeriği güncelle
  function initializePageUpdater() {
    // Hemen çalıştır
    superForceUpdate();

    // Safari için History API Override
    overrideHistoryForSafari();

    // Sürekli kontrol başlat
    startContinuousCheck();
    
    // Jojova Sohbet butonunu yükle
    loadJojovaSohbetResources();

    // URL değişikliklerini izle - Safari için daha agresif
    let lastUrl = location.href; 
    let lastCheck = Date.now();
    
    // Safari için URL değişikliğini sürekli kontrol et
    setInterval(function() {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        superForceUpdate();
      }
    }, 100); // Her 100ms kontrol et
    
    // MutationObserver ile DOM değişikliklerini izle - Safari için daha hassas
    let mutationTimeout;
    const observer = new MutationObserver(function(mutations) {
      // URL değişti mi kontrol et
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        superForceUpdate();
        return;
      }
      
      // Çok fazla mutation varsa throttle et
      if (mutationTimeout) return;
      
      mutationTimeout = setTimeout(() => {
        mutationTimeout = null;
        
        if (isHomePage()) {
          const sliderContainer = document.querySelector('.main-slider-container');
          if (!sliderContainer) {
            updatePageContent();
          }
        }
      }, 300); // Safari için daha kısa gecikme
    });
    
    // Body'yi izle - Safari için subtree: true
    observer.observe(document.body, {
      childList: true,
      subtree: true // Safari için alt elemanları da izle
    });
    
    // Safari için tüm önemli event'leri dinle
    const allEvents = [
      'popstate', 'hashchange', 'pageshow', 'pagehide', 
      'beforeunload', 'visibilitychange'
    ];
    
    allEvents.forEach(function(eventName) {
      window.addEventListener(eventName, function(e) {
        // Safari için hemen güncelle
        if (isHomePage()) {
          superForceUpdate();
        }
      }, true);
    });

    // Document event'leri
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        superForceUpdate();
      }
    });

    // Safari için click event'lerini izle - Link tıklamalarını yakala
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && !link.target) {
        // Internal link'se kontrol et
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin) {
          setTimeout(() => {
            superForceUpdate();
          }, 100);
        }
      }
    }, true);

    // Mobil için ek event'ler
    if (isMobile()) {
      const mobileEvents = [
        'orientationchange',
        'touchstart',
        'touchend'
      ];
      
      mobileEvents.forEach(function(eventName) {
        document.addEventListener(eventName, function() {
          if (isHomePage()) {
            const sliderContainer = document.querySelector('.main-slider-container');
            if (!sliderContainer) {
              setTimeout(updatePageContent, 200);
            }
          }
        }, { passive: true });
      });
    }

    // Safari için daha sık backup kontrol
    setInterval(function() {
      if (isHomePage()) {
        const sliderContainer = document.querySelector('.main-slider-container');
        if (!sliderContainer) {
          updatePageContent();
        }
      }
    }, 2000); // 2 saniyede bir kontrol et
  }

  // Özel Telegram Popup Sistemi
  function initCustomPermissionSystem() {
    // Özel Telegram popup'ını oluştur
    createCustomPermissionPopup();
  }
  
  // Telegram popup sistemi için SDK yükleme gereksiz
  
  // Özel izin popup'ını oluştur
  function createCustomPermissionPopup() {
    // CSS stillerini ekle
    const styles = `
    <style id="custom-perm-styles">
    .custom-perm{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafe 100%);
      color: #333333;
      padding: 22px;
      border-radius: 18px;
      box-shadow: 0 15px 50px rgba(0,0,0,0.25), 0 5px 15px rgba(30,144,255,0.1);
      border: 1px solid rgba(30,144,255,0.1);
      max-width: 420px;
      width: calc(100% - 40px);
      font-family: Inter, Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial;
      z-index: 99999;
      opacity: 0;
      transition: transform 300ms ease, opacity 300ms ease;
    }
    .custom-perm.show{
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    .custom-perm .bell{
      color: #1e90ff;
      flex: 0 0 40px;
      margin-left: 2px;
    }
    .perm-body{ flex: 1; min-width: 0; }
    .perm-title{ font-weight: 700; font-size: 15px; margin-bottom: 5px; color: #2c3e50; line-height: 1.3; }
    .perm-sub{ font-size: 13px; color: #5a6c7d; margin-bottom: 12px; line-height: 1.4; }
    .perm-actions{ display:flex; gap:8px; justify-content:flex-end; }
    .btn{
      border: none;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.25s ease;
      letter-spacing: 0.3px;
    }
    .btn-deny{
      background: #f5f5f5;
      color: #666;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .btn-deny:hover{
      background: #e9e9e9;
    }
    .btn-allow{
      background: linear-gradient(135deg,#1e90ff 0%,#0066cc 100%);
      color: #ffffff;
      box-shadow: 0 8px 25px rgba(30,144,255,0.35);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-allow:hover{
      background: linear-gradient(135deg,#4da6ff 0%,#0056b3 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(30,144,255,0.45);
    }
    .perm-close{
      position: absolute;
      top: 6px;
      right: 8px;
      background: transparent;
      color: #999;
      border: 0;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .perm-close:hover{
      color: #333;
    }
    @media (max-width:480px){
      .custom-perm{ width: calc(100% - 24px); padding: 16px; }
      .perm-title{ font-size: 15px; }
    }
    .hidden { display: none !important; }
    </style>
    `;
    
    // HTML popup'ını oluştur
    const popupHTML = `
    <div id="custom-perm" class="custom-perm" role="dialog" aria-live="polite" aria-label="Bildirim izni">
      <div class="perm-left">
        <svg class="bell" width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 17H9a3 3 0 006 0z" fill="currentColor" />
          <path d="M18 8a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2V8z" stroke="currentColor" stroke-width="0.5" />
        </svg>
      </div>
      <div class="perm-body">
        <div class="perm-title">Promosyonlar ve güncel giriş adresi için Jojova telegram adresine katıl!</div>
        <div class="perm-sub">Hemen katıl ve promosyonlarda geri kalma.</div>
        <div class="perm-actions">
          <button id="perm-deny" class="btn btn-deny" type="button">Sonra</button>
          <button id="perm-allow" class="btn btn-allow" type="button">Telegram'a Git</button>
        </div>
      </div>
      <button id="perm-close" class="perm-close" aria-label="Kapat">&times;</button>
    </div>
    `;
    
    // Head'e CSS ekle
    document.head.insertAdjacentHTML('beforeend', styles);
    
    // Body'e popup ekle
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    
    // Event listener'ları bağla
    setupPermissionEvents();
  }
  
  // Event listener'ları kurma
  function setupPermissionEvents() {
    const customPerm = document.getElementById('custom-perm');
    const allowBtn = document.getElementById('perm-allow');
    const denyBtn = document.getElementById('perm-deny');
    const closeBtn = document.getElementById('perm-close');
    
    const dismissedKey = 'custom-perm-dismissed-v1';
    
    // Popup gösterme kontrolü
    if (localStorage.getItem(dismissedKey) === '1') {
      customPerm.classList.add('hidden');
    } else {
      // Hemen popup'ı göster
      customPerm.classList.add('show');
    }
    
    function hidePerm(saveDismiss = true) {
      customPerm.classList.remove('show');
      if (saveDismiss) localStorage.setItem(dismissedKey, '1');
      setTimeout(() => customPerm.classList.add('hidden'), 220);
    }
    
    // Engelle butonu
    denyBtn.addEventListener('click', () => {
      hidePerm(true);
    });
    
    // Kapat butonu
    closeBtn.addEventListener('click', () => {
      hidePerm(true);
    });
    
    // Telegram'a Git butonu
    allowBtn.addEventListener('click', async () => {
      hidePerm(false);
      
      // Telegram adresine yönlendir
      window.open('https://t.me/+9VwSnEpsgB00MmFk', '_blank');
    });
  }
  
  // Telegram yönlendirmesi için push notification kodları gereksiz

  // Ana sistem başlatma
  setTimeout(() => {
    initCustomPermissionSystem();
  }, 1000);

  // DOM yüklendikten sonra veya hemen çalıştır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageUpdater);
  } else {
    initializePageUpdater();
  }

  // Her olası load durumu için kontrol
  window.addEventListener('load', function() {
    superForceUpdate();
  });

  // Gereksiz çoklu call'ları kaldır - sadece bir kere yeterli

  // Toastify close button fix - drag yutmasını engelle ve tıklamada kapat
  function initToastifyCloseFix() {
    function bindButtons(root) {
      var ctx = root && root.querySelectorAll ? root : document;
      var buttons = ctx.querySelectorAll('.Toastify__close-button');
      buttons.forEach(function(btn){
        if (btn.dataset.jojovaToastifyFix === '1') return;
        btn.dataset.jojovaToastifyFix = '1';
        // Drag/sürükleme olaylarını üst seviyeye çıkmadan durdur
        ['pointerdown','mousedown','touchstart'].forEach(function(ev){
          btn.addEventListener(ev, function(e){
            // OneSignal elementlerini koru
            if (e.target.closest && (e.target.closest('[id*="onesignal"]') || e.target.closest('[class*="onesignal"]'))) {
              return;
            }
            e.stopPropagation();
            e.stopImmediatePropagation();
          }, true);
        });
        // Click'te güvenli kapat (Toastify handler çalışsa da sorun olmaz)
        btn.addEventListener('click', function(e){
          e.stopPropagation();
          var toast = btn.closest('.Toastify__toast');
          if (toast) {
            toast.style.transition = 'opacity 160ms ease, transform 160ms ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-8px)';
            setTimeout(function(){
              if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
              }
            }, 170);
          }
        }, true);
      });
    }
    // İlk bağlama
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function(){ bindButtons(document); });
    } else {
      bindButtons(document);
    }
    // Yeni toastlar için gözlemci
    var obs = new MutationObserver(function(mutations){
      mutations.forEach(function(m){
        m.addedNodes && m.addedNodes.forEach(function(node){
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('Toastify__toast')) {
            bindButtons(node);
          } else if (node.querySelectorAll) {
            var any = node.querySelectorAll('.Toastify__toast');
            if (any && any.length) bindButtons(node);
          }
        });
      });
    });
    try { obs.observe(document.body, { childList: true, subtree: true }); } catch(_){}
  }
  // Anında başlat
  initToastifyCloseFix();

  // Sidebar collapsed (ok) butonu tek tık düzeltmesi
  function initSidebarCollapsedFix() {
    function findCollapseContainer(btn) {
      try {
        var id = btn.getAttribute('data-bs-target') || btn.getAttribute('aria-controls');
        if (id) {
          var sel = id.charAt(0) === '#' ? id : ('#' + id);
          var target = document.querySelector(sel);
          if (target) return target;
        }
        var wrapper = btn.closest('.menu-item-wrapper') || btn.closest('li') || btn.parentElement;
        if (wrapper) {
          var collapse = wrapper.querySelector('.collapse');
          if (collapse) return collapse;
        }
        // Yakın kardeşlerde ara
        var n = btn.nextElementSibling;
        for (var i = 0; i < 4 && n; i++, n = n.nextElementSibling) {
          if (n.classList && n.classList.contains('collapse')) return n;
        }
        // Parent kardeşlerinde ara
        var p = btn.parentElement ? btn.parentElement.nextElementSibling : null;
        for (var j = 0; j < 4 && p; j++, p = p.nextElementSibling) {
          if (p.classList && p.classList.contains('collapse')) return p;
        }
      } catch(_){}
      return null;
    }

    // Drag/hover etkilerini kes ve tek tık garantile
    document.addEventListener('pointerdown', function(e){
      var btn = e.target.closest && e.target.closest('.sidebar__collapsed');
      if (!btn) return;
      // OneSignal elementlerini koru
      if (e.target.closest && (e.target.closest('[id*="onesignal"]') || e.target.closest('[class*="onesignal"]'))) {
        return;
      }
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, true);

    document.addEventListener('click', function(e){
      var btn = e.target.closest && e.target.closest('.sidebar__collapsed');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var collapse = findCollapseContainer(btn);
      if (!collapse) return;
      var isOpen = collapse.classList.contains('show') || collapse.style.display === 'block';
      if (isOpen) {
        collapse.classList.remove('show');
        collapse.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        collapse.classList.add('show');
        collapse.style.display = 'block';
        btn.setAttribute('aria-expanded', 'true');
      }
    }, true);
  }
  initSidebarCollapsedFix();

  // Auth modal CSS kaldırıldı (temizlik)
  try {
    var oldAuthLink = document.querySelector('link[href$="/Genel_Style/auth_modal.css"], link[href$="Genel_Style/auth_modal.css"]');
    if (oldAuthLink && oldAuthLink.parentNode) {
      oldAuthLink.parentNode.removeChild(oldAuthLink);
    }
  } catch(_){}

  // Minimal Sidebar Effects CSS'i enjekte et (glow kapalı, sade hover)
  function injectMinimalSidebarEffects() {
    if (document.getElementById('sidebar-minimal-effects')) return;
    var css = `
/* ——— Minimal Sidebar Effects: Glow Kaldırma + Sade Hover ——— */
/* Tüm ana elemanlarda glow/animasyonları kapat */
.sidebar .sidebar__nav a,
.sidebar .sidebar__nav button,
.sidebar .sidebar__link,
.sidebar .sidebar__link-small,
.sidebar .sidebar__nav-small a,
.sidebar .sidebar__nav-small button,
.sidebar .crypto-link,
.sidebar .crypto-link-small,
.sidebar .sidebar__lang-btn,
.sidebar .sidebar__lang-small-btn,
.sidebar .menu-item-wrapper .sidebar__collapsed {
  box-shadow: none !important;
  text-shadow: none !important;
  filter: none !important;
  animation: none !important;
}

/* Basit ve kaliteli hover: hafif arkaplan + ince border */
.sidebar .sidebar__nav a:hover,
.sidebar .sidebar__nav button:hover,
.sidebar .sidebar__link:hover,
.sidebar .sidebar__link-small:hover,
.sidebar .sidebar__nav-small a:hover,
.sidebar .sidebar__nav-small button:hover,
.sidebar .crypto-link:hover,
.sidebar .crypto-link-small:hover,
.sidebar .sidebar__lang-btn:hover,
.sidebar .sidebar__lang-small-btn:hover,
.sidebar .menu-item-wrapper .sidebar__collapsed:hover {
  transform: none !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: none !important;
}

/* Light theme için sade hover varyasyonu */
[data-bs-theme="light"] .sidebar .sidebar__nav a:hover,
[data-bs-theme="light"] .sidebar .sidebar__nav button:hover,
[data-bs-theme="light"] .sidebar .sidebar__link:hover,
[data-bs-theme="light"] .sidebar .sidebar__link-small:hover,
[data-bs-theme="light"] .sidebar .sidebar__nav-small a:hover,
[data-bs-theme="light"] .sidebar .sidebar__nav-small button:hover,
[data-bs-theme="light"] .sidebar .crypto-link:hover,
[data-bs-theme="light"] .sidebar .crypto-link-small:hover,
[data-bs-theme="light"] .sidebar .sidebar__lang-btn:hover,
[data-bs-theme="light"] .sidebar .sidebar__lang-small-btn:hover,
[data-bs-theme="light"] .sidebar .menu-item-wrapper .sidebar__collapsed:hover {
  background: rgba(0, 0, 0, 0.04) !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
}

/* Dekoratif katman/parlama efektlerini kapat */
.sidebar .sidebar__nav a::before,
.sidebar .sidebar__nav a::after,
.sidebar .sidebar__nav button::before,
.sidebar .sidebar__nav button::after,
.sidebar .crypto-link__bg,
.sidebar .crypto-link__icon::before,
.sidebar .crypto-link-small__glow {
  display: none !important;
  content: none !important;
  box-shadow: none !important;
}

/* Küçük menü ikonlarındaki animasyonları kapat */
.sidebar .sidebar__nav-small a svg,
.sidebar .sidebar__nav-small button svg,
.sidebar .crypto-link-small svg,
.sidebar .sidebar__nav a svg,
.sidebar .sidebar__nav button svg {
  animation: none !important;
  filter: none !important;
}

/* ——— Less Gold: Küçük menü ve ikonlarda nötr görünüm ——— */
.sidebar .sidebar__link-small,
.sidebar .sidebar__nav-small a,
.sidebar .sidebar__nav-small button {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

.sidebar .crypto-link-small {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

[data-bs-theme="light"] .sidebar .sidebar__link-small,
[data-bs-theme="light"] .sidebar .sidebar__nav-small a,
[data-bs-theme="light"] .sidebar .sidebar__nav-small button,
[data-bs-theme="light"] .sidebar .crypto-link-small {
  background: rgba(0, 0, 0, 0.03) !important;
  border-color: rgba(0, 0, 0, 0.12) !important;
}

.sidebar .sidebar__nav-small a svg,
.sidebar .sidebar__nav-small button svg,
.sidebar .sidebar__link-small svg,
.sidebar .sidebar__nav a svg,
.sidebar .sidebar__nav button svg,
.sidebar .svg-icon {
  stroke: var(--tf-tc2) !important;
  fill: var(--tf-tc2) !important;
}

.sidebar .sidebar__nav-small a:hover svg,
.sidebar .sidebar__nav-small button:hover svg,
.sidebar .sidebar__link-small:hover svg,
.sidebar .sidebar__nav a:hover svg,
.sidebar .sidebar__nav button:hover svg {
  stroke: var(--tf-tc) !important;
  fill: var(--tf-tc) !important;
}

.sidebar .active .svg-icon {
  fill: var(--tf-tc) !important;
  color: var(--tf-tc) !important;
}

[data-bs-theme="light"] .sidebar .active .svg-icon {
  fill: #1d2735 !important;
  color: #1d2735 !important;
}`;
    var styleEl = document.createElement('style');
    styleEl.id = 'sidebar-minimal-effects';
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  }
  injectMinimalSidebarEffects();

  // Mini menüde yalnızca aktif sarı kalsın, büyük menüye dokunma
  function injectMiniGoldOnly() {
    if (document.getElementById('sidebar-mini-gold-only')) return;
    var css = `
/* ——— Mini menüde sadece aktif olan sarı ——— */
.sidebar .sidebar__small .sidebar__nav-small a svg,
.sidebar .sidebar__small .sidebar__nav-small button svg,
.sidebar .sidebar__small .sidebar__link-small svg,
.sidebar .sidebar__small .svg-icon {
  stroke: var(--tf-tc2) !important;
  fill: var(--tf-tc2) !important;
  color: var(--tf-tc2) !important;
}

.sidebar .sidebar__small .sidebar__nav-small a:hover svg,
.sidebar .sidebar__small .sidebar__nav-small button:hover svg,
.sidebar .sidebar__small .sidebar__link-small:hover svg {
  stroke: var(--tf-tc) !important;
  fill: var(--tf-tc) !important;
  color: var(--tf-tc) !important;
}

.sidebar .sidebar__small .sidebar__nav-small li.active a svg,
.sidebar .sidebar__small .sidebar__link-small.active svg,
.sidebar .sidebar__small .active .svg-icon {
  stroke: var(--tf-active) !important;
  fill: var(--tf-active) !important;
  color: var(--tf-active) !important;
}

/* ——— Büyük menü davranışını koru ——— */
.sidebar .sidebar__big .sidebar__nav a svg,
.sidebar .sidebar__big .sidebar__nav button svg {
  stroke: var(--tf-tc2) !important;
  fill: var(--tf-tc2) !important;
}

.sidebar .sidebar__big .sidebar__nav a:hover svg,
.sidebar .sidebar__big .sidebar__nav button:hover svg,
.sidebar .sidebar__big .active .svg-icon {
  stroke: var(--tf-active) !important;
  fill: var(--tf-active) !important;
  color: var(--tf-active) !important;
}`;
    var styleEl = document.createElement('style');
    styleEl.id = 'sidebar-mini-gold-only';
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  }
  injectMiniGoldOnly();

  // Background Image Overlay - Tüm içeriğin üstünde (Desktop + Mobil)
  (function injectBGStyles(){
    var css = `
      body::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/ze0z0eskNINKF115seHnujKtLKXg9nCOdHqspqfg.png') !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-attachment: fixed !important;
        opacity: 0.1 !important;
        pointer-events: none !important;
        z-index: 99999 !important;
        mix-blend-mode: lighten !important;
      }
    `;
    var el = document.getElementById('bg-main-style');
    if (el) {
      el.textContent = css;
      return;
    }
    el = document.createElement('style');
    el.id = 'bg-main-style';
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
  })();

})(); 
</script>
 