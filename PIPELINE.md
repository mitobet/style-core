# MITOBET - Gelistirme Pipeline'i

## Proje Bilgileri

- **Proje**: Mitobet CSS/JS yonetimi
- **Repo**: `mitobet/style-core` — https://github.com/mitobet/style-core.git
- **CDN**: jsDelivr — `cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/...`
- **Calisma dizini**: `/Users/talha/Documents/GitHub/allmito/`
- **Son aktif CDN hash**: `9cc5ceb`

### CMS'deki Aktif Kod

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@9cc5ceb/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@9cc5ceb/dist/v1/bundle.js"></script>
```

---

## Sorumluluk Dagitimi

| Gorev | Kim Yapar |
|-------|-----------|
| Kod yazma / duzenleme | AI |
| `node build.js` calistirma | AI |
| `git add + commit + push` | AI |
| Hash alma + CDN test kodu verme | AI |
| Konsol testi (siteye yapistirma) | Kullanici |
| CMS hash guncellemesi | Kullanici |
| VERSIONS.md guncelleme | AI |

---

## Gelistirme Dongusu

```
AI: Kod Yaz / Duzenle (active/ altinda)
       |
       v
AI: node build.js (bundle uret)
       |
       v
AI: git add + commit + push
       |
       v
AI: git rev-parse --short HEAD → HASH al
       |
       v
AI: Kullaniciya kisa CDN test kodu ver (hash ile)
       |
       v
KULLANICI: Siteyi ac, konsola yapistir, test et
       |
       v
Test Basarili mi?
  |           |
 Hayir       Evet
  |           |
  v           v
AI: Koda   KULLANICI: CMS hash guncelle
  Don         |
              v
           AI: VERSIONS.md'ye kaydet
```

**Test icin konsola yapistirilan KOD (kisa, tek satir):**
```javascript
(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/dist/v1/bundle.js';document.body.appendChild(s);var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/dist/v1/bundle.css';document.head.appendChild(l)})();
```
`<HASH>` yerine `git rev-parse --short HEAD` ciktisi yazilir.

---

## Kurallar

1. `dist/` repo'ya DAHIL — CDN buradan okur, `.gitignore`'a EKLENMEZ
2. Test icin GitHub CDN uzerinden yapilir — push et, hash al, kisa CDN kodunu ver
3. CDN format: `https://cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/dist/v1/bundle.css`
4. Test onaylanirsa KULLANICI CMS'deki hash'i gunceller
5. Yeni dosya eklendiginde `build.js` dosya listesi guncellenir
6. Tum Mitobet islemleri bu pipeline'a uygun yapilir
7. **HER GUNCELLEME VERSIYONLANIR** — `VERSIONS.md`'ye isim, aciklama, hash ve tarih yazilir
8. Git commit mesajlari aciklayici olur: ne degisti, neden degisti
9. `VERSIONS.md` repo'ya dahildir ve her push'ta guncel tutulur
10. **Uzun kod bloku chat'e ASLA yazilmaz** — test kodu max 3 satir, tek IIFE formatinda
11. Kullanici "test kodu ver" dediginde KISA CDN test kodu verilir, tum bundle DEGIL
12. Test kodu formati: `(function(){var s=document.createElement('script');s.src='CDN_URL';...})();`
13. Her push sonrasi AI kullaniciya hazir CMS kodunu (`<link>` + `<script>`) da verir

---

## Dosya Yapisi

```
allmito/
  PIPELINE.md              <-- Bu dosya
  VERSIONS.md              <-- Versiyon gecmisi
  build.js                 <-- Bundle uretici
  dev-server.js            <-- Lokal sunucu (opsiyonel)
  package.json
  .gitignore
  active/                  <-- AKTIF dosyalar (bundle'a dahil)
    CSS/
    SCRIPT/
    PromoPage/
    Slider_Alt_CSS/
    giris_gorseli/
    slot_oncesi_css/
    yatirim_uyari_sistemi/
  inactive/                <-- PASIF dosyalar (bundle'a dahil DEGIL)
    CSS/
    pasife/
    root_from_root/
  dist/                    <-- Build ciktisi (repo'ya DAHIL, CDN buradan okur)
    v1/bundle.css
    v1/bundle.js
```

### Aktif Dosyalar (`active/` altinda, bundle'a dahil)

**CSS (20 dosya):**
- `active/CSS/header_buttons.css`
- `active/CSS/mobile_navbar.css`
- `active/CSS/section_buttons.css`
- `active/CSS/modal_buttons.css`
- `active/CSS/main.css`
- `active/CSS/hide.css`
- `active/CSS/vip_hide.css`
- `active/CSS/slider_bg/slider_border.css`
- `active/CSS/EK`
- `active/CSS/Kingo`
- `active/CSS/Logo`
- `active/CSS/sidebar`
- `active/PromoPage/promopage.css`
- `active/PromoPage/Promo_up_button.css`
- `active/Slider_Alt_CSS/Slider_Alt_CSS.css`
- `active/giris_gorseli/mito_giris_gorseli.css`
- `active/slot_oncesi_css/mito_slot_oncesi.css`
- `active/slot_oncesi_css/mito_slot_unavailable.css`
- `active/slot_oncesi_css/slot_unavailable.css`
- `active/yatirim_uyari_sistemi/yatirim_uyari.css`

