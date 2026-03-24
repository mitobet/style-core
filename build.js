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
const csso = require('csso');
const { minify: terserMinify } = require('terser');

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
    'active/CSS/stories_override.css',
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
    'active/SCRIPT/popup.js',
    'active/SCRIPT/sticky_menu_guard.js',
    'active/SCRIPT/stories_loader.js',
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
// VENDOR DOSYALARI (Zuck.js — bundle'a dahil)
// ============================================================

const VENDOR_CSS = [
    'node_modules/zuck.js/dist/zuck.min.css',
    'node_modules/zuck.js/dist/skins/snapgram.min.css',
];

const VENDOR_JS = [
    'node_modules/zuck.js/dist/zuck.min.js',
];

// ============================================================
// BUILD
// ============================================================

async function build(version) {
    var versionDir = path.join(DIST, version);

    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
    if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir);

    // --- CSS bundle ---
    var cssContent = '';
    var cssCount = 0;

    VENDOR_CSS.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            cssContent += '\n/* ===== vendor: ' + file + ' ===== */\n' + fs.readFileSync(filePath, 'utf-8') + '\n';
            cssCount++;
        }
    });

    CSS_FILES.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            var content = fs.readFileSync(filePath, 'utf-8');
            cssContent += '\n/* ===== ' + file + ' ===== */\n' + content + '\n';
            cssCount++;
        } else {
            console.warn('  [!] CSS bulunamadi: ' + file);
        }
    });

    // --- JS bundle ---
    var jsContent = '';
    var jsCount = 0;

    VENDOR_JS.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            jsContent += '\n/* ===== vendor: ' + file + ' ===== */\n' + fs.readFileSync(filePath, 'utf-8') + '\n';
            jsCount++;
        }
    });

    JS_FILES.forEach(function(file) {
        var filePath = path.join(BASE, file);
        if (fs.existsSync(filePath)) {
            var content = fs.readFileSync(filePath, 'utf-8');
            jsContent += '\n/* ===== ' + file + ' ===== */\n' + content + '\n';
            jsCount++;
        } else {
            console.warn('  [!] JS bulunamadi: ' + file);
        }
    });

    // --- Minify ---
    var rawCssSize = Buffer.byteLength(cssContent, 'utf-8');
    var rawJsSize = Buffer.byteLength(jsContent, 'utf-8');

    var minCss = csso.minify(cssContent).css;
    var minJsResult = await terserMinify(jsContent, { compress: true, mangle: true });
    var minJs = minJsResult.code;

    var minCssSize = Buffer.byteLength(minCss, 'utf-8');
    var minJsSize = Buffer.byteLength(minJs, 'utf-8');

    // --- Yaz ---
    var cssBundlePath = path.join(versionDir, 'bundle.css');
    var jsBundlePath = path.join(versionDir, 'bundle.js');
    fs.writeFileSync(cssBundlePath, minCss);
    fs.writeFileSync(jsBundlePath, minJs);

    // Config guncelle
    var config = getConfig();
    if (!config.versions.includes(version)) {
        config.versions.push(version);
        config.versions.sort();
    }
    config.active = version;
    config.lastBuild = new Date().toISOString();
    saveConfig(config);

    buildLoader(version);

    var fmtKB = function(b) { return (b / 1024).toFixed(1) + ' KB'; };

    console.log('');
    console.log('  MITOBET Build - ' + version + ' (minified)');
    console.log('  ─────────────────────────────');
    console.log('  CSS: ' + cssCount + ' dosya → ' + cssBundlePath);
    console.log('       ' + fmtKB(rawCssSize) + ' → ' + fmtKB(minCssSize) + ' (-%' + Math.round((1 - minCssSize / rawCssSize) * 100) + ')');
    console.log('  JS:  ' + jsCount + ' dosya  → ' + jsBundlePath);
    console.log('       ' + fmtKB(rawJsSize) + ' → ' + fmtKB(minJsSize) + ' (-%' + Math.round((1 - minJsSize / rawJsSize) * 100) + ')');
    console.log('  Aktif versiyon: ' + version);
    console.log('  Versiyonlar: ' + config.versions.join(', '));
    console.log('');
    console.log('  CDN URL\'leri (push sonrasi):');
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
        '    var cssUrl = BASE + "/bundle.css";\n' +
        '    var jsUrl = BASE + "/bundle.js";\n' +
        '\n' +
        '    var pl = document.createElement("link");\n' +
        '    pl.rel = "preload"; pl.as = "style"; pl.href = cssUrl;\n' +
        '    document.head.appendChild(pl);\n' +
        '    var pj = document.createElement("link");\n' +
        '    pj.rel = "preload"; pj.as = "script"; pj.href = jsUrl;\n' +
        '    document.head.appendChild(pj);\n' +
        '\n' +
        '    var link = document.createElement("link");\n' +
        '    link.rel = "stylesheet"; link.href = cssUrl;\n' +
        '    document.head.appendChild(link);\n' +
        '\n' +
        '    function loadJS() {\n' +
        '        var s = document.createElement("script");\n' +
        '        s.src = jsUrl; s.async = true;\n' +
        '        (document.body || document.head).appendChild(s);\n' +
        '    }\n' +
        '    if (document.body) loadJS();\n' +
        '    else document.addEventListener("DOMContentLoaded", loadJS);\n' +
        '})();\n';

    fs.writeFileSync(path.join(DIST, 'loader.js'), loaderContent);
}

// ============================================================
// ÇALIŞTIR
// ============================================================

var version = getTargetVersion();
build(version).catch(function(err) {
    console.error('Build hatasi:', err);
    process.exit(1);
});
