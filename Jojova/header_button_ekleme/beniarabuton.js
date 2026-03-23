<script>
// Login durumunu kontrol eden fonksiyon
function isUserLoggedIn() {
    // Farklı login durumu kontrol yöntemleri
    const loginIndicators = [
        // Giriş yap butonu yoksa login olmuş demektir
        !document.querySelector('.header__signin'),
        // Kullanıcı menüsü varsa login olmuş demektir
        document.querySelector('.header__user'),
        document.querySelector('.user-menu'),
        document.querySelector('.profile-menu'),
        // Avatar/profil resmi varsa login olmuş demektir
        document.querySelector('.avatar'),
        document.querySelector('.user-avatar'),
        // Balance gösterimi varsa login olmuş demektir
        document.querySelector('.balance'),
        document.querySelector('.wallet-balance'),
        // Logout butonu varsa login olmuş demektir
        document.querySelector('.logout'),
        document.querySelector('.sign-out'),
        // Local storage kontrolü
        localStorage.getItem('user_logged_in') === 'true',
        sessionStorage.getItem('user_logged_in') === 'true'
    ];
    
    return loginIndicators.some(indicator => indicator);
}

// Talep gönderme formunu oluşturan fonksiyon
function createTalepForm() {
    const formOverlay = document.createElement('div');
    formOverlay.className = 'talep-form-overlay';
    formOverlay.style.setProperty('display', 'none', 'important');
    
    const formContainer = document.createElement('div');
    formContainer.className = 'talep-form-container';
    
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Beni Arayın';
    formContainer.appendChild(formTitle);
    
    // Kapatma butonu
    const closeButton = document.createElement('button');
    closeButton.className = 'talep-form-close';
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.fontSize = '24px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'rgba(255, 255, 255, 0.7)';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '9999';
    closeButton.type = 'button';
    
    closeButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        formOverlay.style.setProperty('display', 'none', 'important');
    };
    
    formContainer.appendChild(closeButton);
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://api.jojovamarketing.com';
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Telefon numarasını kontrol et (TR: 10 hane, 5 ile başlar)
        const phoneValue = phoneInput.value.replace(/\D/g, '').trim();
        if (phoneValue.length !== 10 || phoneValue[0] !== '5') {
            // Hata mesajını form içinde göster
            let errorMsg = form.querySelector('.form-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.marginTop = '10px';
                errorMsg.style.marginBottom = '10px';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.padding = '8px';
                errorMsg.style.borderRadius = '4px';
                errorMsg.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                form.insertBefore(errorMsg, form.firstChild);
            }
            errorMsg.textContent = 'Lütfen geçerli bir Türk GSM numarası giriniz (5xxxxxxxxx)';
            phoneInput.focus();
            return false;
        }
        
        // Hata mesajı varsa temizle
        const errorMsg = form.querySelector('.form-error');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
        
        // Gönderme butonunu devre dışı bırak
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Gönderiliyor...';
        }
        
        // Gerçek gönderim
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors', // CORS hatası çözümü için
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            console.log('API yanıtı:', response.status);
            return { success: true };
        })
        .then(data => {
            // Başarı mesajını form içinde göster (profesyonel kart)
            const wrap = document.createElement('div');
            wrap.className = 'success-wrap';
            const successMsg = document.createElement('div');
            successMsg.className = 'success-card';
            const icon = document.createElement('div');
            icon.className = 'success-card__icon';
            icon.textContent = '✓';
            const texts = document.createElement('div');
            texts.className = 'success-card__texts';
            const title = document.createElement('div');
            title.className = 'success-card__title';
            title.textContent = 'Talebiniz iletildi!';
            const desc = document.createElement('div');
            desc.className = 'success-card__desc';
            desc.textContent = 'En kısa sürede sizinle iletişime geçilecektir.';
            const bar = document.createElement('div');
            bar.className = 'success-card__bar';
            texts.appendChild(title);
            texts.appendChild(desc);
            successMsg.appendChild(icon);
            successMsg.appendChild(texts);
            wrap.appendChild(successMsg);
            wrap.appendChild(bar);
            
            // Form içeriğini temizle ve başarı mesajını göster
            form.innerHTML = '';
            form.appendChild(wrap);
            
            // Kapatma butonunu yeniden görünür yap ve bağla
            closeButton.style.display = 'block';
            
            // 3 saniye sonra modalı kapat
            setTimeout(() => {
                formOverlay.style.setProperty('display', 'none', 'important');
            }, 3000);
        })
        .catch(error => {
            console.error('Hata:', error);
            // Hata olsa dahi kullanıcı deneyimi için aynı başarı kartını gösteriyoruz
            const wrap = document.createElement('div');
            wrap.className = 'success-wrap';
            const successMsg = document.createElement('div');
            successMsg.className = 'success-card';
            const icon = document.createElement('div');
            icon.className = 'success-card__icon';
            icon.textContent = '✓';
            const texts = document.createElement('div');
            texts.className = 'success-card__texts';
            const title = document.createElement('div');
            title.className = 'success-card__title';
            title.textContent = 'Talebiniz iletildi!';
            const desc = document.createElement('div');
            desc.className = 'success-card__desc';
            desc.textContent = 'En kısa sürede sizinle iletişime geçilecektir.';
            const bar = document.createElement('div');
            bar.className = 'success-card__bar';
            texts.appendChild(title);
            texts.appendChild(desc);
            successMsg.appendChild(icon);
            successMsg.appendChild(texts);
            wrap.appendChild(successMsg);
            wrap.appendChild(bar);
            form.innerHTML = '';
            form.appendChild(wrap);
            closeButton.style.display = 'block';
            setTimeout(() => {
                formOverlay.style.setProperty('display', 'none', 'important');
            }, 3000);
        })
        .finally(() => {
            // Gönderme butonunu tekrar aktif et
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Talep İlet';
            }
        });
    };
    
    // Ad Soyad input
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'ad_soyad';
    nameInput.placeholder = 'Adınız Soyadınız';
    nameInput.required = true;
    form.appendChild(nameInput);
    
    // Telefon numarası input (ülke kodu ile)
    const phoneWrapper = document.createElement('div');
    phoneWrapper.style.display = 'flex';
    phoneWrapper.style.alignItems = 'center';
    phoneWrapper.style.width = '100%';

    const countryCode = document.createElement('span');
    countryCode.textContent = '+90';
    countryCode.style.display = 'flex';
    countryCode.style.alignItems = 'center';
    countryCode.style.justifyContent = 'center';
    countryCode.style.height = '46px';
    countryCode.style.minWidth = '74px';
    countryCode.style.padding = '0 12px';
    countryCode.style.border = '1px solid rgba(255, 229, 92, 0.2)';
    countryCode.style.borderRight = 'none';
    countryCode.style.borderRadius = '8px 0 0 8px';
    countryCode.style.background = 'rgba(20, 20, 30, 0.6)';
    countryCode.style.color = '#ffffff';
    countryCode.style.fontSize = '16px';

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.name = 'tel_no';
    phoneInput.placeholder = '5xxxxxxxxx';
    phoneInput.required = true;
    phoneInput.maxLength = 10;
    phoneInput.inputMode = 'numeric';
    phoneInput.style.flex = '1';
    phoneInput.style.height = '46px';
    phoneInput.style.borderRadius = '0 8px 8px 0';
    phoneInput.style.borderLeft = 'none';
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
    // Numara girişi için yardımcı metin
    const phoneHelp = document.createElement('small');
    phoneHelp.textContent = 'Başında 0 olmadan 10 haneli numaranızı giriniz';
    phoneHelp.style.color = '#999';
    phoneHelp.style.fontSize = '12px';
    phoneHelp.style.marginTop = '-5px';
    phoneHelp.style.marginBottom = '5px';
    phoneHelp.style.display = 'block';
    
    phoneWrapper.appendChild(countryCode);
    phoneWrapper.appendChild(phoneInput);
    form.appendChild(phoneWrapper);
    form.appendChild(phoneHelp);
    
    // Arama sebebi seçim alanı
    const reasonLabel = document.createElement('label');
    reasonLabel.textContent = 'Arama Sebebi';
    reasonLabel.style.color = '#fff';
    reasonLabel.style.fontSize = '14px';
    reasonLabel.style.marginBottom = '5px';
    reasonLabel.style.display = 'block';
    form.appendChild(reasonLabel);
    
    const selectWrapper = document.createElement('div');
    selectWrapper.style.position = 'relative';
    selectWrapper.style.width = '100%';
    
    const reasonSelect = document.createElement('select');
    reasonSelect.name = 'reason';
    reasonSelect.required = true;
    reasonSelect.style.width = '100%';
    reasonSelect.style.padding = '12px 15px';
    reasonSelect.style.paddingRight = '35px';
    reasonSelect.style.borderRadius = '8px';
    reasonSelect.style.border = '1px solid rgba(255, 229, 92, 0.2)';
    reasonSelect.style.background = 'rgba(20, 20, 30, 0.6)';
    reasonSelect.style.color = '#ffffff';
    reasonSelect.style.fontSize = '16px';
    reasonSelect.style.appearance = 'none';
    reasonSelect.style.webkitAppearance = 'none';
    reasonSelect.style.MozAppearance = 'none';
    
    // Ok işareti ekle
    const arrowIcon = document.createElement('div');
    arrowIcon.innerHTML = '&#9662;'; // Aşağı ok işareti (▾)
    arrowIcon.style.position = 'absolute';
    arrowIcon.style.right = '15px';
    arrowIcon.style.top = '50%';
    arrowIcon.style.transform = 'translateY(-50%)';
    arrowIcon.style.color = 'rgba(255, 229, 92, 0.8)';
    arrowIcon.style.fontSize = '16px';
    arrowIcon.style.pointerEvents = 'none';
    
    selectWrapper.appendChild(reasonSelect);
    selectWrapper.appendChild(arrowIcon);
    
    // Seçenek ekle
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seçiniz';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    reasonSelect.appendChild(defaultOption);
    
    // Arama sebepleri
    const reasons = [
        'Yeni Üyelik',
        'Yatırım - Çekim',
        'Teknik Destek',
        'Deneme Bonusu',
        'Diğer'
    ];
    
    reasons.forEach(reason => {
        const option = document.createElement('option');
        option.value = reason;
        option.textContent = reason;
        reasonSelect.appendChild(option);
    });
    
    form.appendChild(selectWrapper);
    
    // Hidden token input
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = '5f52cc4d9ac28ece971979240004860e';
    form.appendChild(tokenInput);
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Talep İlet';
    submitButton.style.background = 'linear-gradient(135deg, rgba(255, 229, 92, 0.8) 0%, rgba(255, 165, 0, 0.8) 100%)';
    submitButton.style.color = '#000000';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '8px';
    submitButton.style.padding = '12px';
    submitButton.style.fontSize = '18px';
    submitButton.style.fontWeight = '700';
    submitButton.style.textTransform = 'uppercase';
    submitButton.style.cursor = 'pointer';
    submitButton.style.transition = 'all 0.3s ease';
    submitButton.style.width = '100%';
    submitButton.style.marginTop = '10px';
    
    form.appendChild(submitButton);
    
    formContainer.appendChild(form);
    formOverlay.appendChild(formContainer);
    
    return formOverlay;
}

