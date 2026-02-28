# Genel Style Modülleri

Bu klasörde yer alan CSS dosyaları, orijinal `style.css` dosyasının bölümlere ayrılmış halidir. Her dosya mevcut kodların aynen korunduğu modüler yapıdadır.

## 📁 Dosya Yapısı

### 🎯 Ana Modüller
- **`welcome-container.css`** - Welcome container ve game box stilleri
- **`payment-container.css`** - Payment container ve coin image stilleri
- **`features-container.css`** - Features container stilleri
- **`originals-container.css`** - Originals container stilleri
- **`popular-sports.css`** - Popular sports container stilleri
- **`background-effects.css`** - Background glow efektleri
- **`sport-banner.css`** - Sport banner container stilleri
- **`banner-slider.css`** - Banner slider stilleri
- **`tables-tabs.css`** - Table ve tab stilleri
- **`mobile-responsive.css`** - Tüm mobil responsive kuralları
- **`slider-bottom.css`** - Slider bottom container stilleri
- **`swiper-slider.css`** - Swiper slider stilleri (Desktop & Mobile)

### 🚀 Kullanım

Her CSS dosyası bağımsız olarak HTML'e dahil edilebilir:

```html
<!-- Welcome Container -->
<link rel="stylesheet" href="Genel_Style/welcome-container.css">

<!-- Payment Container -->
<link rel="stylesheet" href="Genel_Style/payment-container.css">

<!-- Features Container -->
<link rel="stylesheet" href="Genel_Style/features-container.css">

<!-- Swiper Slider -->
<link rel="stylesheet" href="Genel_Style/swiper-slider.css">

<!-- Mobile Responsive -->
<link rel="stylesheet" href="Genel_Style/mobile-responsive.css">

<!-- Diğer modüller... -->
```

### 📄 Notlar

- Her modül orijinal CSS'den aynen alınmıştır
- Hiçbir stil değiştirilmemiştir
- Sadece bölümlere ayrılmıştır
- Production ortamında birleştirilerek kullanılabilir

### 🚀 Live Deployment

Her dosya ayrı ayrı CDN'e yüklenebilir:

```html
<link rel="stylesheet" href="https://your-cdn.com/genel-style/welcome-container.css">
<link rel="stylesheet" href="https://your-cdn.com/genel-style/payment-container.css">
<!-- diğer modüller... -->
```