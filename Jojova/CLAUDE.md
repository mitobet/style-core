# JOJOVA CSS Projesi - External Site Injection

## Proje Tanımı
Bu proje **hazır bir siteye dışarıdan CSS/JS injection** yaparak özelleştirme yapmaktadır.

### Teknik Yaklaşım
- **CSS Override**: Mevcut site CSS'ini ezerek yeni stiller uygulama
- **JavaScript Injection**: DOM manipülasyonu ile yeni bölümler ekleme/gizleme
- **External Customization**: Site kaynak koduna erişim olmadan değişiklik yapma

---

## 1. GENEL_STYLE (Ana Slider & Container)

### Renk Sistemi
- **Primary Colors**: `#ffc100`, `#FFD700`, `#FFA500`
- **Pagination**: `rgba(255, 255, 255, 0.5)` → `#ffc107` (active)
- **Shadows**: `rgba(0, 0, 0, 0.2)`, `rgba(255, 215, 0, 0.15)`
- **Gradients**: `linear-gradient(135deg, #FFD700 0%, #FFA500 100%)`

### Responsive Breakpoints
- **Desktop**: `min-width: 641px` - aspect-ratio 3.73/1, max-height 500px
- **Mobile**: `max-width: 640px` - aspect-ratio 300/386, height 400px
- **Tablet**: `max-width: 768px` - min-height 250px, max-height 350px

### Key Features
- **Swiper.js Integration**: CDN'den yükleme (`swiper@10`)
- **Dual Slider System**: `.main-slider` (desktop) / `.mobile-slider` (mobile)
- **Auto-hide Elements**: `#main-slider`, `#jackpots-container`, `.vip`
- **DOM Targets**: `#banners-wrapper`, `.swiper-pagination`

### Injection Patterns
```javascript
// CSS yükleme
const swiperCSS = document.createElement('link');
swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css';

// Element gizleme
element.style.cssText = 'display: none !important; opacity: 0 !important;';
```

---

## 2. SIDEBAR (Menu Reordering)

### Target Elements
- **Main**: `.sidebar__big`, `.sidebar__links`, `.sidebar__menu`
- **Accordion**: `.sidebar__collapsed` buttons
- **Navigation**: `.sidebar__nav a`, `.sidebar__nav button`

### Color Scheme
- **Hover Background**: `rgba(255, 255, 255, 0.06)` (dark) / `rgba(0, 0, 0, 0.04)` (light)
- **Border Colors**: `rgba(255, 215, 0, 0.2)` → `rgba(255, 215, 0, 0.4)` (hover)
- **Active State**: `var(--tf-active)` (golden)
- **Icons**: `var(--tf-tc2)` → `var(--tf-tc)` (hover)

### Functionality
- **Login Detection**: `allLinks.length >= 2 && bonusTalepLinks`
- **Menu Reordering**: Sportsbook → Casino → Favorites → VIP → Trade → Tournaments
- **Telegram Injection**: `<a href="https://t.me/+2qnwpVnMbs1hYTQ0">`
- **Casino Redirect**: `/tr/casino` → `/tr/casino/group/lobby`

### Performance
- **Multiple Attempts**: 100ms, 500ms, 1000ms, 2000ms, 3000ms, 5000ms
- **MutationObserver**: Body subtree monitoring
- **Interval Check**: Her 1000ms, 20 saniye boyunca

---

## 3. HEADER (Auth Buttons)

### Button Styles
**Signin Button:**
- **Desktop**: 46px height, transparent bg, golden border
- **Mobile**: 50x50px icon-only, gizli text
- **Colors**: `rgba(255, 215, 0, 0.2)` border → `rgba(255, 215, 0, 0.4)` hover

**Signup Button:**
- **Background**: `linear-gradient(135deg, #FFD700 0%, #FFA500 100%)`
- **Text Color**: `#000000`
- **Shadow**: `0 4px 15px rgba(255, 215, 0, 0.3)`
- **Glow Effect**: `filter: blur(8px)` after pseudo-element

### Animations
- **pulseGlow**: 2s infinite ease-in-out
- **iconBounce**: 2.5s infinite, translateY(-2px) scale(1.02)
- **Shine Effect**: Linear-gradient slide on hover

### Icon System
- **Mask Method**: `mask: url('svg-path') no-repeat center`
- **Data-URI**: Mobile için `background-image: url('data:image/svg+xml...')`
- **Sizes**: 24px (desktop), 20px (mobile)

---

## 4. FUTBOL_SEKMESI (Football Leagues)

### Layout System
- **CSS Grid**: `grid-template-columns: repeat(5, 1fr)`
- **Gaps**: 10px (desktop) → 6px (tablet) → 4px (mobile)
- **Border-radius**: 15px → 12px → 10px (responsive)

### Color Palette
- **Border**: `#F9C636`, `#FFD700`
- **Gradient**: `linear-gradient(45deg, #F9C636, #FFD700, #FFA500, #F9C636)`
- **Hover Shadows**: `rgba(249, 198, 54, 0.5)`, `rgba(255, 215, 0, 0.4)`
- **3D Effect**: `opacity: 0.25`, `filter: grayscale(70%) blur(2px)`

### Dark/Light Mode
```css
@media (prefers-color-scheme: dark) {
    .futbol-banner-info {
        border: 2px solid #F9C636;
        box-shadow: 0 4px 15px rgba(249, 198, 54, 0.3);
    }
}
```

### Responsive Maintenance
- **5 Columns**: Tüm breakpoint'lerde korunuyor
- **3D Focus**: Hover'da diğerleri fade (opacity: 0.25-0.5)
- **Transform**: `translateY(-3px) scale(1.03)` hover

---

## 5. ORTAK ÖZELLİKLER (Cross-Component)

### Performance Patterns
- **MutationObserver**: `document.body` subtree monitoring
- **Interval Checks**: 100ms-5000ms arası çoklu deneme
- **CSS Caching**: ID'li style tag'ler (`#custom-perm-styles`)
- **Debounce**: Resize event'leri için 250ms

### Injection Methods
```javascript
// 1. CSS Injection
const style = document.createElement('style');
style.id = 'unique-id';
document.head.appendChild(style);

// 2. Style Override
element.style.cssText = 'property: value !important;';

// 3. HTML Replacement
targetDiv.innerHTML = newContent;

// 4. Event Replacement
button.replaceWith(button.cloneNode(true));
```

### Anti-Detection Strategies
- **Multiple Timeout Attempts**: Farklı gecikme süreleri
- **Event Listener Replacement**: Eski event'leri temizle
- **Aggressive Style Enforcement**: Sürekli stil kontrolü
- **DOM State Monitoring**: Sürekli element varlık kontrolü

### CSS Specificity Hierarchy
1. `!important` declarations
2. ID selectors ile yüksek specificity
3. Multiple class combinations
4. Inline style override

Bu yapı **external site customization** için optimize edilmiş sistemdir.