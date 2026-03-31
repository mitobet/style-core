# Mitobet Versiyon Gecmisi

## v1.9.1 - Kampanya bitis tarihi 2027 sonuna uzatildi (2026-03-31)
**Aciklama:** v1.9.0’da bitis `2026-03-31T20:00+03:00` idi; sure dolunca popup hic acilmiyordu. Varsayilan bitis `2027-12-31T23:59:59+03:00` yapildi; gercek kampanya icin `CAMPAIGN_PROMO_END_MS` iki dosyada guncellenmeli.

---

## v1.9.0 - Kampanya TRT bitis (popup + ilk story) (2026-03-31)
**Hash:** `6b39499`
**Aciklama:** PNG popup ve en bastaki story (`RAW_IMG_FIRST`) 31 Mart 2026 TRT 20:00 (`+03:00`) sonrasi otomatik kaldirilir. Acik popup sure dolunca kapanir; story cubugundan ilk avatar DOM'dan silinir, modal aciksa indeks uyumu. Bitis zamani `CAMPAIGN_PROMO_END_MS` — `popup.js` ve `stories_loader.js` senkron tutulmali.
**Degisiklikler:**
- ~ `popup.js`: `isCampaignPromoActive`, `showPopup` guard, acik popup icin `setTimeout(closePopup)`
- ~ `stories_loader.js`: `STORIES_FULL`, `rebuildStoriesArray`, `scheduleCampaignPromoEnd`, `onCampaignPromoEnd`
**CMS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@6b39499/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@6b39499/dist/v1/bundle.js"></script>
```

---

## Not - Yarim Kalan / Unstable Calisma (2026-03-24)
**Hash:** `8d3cea9`
**Durum:** Aktif degil (referans kaydi)
**Not:** Bu surum optimize edilmemis story akisiyla test edildi ve sahada crash raporu alindi. Stabil hat olarak `8bca4fc` tercih edildi.
**CMS (referans):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@8d3cea9/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@8d3cea9/dist/v1/bundle.js"></script>
```

---

## v1.8.2 - SPA navigasyon sonrasi stories (2026-03-24)
**Hash:** `f268ae0`
**Aciklama:** SPA'da sayfa degisince stories widget'i kayboluyordu. history.pushState/replaceState override + popstate ile her navigasyonda anasayfaya donerken widget yeniden insert ediliyor.
**Degisiklikler:**
- ~ `stories_loader.js`: handleNav() + history override eklendi
**CMS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@f268ae0/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@f268ae0/dist/v1/bundle.js"></script>
```

---

## v1.8.1 - Stories sadece anasayfa (2026-03-24)
**Hash:** `e035ebe`
**Aciklama:** Stories widget sadece mobil anasayfada gorunur. Diger sayfalarda (promosyon, casino, vb.) yuklenmez.
**Degisiklikler:**
- ~ `stories_loader.js`: boot() fonksiyonuna path kontrolu eklendi — `/`, `/tr`, `/en` disindaki sayfalarda erken return
**CMS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@e035ebe/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@e035ebe/dist/v1/bundle.js"></script>
```

---

