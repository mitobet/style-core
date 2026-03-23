<script>
(function() {
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
      
       // Slider Container - En üstte olacak
       const sliderContainer = `
           <!-- Desktop Swiper Slider -->
           <div class="main-slider-container">
               <div class="swiper main-slider">
                   <div class="swiper-wrapper">
                       
                       <!-- Slide 1 - NEW -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/jQMoRFXZ4Wf3aEaKqEDlfxihkqzb2c3hAjasYlR8.png" alt="Slide 1" class="slider-image">
                               </a>
                           </div>
                       </div>
                       
                       <!-- Slide 2 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/i7XUaFcZxjrr5JUOrnK1INmeGhLnPbA7GAUA0lQx.png" alt="Slide 2" class="slider-image">
                               </a>
                           </div>
                       </div>


                       <!-- Slide 4 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/mL48sxRFfepgwtymuxLDoFF8fUlNtFlh01p0ymHH.png" alt="Slide 4" class="slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Slide 5 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/crsIJYbRFcbVhKmBAZo4mTpDJiP3omWQzl237hy1.png" alt="Slide 5" class="slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Slide 6 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/t14v7zHjn9tx7Ariu8EzH26TdGjsYFqUiTUBcDD0.png" alt="Slide 6" class="slider-image">
                               </a>
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
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/4rBPygBwpsIUAHRz2vBpM6THyfC8MgjmyEbuzQTI.png" alt="Mobile Slide 1" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>
                       
                       <!-- Mobile Slide 2 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/J3qQrJO21QWoAv5uyD9eYrkUwsikP2u9bAIXKopL.png" alt="Mobile Slide 2" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>


                       <!-- Mobile Slide 4 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Hb26YDg01wsXMza4zJE5ky7nRRtONUVwyca6nlMx.png" alt="Mobile Slide 4" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Mobile Slide 5 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Mv8x7iVqQ3aScDlxsIbKXAroPF8gFpuQe2E29PqT.png" alt="Mobile Slide 5" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Mobile Slide 6 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Bapj61C3FNBMLXIxih5rTgNqmRHt2lc6NyiCS7Ve.png" alt="Mobile Slide 6" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                   </div>
                   
                   <!-- Mobile Pagination -->
                   <div class="swiper-pagination"></div>
               </div>
           </div>
       `;

    // Payment Container - Görseldeki sıralamaya göre
          const sliderBottom = `
              <div class="slider-bottom-container">
                  <div class="slider-bottom-grid">
                      <!-- Üst Sol: Slot Oyunları -->
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/casino/group/lobby'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/EIpBfslRNFy6SBmrupvVsBFX2gdFHFaVBC8T3fAR.png" alt="Slot Oyunları" class="slider-bottom-image">
                      </div>
                      <!-- Üst Sağ: Canlı Casino -->
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/casino/group/live-lobby'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/A5mm1VoGRciOn75iKVCg4DI4aivDPabFKkHwA0XQ.png" alt="Canlı Casino" class="slider-bottom-image">
                      </div>
                      <!-- Alt Sol: Spor Oyunları -->
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/sportsbook'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/AoqGK76s6ZWSyg0H70D3meqrXIZdwYcNtSAmKsom.png" alt="Spor Oyunları" class="slider-bottom-image">
                      </div>
                      <!-- Alt Sağ: JojoVIP Club -->
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/vip'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/5DPopoH61Dj5fqZ5lmMM0gWZsXekd3EopM4KP6QO.png" alt="JojoVIP Club" class="slider-bottom-image">
                      </div>
                  </div>
              </div>
          `;



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
          order: 999 !important;
          margin-top: 20px !important;
        }
        #big-wins-wrapper {
          display: none !important; 
          opacity: 0 !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          pointer-events: none !important;
          z-index: -9999 !important;
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
        @media (max-width: 768px) {
          #jackpots-container {
            order: 999 !important; /* Mobilde de en alta */
            margin-top: 15px !important;
          }
          .popular-sports-container {
            order: 5 !important; /* Mobilde normal sırada */
          }
          .container {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      // Jackpot container'ı en alta al
      const jackpotsContainer = document.getElementById('jackpots-container');
      if (jackpotsContainer) {
        jackpotsContainer.style.cssText = 'order: 999 !important; margin-top: 20px !important;';
      }
      
      // Big Wins wrapper'ını gizle
      const bigWinsWrapper = document.getElementById('big-wins-wrapper');
      if (bigWinsWrapper) {
        bigWinsWrapper.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important; pointer-events: none !important; z-index: -9999 !important;';
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
      
      // Futbol Sekmesi Container - TIKLAMA İLE SPORTSBOOK'A YÖNLENDİRME
      const futbolSekmesiContainer = `
          <div class="pb-component-wrapper" style="margin-top: 10px;">
              <div class="futbol-banner-container col-4 futbol-banner-without-titles" data-scroll-lock-scrollable="">
                  <div class="futbol-banner-info futbol-banner bundesliga" aria-label="Bundesliga" onclick="window.location.href='${langPrefix}/sportsbook'" style="cursor: pointer;">
                      <img alt="Bundesliga" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/aIbhaWSGcJcneCnwIXAnsWFLYnF6bvyvNVOUiFMZ.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Bundesliga</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner laliga" aria-label="La Liga" onclick="window.location.href='${langPrefix}/sportsbook'" style="cursor: pointer;">
                      <img alt="La Liga" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/HeuC8ictUKIrSTxeXuGySfo2FvUxmY40MnnlGgeG.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">La Liga</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner premier-league" aria-label="Premier League" onclick="window.location.href='${langPrefix}/sportsbook'" style="cursor: pointer;">
                      <img alt="Premier League" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/o1q4JAyJc20PBfujBi0DtJHtRjhCxRYjxzteEt5I.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Premier League</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner serie-a" aria-label="Serie A" onclick="window.location.href='${langPrefix}/sportsbook'" style="cursor: pointer;">
                      <img alt="Serie A" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/nMaflwuXV12Dd5DFW1sRBcKmyev0a3E5XhJPYYk5.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Serie A</div>
                  </div>
                  <div class="futbol-banner-info futbol-banner super-lig" aria-label="Süper Lig" onclick="window.location.href='${langPrefix}/sportsbook'" style="cursor: pointer;">
                      <img alt="Süper Lig" loading="lazy" src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/yONpfInMNDkU8hNochP0gmn0aZ2xjSe8unyItHaa.webp" class="futbol-banner-img">
                      <div class="futbol-banner-title">Süper Lig</div>
                  </div>
              </div>
          </div>
      `;

      // İçeriği targetDiv'e ekle - slider en üstte, futbol sekmesi eklendi (sport banner kaldırıldı)
      targetDiv.innerHTML = '<div class="container">' + sliderContainer + sliderBottom + futbolSekmesiContainer + '</div>';
      


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
      }, 500);
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

  // OPTİMİZE EDİLMİŞ kontrol sistemi - interval'ler azaltıldı
  function startContinuousCheck() {
    // VIP/BigWins için CSS-only çözüm (interval yerine) 
    if (!document.getElementById('vip-hide-style')) {
      const hideStyle = document.createElement('style');
      hideStyle.id = 'vip-hide-style';
      hideStyle.textContent = `
        .vip, .vip__title, .vip__text, .vip__btn,
        #big-wins-wrapper {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          pointer-events: none !important;
        }
        div.row:has(.vip) {
          display: none !important;
        }
      `;
      document.head.appendChild(hideStyle);
    }
    
    // Ana kontrol döngüsü - HER 5 SANİYE (3 yerine, daha az agresif)
    let mainCheckCount = 0;
    const mainIntervalId = setInterval(function() {
      mainCheckCount++;
      
      // 60 saniye sonra durdur (sonsuz döngü yerine)
      if (mainCheckCount > 12) {
        clearInterval(mainIntervalId);
        return;
      }
      
      if (isHomePage()) {
        const targetDiv = document.getElementById("banners-wrapper");
        const sliderContainer = document.querySelector('.main-slider-container');
        
        if (targetDiv && !sliderContainer) {
          updatePageContent();
        }
        
        // Main slider kontrolü (basitleştirildi)
        const mainSlider = document.getElementById("main-slider");
        if (mainSlider && mainSlider.style.display !== 'none') {
          mainSlider.style.display = 'none';
          mainSlider.innerHTML = '';
        }
      }
    }, 5000); // Her 5 saniyede kontrol et
    
    // İlk yükleme için hızlı kontrol - SADECE 1 SANİYE (2 yerine)
    let quickCheckCount = 0;
    const quickIntervalId = setInterval(function() {
      quickCheckCount++;
      
      if (quickCheckCount > 4) { // 1 saniye sonra durdur (5x200ms)
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
    }, 250); // Her 250ms kontrol et (200 yerine)
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

  // Sayfa yüklendiğinde ve URL değiştiğinde içeriği güncelle
  function initializePageUpdater() {
    // Hemen çalıştır
    superForceUpdate();

    // Sürekli kontrol başlat
    startContinuousCheck();
    
    // Jojova Sohbet butonunu yükle
    loadJojovaSohbetResources();

    // URL değişikliklerini izle
    let lastUrl = location.href; 
    
    // MutationObserver ile DOM değişikliklerini izle - OPTİMİZE
    let mutationTimeout;
    let mutationCount = 0;
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
        mutationCount++;
        
        // 20 mutation sonra observer'ı durdur
        if (mutationCount > 20) {
          observer.disconnect();
          return;
        }
        
        if (isHomePage()) {
          const sliderContainer = document.querySelector('.main-slider-container');
          if (!sliderContainer) {
            updatePageContent();
          }
        }
      }, 500); // 500ms gecikme
    });
    
    // Sadece body'yi izle, daha az agresif
    observer.observe(document.body, {
      childList: true,
      subtree: false // Alt elemanları izleme
    });
    
    // 30 saniye sonra observer'ı durdur
    setTimeout(() => observer.disconnect(), 30000);
    
    // Sadece önemli event'leri dinle
    const allEvents = [
      'popstate', 'hashchange', 'pageshow'
    ];
    
    allEvents.forEach(function(eventName) {
      window.addEventListener(eventName, function(e) {
        setTimeout(() => {
          if (isHomePage()) {
            const sliderContainer = document.querySelector('.main-slider-container');
            if (!sliderContainer) {
              updatePageContent();
            }
          }
        }, 100);
      }, true);
    });

    // Document event'leri - sadece readystatechange yeterli
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        superForceUpdate();
      }
    });

    // Mobil için ek event'ler - sadece önemli olanlar
    if (isMobile()) {
      const mobileEvents = [
        'orientationchange' // Sadece ekran döndürme için
      ];
      
      mobileEvents.forEach(function(eventName) {
        document.addEventListener(eventName, function() {
          if (isHomePage()) {
            const sliderContainer = document.querySelector('.main-slider-container');
            if (!sliderContainer) {
              setTimeout(updatePageContent, 500); // Daha uzun gecikme
            }
          }
        }, { passive: true });
      });
    }

    // Backup sistem - SADECE 30 SANİYE BOYUNCA (sonsuz yerine)
    let backupCount = 0;
    const backupInterval = setInterval(function() {
      backupCount++;
      if (backupCount > 6) { // 30 saniye sonra durdur
        clearInterval(backupInterval);
        return;
      }
      if (isHomePage()) {
        const sliderContainer = document.querySelector('.main-slider-container');
        if (!sliderContainer) {
          updatePageContent();
        }
      }
    }, 5000);
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
[data-bs-theme=\"light\"] .sidebar .sidebar__nav a:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__nav button:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__link:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__link-small:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__nav-small a:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__nav-small button:hover,
[data-bs-theme=\"light\"] .sidebar .crypto-link:hover,
[data-bs-theme=\"light\"] .sidebar .crypto-link-small:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__lang-btn:hover,
[data-bs-theme=\"light\"] .sidebar .sidebar__lang-small-btn:hover,
[data-bs-theme=\"light\"] .sidebar .menu-item-wrapper .sidebar__collapsed:hover {
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

[data-bs-theme=\"light\"] .sidebar .sidebar__link-small,
[data-bs-theme=\"light\"] .sidebar .sidebar__nav-small a,
[data-bs-theme=\"light\"] .sidebar .sidebar__nav-small button,
[data-bs-theme=\"light\"] .sidebar .crypto-link-small {
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

[data-bs-theme=\"light\"] .sidebar .active .svg-icon {
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

  // #main__content arka planını #273341 yap
  (function injectMainContentBG(){
    var css = `#main__content { background: #273341 !important; }`;
    var el = document.getElementById('main-content-bg-style');
    if (el) {
      el.textContent = css;
      return;
    }
    el = document.createElement('style');
    el.id = 'main-content-bg-style';
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
  })();

})(); 
</script>