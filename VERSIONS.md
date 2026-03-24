# Mitobet Versiyon Gecmisi

## v1.1.0 - Bundle guncellemeleri (2026-03-24)
**Hash:** `065c54a`
**Aciklama:** Mobil tabbar sticky menu, popup, promosyon UI ve performans iyilestirmeleri.
**Dosyalar:** 20 CSS, 8 JS (`sticky_menu_guard.js` eklendi)
**Degisiklikler:**
- + `sticky_menu_guard.js`: SPA route sonrasi `inner-menu` inline style (fixed, translateX) temizligi
- + `mobile_navbar.css`: `li.center` / sticky-menu override (opacity, transition, background-image)
- + `promopage.css`: `#tabs-nav` gizleme; cuzdan modal tablari korundu
- + `Promo_up_button.css`: `.category-info` gizleme
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