## v1.8.0 - Custom stories engine (2026-03-24)
**Hash:** `5f3b29c`
**Aciklama:** Zuck.js tamamen kaldirildi. Sifirdan saf JS + CSS stories motoru yazildi. Hicbir harici CDN, history API veya MutationObserver yok. Touch + mouse swipe destegi, gold gradient Detaylar butonu, pulse animasyon, progress bar.
**Dosyalar:** stories_loader.js, stories_override.css, dist/v1/bundle.js, bundle.css
**Degisiklikler:**
- - Zuck.js (unpkg CDN, backNative history hook, external CSS): tamamen kaldirildi
- + Custom stories IIFE: avatar thumbnails, fullscreen modal, progress bar, tap zones, swipe (touch + mouse), auto-advance
- + Detaylar butonu: gold gradient + yukari ok SVG + pulse animasyon
- + swipeGuard: drag sonrasi tap zone click bastirma
**CMS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@5f3b29c/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@5f3b29c/dist/v1/bundle.js"></script>
```

---

## v1.7.0 - Code 5 crash stabilization (2026-03-24)
**Hash:** `055f11f`
**Aciklama:** Renderer crash (Hata kodu 5) riskini azaltmak icin story kapanisi yumusatildi, observer debounce, popup/story mutual exclusion, kapali zuck-modal pointer-events kapali, cubeEffect kapali.
**Dosyalar:** 21 CSS, 9 JS (bundle; `stories_loader.js` / `stories_override.css` yerelde .gitignore)
**Degisiklikler:**
- ~ `stories_loader.js` (bundle): native close + soft hide (removeChild yok), debounced `syncModalUi`, tek Zuck boot, popup overlay varken init erteleme
- ~ `popup.js`: story acikken popup bekleme (retry cap)
- ~ `stories_override.css` (bundle): `#zuck-modal:not(.show)` pointer-events none
**CMS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@055f11f/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@055f11f/dist/v1/bundle.js"></script>
```

---

## v1.5.0 - Popup statik JPG + dinamik link (2026-03-24)
**Hash:** `05e417b`
**Aciklama:** Popup gorseli statik JPG ile degistirildi (crash onleme). Link dinamik hale getirildi (window.location.origin). Ayni sekmede yonlendirme.
**Dosyalar:** 21 CSS, 9 JS
**Degisiklikler:**
- ~ `popup.js`: POPUP_IMAGE statik JPG (wsrv.nl optimize), POPUP_LINK dinamik origin + path, target _self

---

## v1.4.1 - Popup GIF animasyon duzeltmesi (2026-03-24)
**Hash:** `dcdedaf`
**Aciklama:** Popup GIF animasyonu korundu. wsrv.nl output=webp yerine n=-1 parametresi kullanildi (tum frame'ler islenir, animasyon kaybolmaz).
**Dosyalar:** 21 CSS, 9 JS
**Degisiklikler:**
- ~ `popup.js`: wsrv.nl URL'de output=webp -> n=-1 (animasyon korunuyor, boyut optimize)

---

## v1.4.0 - Popup optimize, stories mobil-only (2026-03-24)
**Hash:** `af5fa90`
**Aciklama:** Popup ve stories birlikte crash-free calisiyor. GIF wsrv.nl ile WebP'ye donusturuldu, backdrop-filter kaldirildi, particle azaltildi. Stories sadece mobilde gorunur.
**Dosyalar:** 21 CSS, 9 JS
**Degisiklikler:**
- ~ `popup.js`: GIF -> wsrv.nl WebP proxy (w=800, q=80), backdrop-filter kaldirildi, PARTICLE_COUNT 18->8
- ~ `stories_override.css`: varsayilan display:none, sadece @media max-width:768px ile display:block
- ~ `stories_loader.js`: desktop'ta boot engeli, ayni sekmede yonlendirme
- ~ `build.js` / `dev-server.js`: popup.js geri eklendi

---

## v1.3.0 - Stories mobil-only, popup deaktif (2026-03-24)
**Hash:** `6f05a13`
**Aciklama:** Stories widget sadece mobilde gorunur (varsayilan display:none, max-width:768px ile acilir). Popup crash sorunu nedeniyle bundle'dan cikarildi.
**Dosyalar:** 21 CSS, 8 JS (popup.js cikarildi)
**Degisiklikler:**
- ~ `stories_override.css`: varsayilan display:none, sadece @media max-width:768px ile display:block
- ~ `stories_loader.js`: desktop'ta boot engeli (innerWidth > 768), ayni sekmede yonlendirme
- - `popup.js`: bundle'dan cikarildi (crash sorunu)
- ~ `build.js` / `dev-server.js`: popup.js listeden cikarildi

---

## v1.2.0 - Stories modulu (2026-03-24)
**Hash:** `4b39b53`
**Aciklama:** Zuck.js stories modulu eklendi. 2 adet promosyon story'si, CSS override'lar, dinamik link yapisi.
**Dosyalar:** 21 CSS (stories_override.css eklendi), 9 JS (stories_loader.js, zuck.min.js eklendi)
**Degisiklikler:**
- + `stories_loader.js`: Zuck.js stories yukleyici — 2 promosyon story'si, dinamik domain link yapisi
- + `stories_override.css`: Zuck.js modal/container override (object-fit, spacing, live-chat gizleme)
- + `zuck.min.js`: Zuck.js kutuphanesi bundle'a dahil
- ~ `build.js`: stories dosyalari eklendi
- ~ Container padding/max-height azaltildi (ust bosluk duzeltmesi)

---

## v1.1.0 - Bundle guncellemeleri (2026-03-24)
**Hash:** `8bca4fc`
**Aciklama:** Mobil tabbar sticky menu, popup, promosyon UI ve performans iyilestirmeleri. Promosyon sayfasi CSS rollback (9cc5ceb'ye geri donuldu).
**Dosyalar:** 20 CSS, 8 JS (`sticky_menu_guard.js` eklendi)
**Degisiklikler:**
- + `sticky_menu_guard.js`: SPA route sonrasi `inner-menu` inline style (fixed, translateX) temizligi
- + `mobile_navbar.css`: `li.center` / sticky-menu override (opacity, transition, background-image)
- ~ `promopage.css`: 9cc5ceb versiyonuna rollback (tabs-nav gizleme geri alindi)
- ~ `Promo_up_button.css`: 9cc5ceb versiyonuna rollback (category-info gizleme geri alindi)
- + `popup.js`: bundle aktif, `POPUP_DELAY` 0ms
- + `mito_tv_button.js`: wsrv.nl proxy + fallback
- + Tum scriptlerden `console.log` kaldirildi
- + `build.js`: popup.js / sticky_menu_guard.js sirasi

---

## v1.0.0 - Ilk Kurulum (2026-01-20)
**Hash:** `9cc5ceb`
**Aciklama:** Tum aktif CSS ve JS dosyalari allmito reposuna tasindi. Mevcut CMS'deki son calisan versiyon.
**Dosyalar:** 20 CSS, 7 JS
**Degisiklikler:**
- + Tum aktif dosyalar active/ altina yerlestirildi
- + Tum inaktif dosyalar inactive/ altina yerlestirildi
- + PIPELINE.md olusturuldu
- + VERSIONS.md olusturuldu
---
