(function() {
    var OLD_CSS_NAME = 'HAdao1T5VR8KAu8WaPPXiIDtmFpxZuzu';
    var NEW_CSS_NAME = 'M69KD1LR8yC42b637plVw99HANf52MbW';
    var oldPattern = new RegExp(OLD_CSS_NAME, 'g');

    function replaceCSSLinks() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        var replaced = 0;
        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href') || '';
            if (oldPattern.test(href)) {
                oldPattern.lastIndex = 0;
                links[i].setAttribute('href', href.replace(oldPattern, NEW_CSS_NAME));
                replaced++;
            }
            oldPattern.lastIndex = 0;
        }
        return replaced;
    }

    function observeNewLinks() {
        var observer = new MutationObserver(function(mutations) {
            for (var m = 0; m < mutations.length; m++) {
                var added = mutations[m].addedNodes;
                for (var n = 0; n < added.length; n++) {
                    var node = added[n];
                    if (node.nodeType !== 1) continue;

                    if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
                        var href = node.getAttribute('href') || '';
                        if (href.indexOf(OLD_CSS_NAME) !== -1) {
                            node.setAttribute('href', href.replace(oldPattern, NEW_CSS_NAME));
                            oldPattern.lastIndex = 0;
                        }
                    }

                    var innerLinks = node.querySelectorAll
                        ? node.querySelectorAll('link[rel="stylesheet"][href*="' + OLD_CSS_NAME + '"]')
                        : [];
                    for (var k = 0; k < innerLinks.length; k++) {
                        var h = innerLinks[k].getAttribute('href') || '';
                        innerLinks[k].setAttribute('href', h.replace(oldPattern, NEW_CSS_NAME));
                        oldPattern.lastIndex = 0;
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
        replaceCSSLinks();
        observeNewLinks();

        setInterval(function() {
            replaceCSSLinks();
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    window.addEventListener('load', function() {
        setTimeout(replaceCSSLinks, 500);
    });
})();
