# Mitobet Versiyon Gecmisi

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
