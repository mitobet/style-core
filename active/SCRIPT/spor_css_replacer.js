(function() {
    var REPLACEMENTS = [
        ['217 100% 51.6%', '43 100% 70%'],
        ['217 100% 95%',   '43 100% 95%'],
        ['217 100% 90%',   '43 100% 90%'],
        ['217 100% 80%',   '43 100% 80%'],
        ['217 100% 70%',   '43 100% 70%'],
        ['217 100% 60%',   '43 100% 60%'],
        ['217 100% 50%',   '43 100% 50%'],
        ['217 100% 40%',   '43 100% 40%'],
        ['217 100% 30%',   '43 100% 30%'],
        ['217 100% 20%',   '43 100% 20%'],
        ['217 100% 10%',   '43 100% 10%'],
        ['217 100% 5%',    '43 100% 5%'],
        ['212 58.3% 9.4%', '35 50% 15%'],
        ['240 14.3% 91.8%','220 20% 6%'],
        ['240 14.3% 95%',  '220 20% 5%'],
        ['240 14.3% 90%',  '220 20% 10%'],
        ['240 14.3% 80%',  '220 20% 16%'],
        ['240 14.3% 70%',  '220 20% 24%'],
        ['240 14.3% 60%',  '220 20% 32%'],
        ['240 14.3% 50%',  '220 20% 40%'],
        ['240 14.3% 40%',  '220 20% 50%'],
        ['240 14.3% 30%',  '220 20% 60%'],
        ['240 14.3% 20%',  '220 20% 70%'],
        ['240 14.3% 10%',  '220 20% 80%'],
        ['240 14.3% 5%',   '220 20% 90%'],
        ['212 58.3% 5%',   '220 20% 5%'],
        ['212 58.3% 10%',  '220 20% 10%'],
        ['212 58.3% 20%',  '220 20% 16%'],
        ['212 58.3% 30%',  '220 20% 24%'],
        ['212 58.3% 40%',  '220 20% 32%'],
        ['212 58.3% 50%',  '220 20% 40%'],
        ['212 58.3% 60%',  '220 20% 50%'],
        ['212 58.3% 70%',  '220 20% 60%'],
        ['212 58.3% 80%',  '220 20% 70%'],
        ['212 58.3% 90%',  '220 20% 80%'],
        ['212 58.3% 95%',  '220 20% 90%']
    ];

    var GOLD_OVERRIDE = '' +
        ':root,:root *,.dark,.dark *,html,html *,[class*="sb-"],[class*="sportsbook"]{' +
            '--primary:43 100% 70%!important;' +
            '--primary-foreground:35 50% 15%!important;' +
            '--primary-50:43 100% 95%!important;' +
            '--primary-100:43 100% 90%!important;' +
            '--primary-200:43 100% 80%!important;' +
            '--primary-300:43 100% 70%!important;' +
            '--primary-400:43 100% 60%!important;' +
            '--primary-500:43 100% 50%!important;' +
            '--primary-600:43 100% 40%!important;' +
            '--primary-700:43 100% 30%!important;' +
            '--primary-800:43 100% 20%!important;' +
            '--primary-900:43 100% 10%!important;' +
            '--primary-950:43 100% 5%!important;' +
            '--secondary:43 100% 70%!important;' +
            '--secondary-foreground:35 50% 15%!important;' +
            '--secondary-50:43 100% 95%!important;' +
            '--secondary-100:43 100% 90%!important;' +
            '--secondary-200:43 100% 80%!important;' +
            '--secondary-300:43 100% 70%!important;' +
            '--secondary-400:43 100% 60%!important;' +
            '--secondary-500:43 100% 50%!important;' +
            '--secondary-600:43 100% 40%!important;' +
            '--secondary-700:43 100% 30%!important;' +
            '--secondary-800:43 100% 20%!important;' +
            '--secondary-900:43 100% 10%!important;' +
            '--secondary-950:43 100% 5%!important;' +
            '--tertiary:220 20% 6%!important;' +
            '--tertiary-foreground:0 0% 100%!important;' +
            '--tertiary-50:220 20% 5%!important;' +
            '--tertiary-100:220 20% 10%!important;' +
            '--tertiary-200:220 20% 16%!important;' +
            '--tertiary-300:220 20% 24%!important;' +
            '--tertiary-400:220 20% 32%!important;' +
            '--tertiary-500:220 20% 40%!important;' +
            '--tertiary-600:220 20% 50%!important;' +
            '--tertiary-700:220 20% 60%!important;' +
            '--tertiary-800:220 20% 70%!important;' +
            '--tertiary-900:220 20% 80%!important;' +
            '--tertiary-950:220 20% 90%!important;' +
        '}' +
        '.dark{' +
            '--primary:43 100% 70%!important;' +
            '--primary-foreground:35 50% 15%!important;' +
            '--primary-50:43 100% 5%!important;' +
            '--primary-100:43 100% 10%!important;' +
            '--primary-200:43 100% 20%!important;' +
            '--primary-300:43 100% 30%!important;' +
            '--primary-400:43 100% 40%!important;' +
            '--primary-500:43 100% 50%!important;' +
            '--primary-600:43 100% 60%!important;' +
            '--primary-700:43 100% 70%!important;' +
            '--primary-800:43 100% 80%!important;' +
            '--primary-900:43 100% 90%!important;' +
            '--primary-950:43 100% 95%!important;' +
            '--secondary:43 100% 70%!important;' +
            '--secondary-foreground:35 50% 15%!important;' +
            '--secondary-50:43 100% 5%!important;' +
            '--secondary-100:43 100% 10%!important;' +
            '--secondary-200:43 100% 20%!important;' +
            '--secondary-300:43 100% 30%!important;' +
            '--secondary-400:43 100% 40%!important;' +
            '--secondary-500:43 100% 50%!important;' +
            '--secondary-600:43 100% 60%!important;' +
            '--secondary-700:43 100% 70%!important;' +
            '--secondary-800:43 100% 80%!important;' +
            '--secondary-900:43 100% 90%!important;' +
            '--secondary-950:43 100% 95%!important;' +
            '--tertiary:220 20% 6%!important;' +
            '--tertiary-foreground:0 0% 100%!important;' +
            '--tertiary-50:220 20% 5%!important;' +
            '--tertiary-100:220 20% 10%!important;' +
            '--tertiary-200:220 20% 16%!important;' +
            '--tertiary-300:220 20% 24%!important;' +
            '--tertiary-400:220 20% 32%!important;' +
            '--tertiary-500:220 20% 40%!important;' +
            '--tertiary-600:220 20% 50%!important;' +
            '--tertiary-700:220 20% 60%!important;' +
            '--tertiary-800:220 20% 70%!important;' +
            '--tertiary-900:220 20% 80%!important;' +
            '--tertiary-950:220 20% 90%!important;' +
        '}';

    var MARKER = 'data-mito-gold';

    function hasBlue(text) {
        return text.indexOf('217 100%') !== -1 ||
               text.indexOf('212 58') !== -1 ||
               text.indexOf('240 14') !== -1;
    }

    function replaceInText(text) {
        var changed = false;
        for (var i = 0; i < REPLACEMENTS.length; i++) {
            if (text.indexOf(REPLACEMENTS[i][0]) !== -1) {
                text = text.split(REPLACEMENTS[i][0]).join(REPLACEMENTS[i][1]);
                changed = true;
            }
        }
        return changed ? text : null;
    }

    function injectStyleTo(doc) {
        if (!doc || !doc.querySelector) return;
        if (doc.querySelector('[' + MARKER + ']')) return;
        var s = doc.createElement('style');
        s.setAttribute(MARKER, '1');
        s.textContent = GOLD_OVERRIDE;
        var target = doc.head || doc.documentElement || doc.body;
        if (target) target.appendChild(s);
    }

    function replaceStyleTags(doc) {
        if (!doc || !doc.querySelectorAll) return;
        var styles = doc.querySelectorAll('style:not([' + MARKER + '])');
        for (var i = 0; i < styles.length; i++) {
            var txt = styles[i].textContent;
            if (!txt || !hasBlue(txt)) continue;
            var result = replaceInText(txt);
            if (result !== null) {
                styles[i].textContent = result;
            }
        }
    }

    function replaceCSSOM(doc) {
        if (!doc || !doc.styleSheets) return;
        var sheets = doc.styleSheets;
        for (var s = 0; s < sheets.length; s++) {
            try {
                var rules = sheets[s].cssRules || sheets[s].rules;
                if (!rules) continue;
                for (var r = 0; r < rules.length; r++) {
                    var rule = rules[r];
                    if (!rule.cssText) continue;
                    if (!hasBlue(rule.cssText)) continue;
                    var newText = replaceInText(rule.cssText);
                    if (newText !== null) {
                        try {
                            sheets[s].deleteRule(r);
                            sheets[s].insertRule(newText, r);
                        } catch (e2) {}
                    }
                }
            } catch (e) {}
        }
    }

    function adoptOverride(doc) {
        if (!doc) return;
        try {
            if (typeof CSSStyleSheet === 'function' && doc.adoptedStyleSheets !== undefined) {
                var already = false;
                for (var i = 0; i < doc.adoptedStyleSheets.length; i++) {
                    if (doc.adoptedStyleSheets[i]._mitoGold) {
                        already = true;
                        break;
                    }
                }
                if (!already) {
                    var sheet = new CSSStyleSheet();
                    sheet.replaceSync(GOLD_OVERRIDE);
                    sheet._mitoGold = true;
                    doc.adoptedStyleSheets = doc.adoptedStyleSheets.concat([sheet]);
                }
            }
        } catch (e) {}
    }

    function processShadowRoots(root) {
        if (!root || !root.querySelectorAll) return;
        var all = root.querySelectorAll('*');
        for (var i = 0; i < all.length; i++) {
            var sr = all[i].shadowRoot;
            if (!sr) continue;
            injectStyleTo(sr);
            replaceStyleTags(sr);
            adoptOverride(sr);
            processShadowRoots(sr);
        }
    }

    function processIframes(doc) {
        if (!doc || !doc.querySelectorAll) return;
        var iframes = doc.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                var idoc = iframes[i].contentDocument || (iframes[i].contentWindow && iframes[i].contentWindow.document);
                if (!idoc) continue;
                processDocument(idoc);
            } catch (e) {}
        }
    }

    function setPropertyDirect(doc) {
        if (!doc || !doc.documentElement) return;
        var root = doc.documentElement;
        var props = [
            ['--primary', '43 100% 70%'],
            ['--primary-foreground', '35 50% 15%'],
            ['--primary-50', '43 100% 95%'],
            ['--primary-100', '43 100% 90%'],
            ['--primary-200', '43 100% 80%'],
            ['--primary-300', '43 100% 70%'],
            ['--primary-400', '43 100% 60%'],
            ['--primary-500', '43 100% 50%'],
            ['--primary-600', '43 100% 40%'],
            ['--primary-700', '43 100% 30%'],
            ['--primary-800', '43 100% 20%'],
            ['--primary-900', '43 100% 10%'],
            ['--primary-950', '43 100% 5%'],
            ['--secondary', '43 100% 70%'],
            ['--secondary-foreground', '35 50% 15%'],
            ['--secondary-50', '43 100% 95%'],
            ['--secondary-100', '43 100% 90%'],
            ['--secondary-200', '43 100% 80%'],
            ['--secondary-300', '43 100% 70%'],
            ['--secondary-400', '43 100% 60%'],
            ['--secondary-500', '43 100% 50%'],
            ['--secondary-600', '43 100% 40%'],
            ['--secondary-700', '43 100% 30%'],
            ['--secondary-800', '43 100% 20%'],
            ['--secondary-900', '43 100% 10%'],
            ['--secondary-950', '43 100% 5%'],
            ['--tertiary', '220 20% 6%'],
            ['--tertiary-foreground', '0 0% 100%'],
            ['--tertiary-50', '220 20% 5%'],
            ['--tertiary-100', '220 20% 10%'],
            ['--tertiary-200', '220 20% 16%'],
            ['--tertiary-300', '220 20% 24%'],
            ['--tertiary-400', '220 20% 32%'],
            ['--tertiary-500', '220 20% 40%'],
            ['--tertiary-600', '220 20% 50%'],
            ['--tertiary-700', '220 20% 60%'],
            ['--tertiary-800', '220 20% 70%'],
            ['--tertiary-900', '220 20% 80%'],
            ['--tertiary-950', '220 20% 90%']
        ];
        for (var i = 0; i < props.length; i++) {
            try {
                root.style.setProperty(props[i][0], props[i][1], 'important');
            } catch (e) {}
        }
        var darkEl = doc.querySelector('.dark');
        if (darkEl) {
            var darkProps = [
                ['--primary', '43 100% 70%'],
                ['--primary-foreground', '35 50% 15%'],
                ['--primary-50', '43 100% 5%'],
                ['--primary-100', '43 100% 10%'],
                ['--primary-200', '43 100% 20%'],
                ['--primary-300', '43 100% 30%'],
                ['--primary-400', '43 100% 40%'],
                ['--primary-500', '43 100% 50%'],
                ['--primary-600', '43 100% 60%'],
                ['--primary-700', '43 100% 70%'],
                ['--primary-800', '43 100% 80%'],
                ['--primary-900', '43 100% 90%'],
                ['--primary-950', '43 100% 95%'],
                ['--secondary', '43 100% 70%'],
                ['--secondary-foreground', '35 50% 15%'],
                ['--secondary-50', '43 100% 5%'],
                ['--secondary-100', '43 100% 10%'],
                ['--secondary-200', '43 100% 20%'],
                ['--secondary-300', '43 100% 30%'],
                ['--secondary-400', '43 100% 40%'],
                ['--secondary-500', '43 100% 50%'],
                ['--secondary-600', '43 100% 60%'],
                ['--secondary-700', '43 100% 70%'],
                ['--secondary-800', '43 100% 80%'],
                ['--secondary-900', '43 100% 90%'],
                ['--secondary-950', '43 100% 95%'],
                ['--tertiary', '220 20% 6%'],
                ['--tertiary-foreground', '0 0% 100%'],
                ['--tertiary-50', '220 20% 5%'],
                ['--tertiary-100', '220 20% 10%'],
                ['--tertiary-200', '220 20% 16%'],
                ['--tertiary-300', '220 20% 24%'],
                ['--tertiary-400', '220 20% 32%'],
                ['--tertiary-500', '220 20% 40%'],
                ['--tertiary-600', '220 20% 50%'],
                ['--tertiary-700', '220 20% 60%'],
                ['--tertiary-800', '220 20% 70%'],
                ['--tertiary-900', '220 20% 80%'],
                ['--tertiary-950', '220 20% 90%']
            ];
            for (var j = 0; j < darkProps.length; j++) {
                try {
                    darkEl.style.setProperty(darkProps[j][0], darkProps[j][1], 'important');
                } catch (e) {}
            }
        }
    }

    function processDocument(doc) {
        if (!doc) return;
        injectStyleTo(doc);
        replaceStyleTags(doc);
        replaceCSSOM(doc);
        adoptOverride(doc);
        setPropertyDirect(doc);
        processShadowRoots(doc);
    }

    function processAll() {
        processDocument(document);
        processIframes(document);
    }

    function observeDOM() {
        var observer = new MutationObserver(function(mutations) {
            var shouldProcess = false;
            for (var m = 0; m < mutations.length; m++) {
                var mut = mutations[m];

                if (mut.type === 'characterData') {
                    var parent = mut.target.parentNode;
                    if (parent && parent.tagName === 'STYLE' && !parent.hasAttribute(MARKER)) {
                        var txt = parent.textContent;
                        if (txt && hasBlue(txt)) {
                            var result = replaceInText(txt);
                            if (result !== null) parent.textContent = result;
                        }
                    }
                    continue;
                }

                var added = mut.addedNodes;
                if (!added) continue;
                for (var n = 0; n < added.length; n++) {
                    var node = added[n];
                    if (node.nodeType !== 1) continue;

                    if (node.tagName === 'STYLE' && !node.hasAttribute(MARKER)) {
                        var stxt = node.textContent;
                        if (stxt && hasBlue(stxt)) {
                            var sr = replaceInText(stxt);
                            if (sr !== null) node.textContent = sr;
                        }
                    }

                    if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
                        shouldProcess = true;
                    }

                    if (node.tagName === 'IFRAME') {
                        shouldProcess = true;
                    }

                    if (node.shadowRoot) {
                        shouldProcess = true;
                    }

                    if (node.querySelectorAll) {
                        var nested = node.querySelectorAll('style,link[rel="stylesheet"],iframe');
                        if (nested.length > 0) shouldProcess = true;
                    }
                }
            }
            if (shouldProcess) {
                setTimeout(processAll, 50);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function run() {
        processAll();
        observeDOM();
        setInterval(processAll, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    window.addEventListener('load', function() {
        setTimeout(processAll, 300);
        setTimeout(processAll, 1000);
        setTimeout(processAll, 3000);
        setTimeout(processAll, 6000);
    });
})();