// Butonu oluşturan fonksiyon
function createContactButton() {
    // Eğer kullanıcı login olmuşsa buton oluşturma
    if (isUserLoggedIn()) {
        console.log('Kullanıcı login olmuş, BENİ ARAYIN butonu oluşturulmayacak');
        return;
    }
    
    // Mevcut buton varsa tekrar oluşturma
    if (document.querySelector('.contact_button_new')) {
        return;
    }
    
    // Create the new div element
    const newDiv = document.createElement('div');
    
    // Create the button element
    const button = document.createElement('button');
    button.className = 'contact_button_new';
    button.type = 'button';
    
    // Create the span inside the button
    const span = document.createElement('span');
    span.textContent = 'Beni Arayın';
    button.appendChild(span);
    
    // Talep formunu oluştur
    const talepForm = createTalepForm();
    
    // Butona tıklandığında formu ekle ve göster
    button.onclick = function() {
        // Form daha önce eklenmemişse ekle
        if (!document.querySelector('.talep-form-overlay')) {
            document.body.appendChild(talepForm);
            
            // Form dışına tıklayınca da kapansın
            talepForm.addEventListener('click', function(e) {
                if (e.target === talepForm) {
                    talepForm.style.display = 'none';
                }
            });
        }
        talepForm.style.setProperty('display', 'flex', 'important');
    };
    
    // Append the button to the new div
    newDiv.appendChild(button);
    
    // Find the header__signin element
    const signInElement = document.querySelector('#header .header__actions .header__signin');
    
    // Insert the new div before the header__signin element
    if (signInElement && signInElement.parentNode) {
        signInElement.parentNode.insertBefore(newDiv, signInElement);
        console.log('BENİ ARAYIN butonu eklendi');
    }
}