**JS (7 dosya):**
- `active/SCRIPT/css_blocker.js`
- `active/SCRIPT/font_loader.js`
- `active/SCRIPT/footer_marquee.js`
- `active/SCRIPT/header_extra_buttons.js`
- `active/SCRIPT/mito_tv_button.js`
- `active/SCRIPT/popup.js`
- `active/SCRIPT/promo_image_replacer.js`

### Inaktif Dosyalar (`inactive/` altinda)

Kullanilmayan ama saklanmasi gereken dosyalar. Gerekirse tekrar aktif edilebilir.

- `inactive/CSS/tabs_wallet.css`
- `inactive/pasife/Background/background.css`
- `inactive/pasife/CSS/header_wallet.css`
- `inactive/pasife/CSS/section_view_buttons.css`
- `inactive/pasife/Giris_Ekrani/signup-modal`
- `inactive/pasife/SCRIPT/BannerFunctions`
- `inactive/pasife/SCRIPT/Main`
- `inactive/pasife/SCRIPT/PromosyonButton`
- `inactive/pasife/SCRIPT/SportPopupFunction`
- `inactive/pasife/SCRIPT/UIFunctions`
- `inactive/pasife/SCRIPT/UtilityFunctions`
- `inactive/pasife/SCRIPT/font_loader.js`
- `inactive/pasife/SCRIPT/snow_effect.js`
- `inactive/pasife/SCRIPT/theme_toggle.js`
- `inactive/pasife/TEPE_WINNER/tepe_winner.css`
- `inactive/pasife/sidebar/promo_image_replacer.js`
- `inactive/pasife/sidebar/sidebar.css`
- `inactive/pasife/yatirim_uyari_sistemi/yatirim_uyari.js`

### Arac Dosyalari

- `build.js` — CSS+JS bundle uretici (`dist/v1/bundle.css` + `dist/v1/bundle.js`)
- `dev-server.js` — Lokal gelistirme sunucusu (opsiyonel)
- `package.json` — Node.js bagimliliklar
- `PIPELINE.md` — Bu dosya (kurallar ve workflow)
- `VERSIONS.md` — Versiyon gecmisi

---

## Dosya Ekleme / Cikarma Proseduru

### Yeni CSS Ekleme
1. Dosyayi `active/` altindaki ilgili klasore koy (ornek: `active/CSS/yeni_dosya.css`)
2. `build.js` icindeki `CSS_FILES` listesine ekle
3. Build al, push et, test et, VERSIONS.md'ye kaydet

### Yeni JS Ekleme
1. Dosyayi `active/SCRIPT/` altina koy
2. `build.js` icindeki `JS_FILES` listesine ekle
3. Build al, push et, test et, VERSIONS.md'ye kaydet

### Dosya Cikarma / Pasife Alma
1. Dosyayi `active/` altindan `inactive/` altina tasi
2. `build.js` listesinden cikar
3. Build al, push et, test et, VERSIONS.md'ye kaydet
4. Aciklamada neden pasife alindigi belirtilmeli

---

## Konsol Test Kullanimi

### KRITIK KURALLAR (AI ICIN)

1. Test kodu SADECE kisa CDN IIFE olarak verilir (1-3 satir max)
2. Bundle icerigi, uzun kod bloklari chat'e ASLA yazilmaz
3. Kullanici "test kodu ver" dediginde: push et, hash al, kisa CDN kodunu ver
4. Her test kodu icin ONCE push yapilmali (CDN güncel hash'i alabilsin)
5. Test onaylanirsa kullaniciya hazir CMS kodu (`<link>` + `<script>`) verilir

### Test Akisi

1. AI kodu yazar ve `node build.js` calistirir
2. AI `git add -A && git commit && git push` yapar
3. AI `git rev-parse --short HEAD` ile hash alir
4. AI kullaniciya kisa test kodunu verir:
```javascript
(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/mitobet/style-core@HASH/dist/v1/bundle.js';document.body.appendChild(s);var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/mitobet/style-core@HASH/dist/v1/bundle.css';document.head.appendChild(l)})();
```
5. Kullanici siteyi acar, konsola yapistir, test eder
6. Test basarili ise kullanici onaylar
7. AI `VERSIONS.md`'yi gunceller ve CMS kodunu verir

---

## Versiyon Kayit Formati (VERSIONS.md)

Her guncelleme su formatta kaydedilir (en yeni en ustte):

```
## vX.X.X - Kisa Isim (YYYY-MM-DD)
**Hash:** `abc1234`
**Aciklama:** Detayli aciklama — ne degisti, neden degisti.
**Degisiklikler:**
- + eklenen dosya/ozellik
- - cikarilan dosya/ozellik
- ~ degistirilen dosya/ozellik
---
```

Zorunlu alanlar: versiyon, isim, tarih, hash, aciklama, degisiklik listesi.

---

## Push ve CMS Guncelleme

### AI Adimlari (Push)

```bash
node build.js
git add -A
git commit -m "aciklayici commit mesaji"
git push origin main
git rev-parse --short HEAD    # --> ornek: a1b2c3d
```

### Kullaniciya Verilecek CMS Kodu

Push sonrasi AI kullaniciya su kodu verir (hash doldurulmus):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/dist/v1/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/mitobet/style-core@<HASH>/dist/v1/bundle.js"></script>
```

### Hash Guncelleme (Kullanici Yapar)

CMS'deki eski hash'i yeni hash ile degistir:
```
@9cc5ceb  -->  @<YENI_HASH>
```

**NOT:** Her push'ta hash degisir. Eski hash ile CDN'deki dosya asla degismez (cache-busting). Bu yuzden her guncellemede hash yenilenmelidir.
