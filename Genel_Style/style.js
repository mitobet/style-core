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
      console.log('Eski main slider gizlendi');
    }
    
    // Eğer div bulunduysa içine metin ekle
    if (targetDiv) {
      
       // Slider Container - En üstte olacak
       const sliderContainer = `
           <!-- Desktop Swiper Slider -->
           <div class="main-slider-container">
               <div class="swiper main-slider">
                   <div class="swiper-wrapper">
                       
                       <!-- Slide 1 -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/YF1hLY0iqMYnsqn0LBKPUcqIFppaqZ3SaYpsG5Oe.png" alt="Slide 1" class="slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Slide 2 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/YF1hLY0iqMYnsqn0LBKPUcqIFppaqZ3SaYpsG5Oe.png" alt="Slide 2" class="slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Slide 3 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/YF1hLY0iqMYnsqn0LBKPUcqIFppaqZ3SaYpsG5Oe.png" alt="Slide 3" class="slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Slide 4 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/YF1hLY0iqMYnsqn0LBKPUcqIFppaqZ3SaYpsG5Oe.png" alt="Slide 4" class="slider-image">
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
                       
                       <!-- Mobile Slide 1 -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/w6F9TyMumIoDuGzb5irkEwslVPFyhNIbncXLIgr8.png" alt="Mobile Slide 1" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Mobile Slide 2 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/w6F9TyMumIoDuGzb5irkEwslVPFyhNIbncXLIgr8.png" alt="Mobile Slide 2" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Mobile Slide 3 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/w6F9TyMumIoDuGzb5irkEwslVPFyhNIbncXLIgr8.png" alt="Mobile Slide 3" class="mobile-slider-image">
                               </a>
                           </div>
                       </div>

                       <!-- Mobile Slide 4 - Aynı görsel -->
                       <div class="swiper-slide">
                           <div class="mobile-slider-image-container">
                               <a href="${langPrefix}/promotions">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/w6F9TyMumIoDuGzb5irkEwslVPFyhNIbncXLIgr8.png" alt="Mobile Slide 4" class="mobile-slider-image">
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
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/casino/'">
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

           // Features Container
           const featuresContainer = `
           <div class="features-container">
               <div class="features-inner">
                   <div class="features-content">
                       <div class="feature-item" onclick="window.location.href='${langPrefix}/promotions'">
                           <div class="feature-icon-wrapper">
                               <div class="feature-icon-bg">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/kQtnFOpFVn2THJuoLKypLdzx2dLJbz2ZDEMRRrSC.png" alt="${t.feature1}" class="feature-icon">
                               </div>
                           </div>
                           <div class="feature-text">
                               <h3 class="feature-title" id="feature-title-1">${t.feature1}</h3>
                           </div>
                       </div>
                       <div class="feature-item" onclick="window.location.href='${langPrefix}/vip'">
                           <div class="feature-icon-wrapper">
                               <div class="feature-icon-bg">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/pj4PiDqSurqAABqy9IhsgtJJeAtCNVE1gLiGDhto.png" alt="${t.feature2}" class="feature-icon">
                               </div>
                           </div>
                           <div class="feature-text">
                               <h3 class="feature-title" id="feature-title-2">${t.feature2}</h3>
                           </div>
                       </div>
                       <div class="feature-item" onclick="window.location.href='${langPrefix}/trade'">
                           <div class="feature-icon-wrapper">
                               <div class="feature-icon-bg">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/vNB9a6IBHJXmH5l7iuSUj2MIkzbwkedNx2ugtaQk.png" alt="${t.feature3}" class="feature-icon">
                               </div>
                           </div>
                           <div class="feature-text">
                               <h3 class="feature-title" id="feature-title-3">${t.feature3}</h3>
                           </div>
                       </div>
                       <div class="feature-item" onclick="window.location.href='${langPrefix}/tournaments'">
                           <div class="feature-icon-wrapper">
                               <div class="feature-icon-bg">
                                   <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/Ghn2hhdBAi6EBtTw9npYAGrLUHKoWFbHnNN035tD.png" alt="${t.feature4}" class="feature-icon">
                               </div>
                           </div>
                           <div class="feature-text">
                               <h3 class="feature-title" id="feature-title-4">${t.feature4}</h3>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <style>
               .features-content {
                   position: relative;
                   display: flex;
                   justify-content: space-between;
               }
               .feature-item {
                   cursor: pointer;
                   transition: all 0.3s ease;
                   position: relative;
                   z-index: 1;
               }
               .feature-item:hover {
                   transform: scale(1.05);
                   z-index: 2;
               }
               .features-content:hover .feature-item:not(:hover) {
                   opacity: 0.7;
                   filter: brightness(0.8);
               }
               .feature-icon-bg {
                   transition: all 0.3s ease;
               }
               .feature-item:hover .feature-icon-bg {
                   box-shadow: 0 0 15px rgba(255, 165, 0, 0.5);
               }
           </style>
       `;

       // Sport Banner Container
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





      // Jackpot container'ı tamamen gizle - sayfa yüklenir yüklenmez
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        #jackpots-container { 
          display: none !important; 
          opacity: 0 !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
        }
        @media (max-width: 768px) {
          #jackpots-container {
            order: 4 !important; /* Mobilde popüler sporlardan önce */
          }
          .popular-sports-container {
            order: 5 !important; /* Mobilde jackpot'tan sonra */
          }
          .container {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      // Jackpot container'ı hemen gizle - daha sonra tekrar görünür yapacağız
      const jackpotsContainer = document.getElementById('jackpots-container');
      if (jackpotsContainer) {
        jackpotsContainer.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; position: absolute !important; left: -9999px !important;';
      }
      
      // İçeriği targetDiv'e ekle - slider en üstte, welcome container kaldırıldı
      targetDiv.innerHTML = '<div class="container">' + sliderContainer + sliderBottom + featuresContainer + sportBannerContainer + '</div>';
      


      // İçerik eklendikten sonra DOM'dan elementleri al
      const topGamesWrapper = document.getElementById('top-games-wrapper');
      const bannerswrapper = document.getElementById('banners-wrapper');

      // Elementler varsa topGamesWrapper'ı banners-wrapper'dan sonra ekle
      if (topGamesWrapper && bannerswrapper && bannerswrapper.parentNode) {
        bannerswrapper.parentNode.insertBefore(topGamesWrapper, bannerswrapper.nextSibling);
      } else {
        console.warn('topGamesWrapper veya banners-wrapper bulunamadı.');
      }

      // Slider'ları başlat - Timeout ile bekle DOM yüklensin
      setTimeout(() => {
        initializeSliders();
        console.log('Slider initialization tamamlandı');
      }, 500);
    } else {
      console.warn('banners-wrapper bulunamadı.');
    }
  }

  // Slider initialization fonksiyonu
  function initializeSliders() {
    console.log('🎯 Slider initialization başlatılıyor...');
    
    // Swiper CSS ve JS dosyalarını yükle
    if (!document.querySelector('link[href*="swiper"]')) {
      const swiperCSS = document.createElement('link');
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css';
      document.head.appendChild(swiperCSS);
      console.log('✅ Swiper CSS yüklendi');
    }
    
    // Swiper JS yükle veya varsa direkt kullan
    function createSliders() {
      console.log('🔄 Slider oluşturuluyor...');
      
      // Desktop Slider
      const desktopSlider = document.querySelector('.main-slider');
      if (desktopSlider) {
        console.log('📱 Desktop slider bulundu:', desktopSlider);
        
        if (typeof Swiper !== 'undefined') {
          const swiper = new Swiper('.main-slider', {
            loop: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            speed: 1000,
            pagination: {
              el: '.main-slider .swiper-pagination',
              clickable: true,
              dynamicBullets: false,
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
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
          });
          console.log('✅ Desktop slider oluşturuldu:', swiper);
        } else {
          console.warn('❌ Swiper library bulunamadı!');
        }
      } else {
        console.warn('❌ Desktop slider container bulunamadı!');
      }

      // Mobile Slider
      const mobileSlider = document.querySelector('.mobile-slider');
      if (mobileSlider) {
        console.log('📱 Mobile slider bulundu:', mobileSlider);
        
        if (typeof Swiper !== 'undefined') {
          const mobileSwiper = new Swiper('.mobile-slider', {
            loop: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            speed: 1000,
            pagination: {
              el: '.mobile-slider .swiper-pagination',
              clickable: true,
              dynamicBullets: false,
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
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
          });
          console.log('✅ Mobile slider oluşturuldu:', mobileSwiper);
        } else {
          console.warn('❌ Swiper library bulunamadı!');
        }
      } else {
        console.warn('❌ Mobile slider container bulunamadı!');
      }
    }
    
    // Swiper zaten varsa direkt kullan
    if (typeof Swiper !== 'undefined') {
      console.log('✅ Swiper zaten yüklü, slider oluşturuluyor...');
      createSliders();
    } else {
      // Swiper JS'i yükle
      if (!document.querySelector('script[src*="swiper"]')) {
        console.log('📦 Swiper JS yükleniyor...');
        const swiperJS = document.createElement('script');
        swiperJS.src = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';
        swiperJS.onload = function() {
          console.log('✅ Swiper JS yüklendi');
          setTimeout(createSliders, 100);
        };
        swiperJS.onerror = function() {
          console.error('❌ Swiper JS yüklenemedi!');
        };
        document.head.appendChild(swiperJS);
      } else {
        // Script var ama Swiper yok, bekle
        console.log('⏳ Swiper loading bekleniyor...');
        let attempts = 0;
        const checkSwiper = setInterval(() => {
          attempts++;
          if (typeof Swiper !== 'undefined') {
            console.log('✅ Swiper hazır, slider oluşturuluyor...');
            clearInterval(checkSwiper);
            createSliders();
          } else if (attempts > 50) { // 5 saniye bekle
            console.error('❌ Swiper yüklenme timeout!');
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
      feature1: "Promosyonlar",
      feature2: "VIP Kulübü", 
      feature3: "Kripto Trade",
      feature4: "Turnuvalar",

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
      feature1: "Promotions",
      feature2: "VIP Club",
      feature3: "Crypto Trade", 
      feature4: "Tournaments",

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
      
      // Çoklu güncelleme - her durumu yakala
      const delays = [5, 10, 25, 50, 100, 200, 400, 800];
      delays.forEach(delay => {
        setTimeout(() => {
          if (isHomePage()) {
            const welcomeContainer = document.getElementById("welcome-id-new");
            if (!welcomeContainer) {
              updatePageContent();
            }
          }
        }, delay);
      });
    }
  }

  // Daha uyumlu kontrol sistemi
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
      }
    }, 2000); // Her 2 saniyede kontrol et
    
    // İlk yükleme için hızlı kontrol - sadece 5 saniye
    let quickCheckCount = 0;
    const quickIntervalId = setInterval(function() {
      quickCheckCount++;
      
      if (quickCheckCount > 25) { // 5 saniye sonra durdur
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

  // Sayfa yüklendiğinde ve URL değiştiğinde içeriği güncelle
  function initializePageUpdater() {
    // Hemen çalıştır
    superForceUpdate();

    // Sürekli kontrol başlat
    startContinuousCheck();

    // URL değişikliklerini izle
    let lastUrl = location.href; 
    
    // MutationObserver ile DOM değişikliklerini izle - daha az agresif
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
      }, 500); // 500ms gecikme
    });
    
    // Sadece body'yi izle, daha az agresif
    observer.observe(document.body, {
      childList: true,
      subtree: false // Alt elemanları izleme
    });
    
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

    // Document event'leri
    const docEvents = ['DOMContentLoaded', 'readystatechange'];
    docEvents.forEach(function(eventName) {
      document.addEventListener(eventName, function() {
        superForceUpdate();
      });
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

    // 5 saniyede bir kontrol et - backup sistem
    setInterval(function() {
      if (isHomePage()) {
        const sliderContainer = document.querySelector('.main-slider-container');
        if (!sliderContainer) {
          updatePageContent();
        }
      }
    }, 5000);
  }

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

  // Sayfa tamamen hazır olduğunda
  document.addEventListener('DOMContentLoaded', function() {
    superForceUpdate();
  });

  // Ready state değişikliklerinde
  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      superForceUpdate();
    }
  });

  // Hemen çalıştır - hiç beklemeden
  superForceUpdate();

  // 50ms sonra tekrar dene
  setTimeout(superForceUpdate, 50);

  // 200ms sonra tekrar dene  
  setTimeout(superForceUpdate, 200);

  // 1 saniye sonra tekrar dene
  setTimeout(superForceUpdate, 1000);

})(); 
</script>