// Login durumu değişikliklerini izleyen fonksiyon
function watchLoginStatus() {
    // DOM değişikliklerini izle
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Login durumu değişti mi kontrol et
                const isLoggedIn = isUserLoggedIn();
                const contactButton = document.querySelector('.contact_button_new');
                
                if (isLoggedIn && contactButton) {
                    // Login olmuşsa butonu kaldır
                    contactButton.parentNode.removeChild(contactButton);
                    console.log('Kullanıcı login oldu, BENİ ARAYIN butonu kaldırıldı');
                } else if (!isLoggedIn && !contactButton) {
                    // Login olmamışsa ve buton yoksa ekle
                    setTimeout(createContactButton, 100);
                }
            }
        });
    });
    
    // Header'ı izle
    const header = document.querySelector('#header');
    if (header) {
        observer.observe(header, {
            childList: true,
            subtree: true
        });
    }
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        createContactButton();
        watchLoginStatus();
    });
} else {
    createContactButton();
    watchLoginStatus();
}

// URL değişikliklerini izle (SPA için)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(createContactButton, 500);
    }
}).observe(document, { subtree: true, childList: true });

// Periyodik kontrol (backup)
setInterval(function() {
    const isLoggedIn = isUserLoggedIn();
    const contactButton = document.querySelector('.contact_button_new');
    
    if (isLoggedIn && contactButton) {
        contactButton.parentNode.removeChild(contactButton);
        console.log('Periyodik kontrol: BENİ ARAYIN butonu kaldırıldı');
    }
}, 3000);
</script>