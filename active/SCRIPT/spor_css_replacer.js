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

    function processStyleTags() {
        var styles = document.querySelectorAll('style');
        var count = 0;
        for (var i = 0; i < styles.length; i++) {
            var original = styles[i].textContent;
            if (original.indexOf('217 100%') !== -1 || original.indexOf('212 58') !== -1 || original.indexOf('240 14') !== -1) {
                var result = replaceInText(original);
                if (result !== null) {
                    styles[i].textContent = result;
                    count++;
                }
            }
        }
        return count;
    }

    function observeStyleTags() {
        var observer = new MutationObserver(function(mutations) {
            for (var m = 0; m < mutations.length; m++) {
                var added = mutations[m].addedNodes;
                for (var n = 0; n < added.length; n++) {
                    var node = added[n];
                    if (node.nodeType !== 1) continue;

                    if (node.tagName === 'STYLE') {
                        var txt = node.textContent;
                        if (txt.indexOf('217 100%') !== -1 || txt.indexOf('212 58') !== -1 || txt.indexOf('240 14') !== -1) {
                            var result = replaceInText(txt);
                            if (result !== null) {
                                node.textContent = result;
                            }
                        }
                    }
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    function run() {
        processStyleTags();
        observeStyleTags();
        setInterval(processStyleTags, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    window.addEventListener('load', function() {
        setTimeout(processStyleTags, 500);
    });
})();
