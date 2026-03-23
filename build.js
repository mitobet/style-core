/**
 * MITOBET - Build Script
 * Tüm aktif CSS ve JS dosyalarını versiyonlu bundle'a birleştirir.
 * 
 * Kullanım:
 *   node build.js          → Mevcut versiyonu build eder
 *   node build.js v2       → v2 olarak build eder
 *   node build.js --new    → Mevcut versiyonu +1 artırıp build eder
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const DIST = path.join(BASE, 'dist');
const CONFIG_FILE = path.join(DIST, 'version.json');

// ============================================================
// AKTİF DOSYA LİSTELERİ (dev-server.js ile senkron)
// ============================================================

const CSS_FILES = [
    'active/CSS/header_buttons.css',
    'active/CSS/mobile_navbar.css',
    'active/CSS/section_buttons.css',
    'active/CSS/modal_buttons.css',
    'active/CSS/main.css',
    'active/CSS/hide.css',
    'active/CSS/vip_hide.css',
    'active/CSS/slider_bg/slider_border.css',
    'active/Slider_Alt_CSS/Slider_Alt_CSS.css',
    'active/PromoPage/promopage.css',
    'active/PromoPage/Promo_up_button.css',
    'active/giris_gorseli/mito_giris_gorseli.css',
    'active/slot_oncesi_css/mito_slot_oncesi.css',
    'active/slot_oncesi_css/mito_slot_unavailable.css',
    'active/slot_oncesi_css/slot_unavailable.css',
    'active/yatirim_uyari_sistemi/yatirim_uyari.css',
    'active/CSS/EK',
    'active/CSS/Kingo',
    'active/CSS/Logo',
    'active/CSS/sidebar',
];

const JS_FILES = [
    'active/SCRIPT/css_blocker.js',
    'active/SCRIPT/font_loader.js',
    'active/SCRIPT/promo_image_replacer.js',
    'active/SCRIPT/mito_tv_button.js',
    'active/SCRIPT/header_extra_buttons.js',
    'active/SCRIPT/footer_marquee.js',
    // 'active/SCRIPT/popup.js', // deaktif — test basarili, sonra tekrar aktif edilecek
];

// ============================================================
// VERSİYON YÖNETİMİ
// ============================================================

function getConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    }
    return { active: 'v1', versions: [] };
}

function saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function getTargetVersion() {
    var arg = process.argv[2];
    var config = getConfig();

    if (arg === '--new') {
        // Mevcut en yüksek versiyon +1
        var max = 0;
        config.versions.forEach(function(v) {
            var num = parseInt(v.replace('v', ''));
            if (num > max) max = num;
        });
        return 'v' + (max + 1);
    } else if (arg && arg.startsWith('v')) {
        return arg;
    } else if (arg) {
        return 'v' + arg;
    } else {
        return config.active || 'v1';
    }
}

// ============================================================
// BUILD
// ============================================================

function build(version) {
    var versionDir = path.join(DIST, version);

    // Klasör oluştur
    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
    if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir);

    // CSS bundle
    var cssContent = '';
    var cssCount = 0;
    CSS_FILES.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            var content = fs.readFileSync(filePath, 'utf-8');
            cssContent += '\n/* ===== ' + file + ' ===== */\n' + content + '\n';
            cssCount++;
        } else {
            console.warn('  [!] CSS bulunamadı: ' + file);
        }
    });

    // JS bundle
    var jsContent = '';
    var jsCount = 0;
    JS_FILES.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            var content = fs.readFileSync(filePath, 'utf-8');
            jsContent += '\n/* ===== ' + file + ' ===== */\n' + content + '\n';
            jsCount++;
        } else {
            console.warn('  [!] JS bulunamadı: ' + file);
        }
    });

    // Yaz
    var cssBundlePath = path.join(versionDir, 'bundle.css');
    var jsBundlePath = path.join(versionDir, 'bundle.js');
    fs.writeFileSync(cssBundlePath, cssContent.trim());
    fs.writeFileSync(jsBundlePath, jsContent.trim());

    // Config güncelle
    var config = getConfig();
    if (!config.versions.includes(version)) {
        config.versions.push(version);
        config.versions.sort();
    }
    config.active = version;
    config.lastBuild = new Date().toISOString();
    saveConfig(config);

    // Loader güncelle
    buildLoader(version);

    console.log('');
    console.log('  MITOBET Build - ' + version);
    console.log('  ─────────────────────────────');
    console.log('  CSS: ' + cssCount + ' dosya → ' + cssBundlePath);
    console.log('  JS:  ' + jsCount + ' dosya  → ' + jsBundlePath);
    console.log('  Aktif versiyon: ' + version);
    console.log('  Versiyonlar: ' + config.versions.join(', '));
    console.log('');
    console.log('  CDN URL\'leri (push sonrası):');
    console.log('  CSS: https://cdn.jsdelivr.net/gh/mitobet/style-core@main/dist/' + version + '/bundle.css');
    console.log('  JS:  https://cdn.jsdelivr.net/gh/mitobet/style-core@main/dist/' + version + '/bundle.js');
    console.log('  Loader: https://cdn.jsdelivr.net/gh/mitobet/style-core@main/dist/loader.js');
    console.log('');
}

// ============================================================
// LOADER (CMS'e eklenen tek dosya)
// ============================================================

function buildLoader(activeVersion) {
    var loaderContent = '/* MITOBET Loader */\n' +
        '(function() {\n' +
        '    var V = "' + activeVersion + '";\n' +
        '    var BASE = "https://cdn.jsdelivr.net/gh/mitobet/style-core@main/dist/" + V;\n' +
        '\n' +
        '    // CSS yukle\n' +
        '    var link = document.createElement("link");\n' +
        '    link.rel = "stylesheet";\n' +
        '    link.href = BASE + "/bundle.css";\n' +
        '    document.head.appendChild(link);\n' +
        '\n' +
        '    // JS yukle\n' +
        '    function loadJS() {\n' +
        '        var script = document.createElement("script");\n' +
        '        script.src = BASE + "/bundle.js";\n' +
        '        (document.body || document.head).appendChild(script);\n' +
        '    }\n' +
        '\n' +
        '    if (document.body) {\n' +
        '        loadJS();\n' +
        '    } else {\n' +
        '        document.addEventListener("DOMContentLoaded", loadJS);\n' +
        '    }\n' +
        '})();\n';

    fs.writeFileSync(path.join(DIST, 'loader.js'), loaderContent);
}

// ============================================================
// ÇALIŞTIR
// ============================================================

var version = getTargetVersion();
build(version);
