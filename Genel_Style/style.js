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
    
    // Main slider'ı tamamen kaldırmak yerine gizle ve içeriğini temizle
    if (mainSlider) {
      mainSlider.style.display = 'none';
      mainSlider.innerHTML = '';
    }
    
    // Eğer div bulunduysa içine metin ekle
    if (targetDiv) {
      
       // Welcome Container
       const welcomeContainer = `
       <div class="welcome-container" id="welcome-id-new">
           <div class="welcome-inner container" >
               <!-- Sol Taraf -->
               <div class="welcome-left">
                   <h1 class="welcome-title">
                       <span class="welcome-title-white d-none d-md-inline-block">${t.welcomeTitle1}</span>
                       <span class="welcome-title-orange d-none d-md-inline-block">${t.welcomeTitle2}</span>
                       <span class="d-md-none">${t.welcomeTitleMobile}</span>
                   </h1>
                   <div class="welcome-buttons">
                       <button class="register-button" id="register-button-custom" onclick="window.location.href='${langPrefix}/?modal=register'">${t.joinButton}</button>
                       
                       <div class="social-buttons">
                           <button class="social-button" onclick="window.location.href='https://t.me/+Ulf7jOKPbHxkZDU0'">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/5dem3a87LDfc2yxrqLSIrAtwkXxsSFVeTQoIuaN0.png" alt="Telegram" class="social-icon">
                           </button>
                           <button class="social-button" onclick="window.location.href='https://wa.me/447443980505'">
                               <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/M8VMfTguoljw6JoZgIhnnzbzX7y4WNFNDEgL8JiT.png" alt="WhatsApp" class="social-icon">
                           </button>
                       </div>
                   </div>
               </div>
               <!-- Sağ Taraf -->
               <div class="welcome-right">
                   <div class="game-box" onclick="window.location.href='${langPrefix}/casino'">
                           <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/CNoJNMFXM3Cx8DIlZfWp8k4tivm7kyNurPhF39UX.jpg" alt="${t.casinoTitle}" class="game-image">
                       <div class="game-title">${t.casinoTitle}</div>
                   </div>
                   
                   <div class="game-box sports" onclick="window.location.href='${langPrefix}/sportsbook'">
                           <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/VL9ihEJwiO6ndMzTUnbmWvLQKXk4iCSWeeCi0rU0.jpg" alt="${t.sportsTitle}" class="game-image">
                       <div class="game-title">${t.sportsTitle}</div>
                   </div>
               </div>
           </div>
       </div>
   `;


    // Payment Container
          const sliderBottom = `
              <div class="slider-bottom-container">
                  <div class="slider-bottom-grid">
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/casino/group/live-lobby'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/A5mm1VoGRciOn75iKVCg4DI4aivDPabFKkHwA0XQ.png" alt="Live Casino" class="slider-bottom-image">
                      </div>
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/vip'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/5DPopoH61Dj5fqZ5lmMM0gWZsXekd3EopM4KP6QO.png" alt="VIP Club" class="slider-bottom-image">
                      </div>
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/sportsbook'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/AoqGK76s6ZWSyg0H70D3meqrXIZdwYcNtSAmKsom.png" alt="Spor" class="slider-bottom-image">
                      </div>
                      <div class="slider-bottom-item" onclick="window.location.href='${langPrefix}/casino/'">
                          <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/EIpBfslRNFy6SBmrupvVsBFX2gdFHFaVBC8T3fAR.png" alt="Slot" class="slider-bottom-image">
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



       // Popular Sports Container
       const popularSportsContainer = `
           <div class="popular-sports-container">
               <div class="popular-sports-title-wrap">
                   <div class="popular-sports-title">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/lLBBAW7MKZbS0CcvPUpChhfne7MRjerqH8Z4oAcY.png" alt="Sports" style="width: 22px; height: 22px; margin-right: 2px; object-fit: contain;">
                       ${t.sportsTitle2}
                   </div>
                   <a href="${langPrefix}/sportsbook" class="popular-sports-link">${t.sportsAll}</a>
               </div>
               <div class="popular-sports-grid">
                   <a href="${langPrefix}/sportsbook/football" class="sport-box">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/dFD9U9Xbek8H290IHa4MGsE00iRU0ynCmtwHt7su.png" alt="${t.football}" class="sport-icon">
                       <div class="sport-name">${t.football}</div>
                   </a>
                   <a href="${langPrefix}/sportsbook/basketball" class="sport-box">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/nJogSTgWIl5y7TrYZVyBFYysfCe7HDziO1reLRQd.png" alt="${t.basketball}" class="sport-icon">
                       <div class="sport-name">${t.basketball}</div>
                   </a>
                   <a href="${langPrefix}/sportsbook/volleyball" class="sport-box">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/vlLTs3pmkIxkpmpAPKKaW1tWuiXux5tnmVNeKVDr.png" alt="${t.volleyball}" class="sport-icon">
                       <div class="sport-name">${t.volleyball}</div>
                   </a>
                   <a href="${langPrefix}/sportsbook/tennis" class="sport-box">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/ChO25ZvOKBZaJZiaYIwBvZHjqoteb9KXDAsiCdlu.png" alt="${t.tennis}" class="sport-icon">
                       <div class="sport-name">${t.tennis}</div>
                   </a>
                  
                   <a href="${langPrefix}/e-sport" class="sport-box">
                       <img src="https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/DNIIzoYr1VBTn7ssEz7dT5rMPccGSzWRusre04EK.png" alt="${t.esports}" class="sport-icon">
                       <div class="sport-name">${t.esports}</div>
                   </a>
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
      
      // İçeriği targetDiv'e ekle - jackpots container olmadan
      targetDiv.innerHTML = '<div class="container">' + welcomeContainer + sliderBottom + featuresContainer + sportBannerContainer + popularSportsContainer + '</div>';
      
      // Jackpots container'ı popularSportsContainer'dan ÖNCE taşı - daha uzun gecikme ile
      setTimeout(function() {
        // jackpotsContainer değişkeni zaten tanımlandı
        const popularSportsContainerElement = document.querySelector('.popular-sports-container');
        
        // Jackpots container'ı popularSportsContainer'dan ÖNCE ekle
        if (jackpotsContainer && popularSportsContainerElement && popularSportsContainerElement.parentNode) {
          // Jackpot container'ı popularSportsContainer'dan ÖNCE taşı
          popularSportsContainerElement.parentNode.insertBefore(jackpotsContainer, popularSportsContainerElement);
          
          // Jackpot container'ı görünür yap (sonra)
          setTimeout(function() {
            try {
              // CSS kuralını değiştir (kaldırmak yerine)
              const newStyle = document.createElement('style');
              newStyle.textContent = `
                #jackpots-container { 
                  display: block !important; 
                  opacity: 1 !important;
                  visibility: visible !important;
                  position: relative !important;
                  left: auto !important;
                }
                @media (max-width: 768px) {
                  #jackpots-container {
                    order: 4 !important;
                  }
                  .popular-sports-container {
                    order: 5 !important;
                  }
                  .container {
                    display: flex !important;
                    flex-direction: column !important;
                  }
                }
              `;
              
              // Eski stil elementini kaldır ve yenisini ekle
              if (styleElement && styleElement.parentNode) {
                document.head.removeChild(styleElement);
              }
              document.head.appendChild(newStyle);
              
              // Doğrudan display özelliğini ayarla
              if (jackpotsContainer) {
                jackpotsContainer.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; position: relative !important; left: auto !important;';
                console.log('Jackpot container görünür yapıldı:', jackpotsContainer);
              }
            } catch (e) {
              console.error('Jackpot görünür yapma hatası:', e);
            }
          }, 500);
        }
      }, 1500);

      // İçerik eklendikten sonra DOM'dan elementleri al
      const topGamesWrapper = document.getElementById('top-games-wrapper');
      const bannerswrapper = document.getElementById('banners-wrapper');

      // Elementler varsa topGamesWrapper'ı welcome-id-new'den sonra ekle
      if (topGamesWrapper && bannerswrapper && bannerswrapper.parentNode) {
        bannerswrapper.parentNode.insertBefore(topGamesWrapper, bannerswrapper.nextSibling);
      } else {
        console.warn('topGamesWrapper veya welcome-id-new bulunamadı.');
      }

      // Game box'ların tıklanabilir linklerini ayarla
      setupGameBoxes();
    } else {
      console.warn('banners-wrapper bulunamadı.');
    }
  }

  // Game box'ların tıklanabilir linklerini ayarla
  function setupGameBoxes() {
    const currentLang = getCurrentLanguage();
    const langPrefix = currentLang === 'en' ? '/en' : '/tr';
    
    // Casino ve Sports kutularını seç
    const casinoBox = document.querySelector('.welcome-right .game-box:first-child');
    const sportsBox = document.querySelector('.welcome-right .game-box.sports');
    
    // Casino kutusu için tıklama olayını ayarla
    if (casinoBox) {
      casinoBox.style.cursor = 'pointer';
      casinoBox.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = langPrefix + '/casino';
      });
    }
    
    // Sports kutusu için tıklama olayını ayarla
    if (sportsBox) {
      sportsBox.style.cursor = 'pointer';
      sportsBox.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = langPrefix + '/sportsbook';
      });
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

  // Sürekli kontrol eden interval - hiç durma
  function startContinuousCheck() {
    // Ana kontrol döngüsü - hiç durmasın
    const mainIntervalId = setInterval(function() {
      if (isHomePage()) {
        const targetDiv = document.getElementById("banners-wrapper");
        const welcomeContainer = document.getElementById("welcome-id-new");
        
        // Eğer banners-wrapper var ama welcome-container yoksa güncelle
        if (targetDiv && !welcomeContainer) {
          updatePageContent();
        }
        
        // Main slider görünürse tekrar gizle
        const mainSlider = document.getElementById("main-slider");
        if (mainSlider && mainSlider.style.display !== 'none') {
          mainSlider.style.display = 'none';
          mainSlider.innerHTML = '';
        }
      }
    }, 300); // Her 300ms kontrol et
    
    // Hızlı kontrol döngüsü - ilk 10 saniye için
    let quickCheckCount = 0;
    const quickIntervalId = setInterval(function() {
      quickCheckCount++;
      
      if (quickCheckCount > 100) { // 10 saniye sonra durdur
        clearInterval(quickIntervalId);
        return;
      }
      
      if (isHomePage()) {
        const targetDiv = document.getElementById("banners-wrapper");
        const welcomeContainer = document.getElementById("welcome-id-new");
        
        if (targetDiv && !welcomeContainer) {
          updatePageContent();
        }
      }
    }, 100); // Her 100ms kontrol et
  }

  // Sayfa yüklendiğinde ve URL değiştiğinde içeriği güncelle
  function initializePageUpdater() {
    // Hemen çalıştır
    superForceUpdate();

    // Sürekli kontrol başlat
    startContinuousCheck();

    // URL değişikliklerini izle
    let lastUrl = location.href; 
    
    // MutationObserver ile DOM değişikliklerini izle - çok agresif
    const observer = new MutationObserver(function(mutations) {
      // URL değişti mi kontrol et
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        superForceUpdate();
      }
      
      // Her DOM değişikliğinde kontrol et
      if (isHomePage()) {
        const welcomeContainer = document.getElementById("welcome-id-new");
        if (!welcomeContainer) {
          updatePageContent();
        }
      }
    });
    
    // Tüm document'i izle
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    });
    
    // Her olası event'i dinle - hiçbirini kaçırma
    const allEvents = [
      'popstate', 'hashchange', 'load', 'pageshow', 'pagehide',
      'focus', 'blur', 'visibilitychange', 'storage',
      'beforeunload', 'unload', 'resize', 'scroll'
    ];
    
    allEvents.forEach(function(eventName) {
      window.addEventListener(eventName, function(e) {
        setTimeout(() => {
          if (isHomePage()) {
            const welcomeContainer = document.getElementById("welcome-id-new");
            if (!welcomeContainer) {
              updatePageContent();
            }
          }
        }, 10);
      }, true); // Capture phase'de yakala
    });

    // Document event'leri
    const docEvents = ['DOMContentLoaded', 'readystatechange'];
    docEvents.forEach(function(eventName) {
      document.addEventListener(eventName, function() {
        superForceUpdate();
      });
    });

    // Mobil için ek event'ler - çok agresif
    if (isMobile()) {
      const mobileEvents = [
        'touchstart', 'touchend', 'touchmove', 'touchcancel',
        'gesturestart', 'gesturechange', 'gestureend',
        'orientationchange', 'deviceorientation', 'devicemotion'
      ];
      
      mobileEvents.forEach(function(eventName) {
        document.addEventListener(eventName, function() {
          if (isHomePage()) {
            const welcomeContainer = document.getElementById("welcome-id-new");
            if (!welcomeContainer) {
              setTimeout(updatePageContent, 10);
            }
          }
        }, { passive: true });
      });
    }

    // Her saniye kontrol et - backup sistem
    setInterval(function() {
      if (isHomePage()) {
        const welcomeContainer = document.getElementById("welcome-id-new");
        if (!welcomeContainer) {
          updatePageContent();
        }
      }
    }, 1000);
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