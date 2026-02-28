# ⚽ Futbol Sekmesi

Modern ve responsive futbol ligleri sekmesi. Verdiğiniz referans kodları kullanarak geliştirilmiştir.

## 📁 Dosyalar

- `futbol_sekmesi.css` - Ana stil dosyası
- `futbol_sekmesi.js` - JavaScript functionality
- `test.html` - Test ve demo sayfası
- `README.md` - Dokümantasyon

## 🚀 Kullanım

### Hızlı Başlangıç

```html
<!-- CSS dosyasını dahil et -->
<link rel="stylesheet" href="futbol_sekmesi/futbol_sekmesi.css">

<!-- JavaScript dosyasını dahil et -->
<script src="futbol_sekmesi/futbol_sekmesi.js"></script>

<!-- Opsiyonel: Belirli bir container belirt -->
<div class="futbol-sekme-target"></div>
```

### Manuel Başlatma

```javascript
// Manuel olarak başlat
const futbolSekmesi = new FutbolSekmesi();

// Yenile
futbolSekmesi.refresh();

// Kaldır
futbolSekmesi.destroy();
```

## 🎨 Özellikler

### ✅ Responsive Tasarım
- Mobil, tablet ve desktop uyumlu
- Grid sistemi otomatik ayarlanır
- Farklı ekran boyutları için optimize

### ✅ Liga Desteği
- 🇩🇪 Bundesliga
- 🇪🇸 La Liga  
- 🏴󐁧󐁢󐁥󐁮󐁧󐁿 Premier League
- 🇮🇹 Serie A
- 🇹🇷 Süper Lig

### ✅ İnteraktif Özellikler
- Hover efektleri
- Tıklama animasyonları
- Loading states
- Error handling

### ✅ Gelişmiş Özellikler
- Analytics entegrasyonu
- Dark mode desteği
- Resim yükleme kontrolü
- Fallback ikonları

## 🎯 Konfigürasyon

### Liga Verilerini Güncelleme

```javascript
const yeniLigaVerileri = [
    {
        id: 'yeni-lig',
        title: 'Yeni Lig',
        url: 'https://example.com',
        image: 'https://example.com/image.jpg',
        className: 'yeni-lig-class'
    }
];

futbolSekmesi.updateLeagueData(yeniLigaVerileri);
```

### CSS Özelleştirme

```css
/* Kendi renklerinizi ekleyin */
.futbol-banner-info.ozel-lig {
    background: linear-gradient(135deg, #your-color 0%, #your-color2 100%);
    color: white;
}

/* Container boyutunu ayarlayın */
.futbol-banner-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
```

## 📱 Responsive Breakpointleri

- **Desktop**: > 768px - 5 kolon grid
- **Tablet**: 480px - 768px - Flexibile grid  
- **Mobile**: < 480px - 2 kolon grid

## 🔧 API Metodları

| Metod | Açıklama |
|-------|----------|
| `new FutbolSekmesi()` | Yeni instance oluştur |
| `refresh()` | Sekmesi yenile |
| `destroy()` | Sekmesi kaldır |
| `updateLeagueData(data)` | Liga verilerini güncelle |

## 🎪 Test Etme

`test.html` dosyasını tarayıcıda açarak tüm özellikleri test edebilirsiniz:

```bash
# Klasöre git
cd futbol_sekmesi

# Test sayfasını aç
open test.html
```

## 🛠️ Geliştirme

### Yeni Liga Ekleme

1. JavaScript'te `futbolData` array'ine yeni liga ekle
2. CSS'te yeni liga için stil tanımla
3. Test sayfasında kontrol et

### Stil Özelleştirme

Tüm CSS değişkenleri `:root` seviyesinde tanımlanabilir:

```css
:root {
    --futbol-primary-color: #007bff;
    --futbol-hover-scale: 1.05;
    --futbol-transition-duration: 0.3s;
}
```

## 🐛 Sorun Giderme

### Resimler Yüklenmiyor
- Network sekmesinde resim URL'lerini kontrol edin
- CORS politikalarını kontrol edin
- Fallback ikonları otomatik devreye girer

### JavaScript Hataları
- Konsolu kontrol edin
- CSS dosyasının doğru yüklendiğinden emin olun
- Modern tarayıcı kullandığınızdan emin olun

### Responsive Problemleri
- Viewport meta tag'ini kontrol edin
- CSS Grid desteğini kontrol edin
- Flexbox fallback'leri mevcut

## 📄 Lisans

Bu proje JOJOVA CSS Framework'ün bir parçasıdır.

## 🤝 Katkıda Bulunma

1. Yeni özellik geliştirin
2. Test edin
3. Dokümante edin
4. Pull request oluşturun

---

**Geliştirici Notları:**
- Verdiğiniz referans kodlar tam olarak adapt edildi
- Modern JavaScript (ES6+) kullanıldı
- Cross-browser uyumluluk sağlandı
- Performance optimizasyonları yapıldı
