// Mobil görünümde giriş butonunu düzenleyen script
document.addEventListener('DOMContentLoaded', function() {
  // Mobil cihaz kontrolü
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Giriş butonunu güncelleme fonksiyonu
  function updateLoginButton() {
    const signinButton = document.querySelector('.header__signin');
    
    if (signinButton) {
      // Eğer span elementi yoksa oluştur
      if (!signinButton.querySelector('span')) {
        const spanElement = document.createElement('span');
        spanElement.textContent = 'Giriş Yap';
        signinButton.appendChild(spanElement);
      } else {
        // Span elementi varsa içeriğini güncelle
        const spanElement = signinButton.querySelector('span');
        spanElement.textContent = 'Giriş Yap';
        
        // Mobil görünümde görünür yap
        if (isMobile()) {
          spanElement.style.display = 'inline-block';
        }
      }
    }
  }

  // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çalıştır
  updateLoginButton();
  window.addEventListener('resize', updateLoginButton);
}); 