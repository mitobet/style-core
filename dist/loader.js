/* MITOBET Loader */
(function() {
    var V = "v1";
    var BASE = "https://cdn.jsdelivr.net/gh/mitobet/style-core@main/dist/" + V;
    var cssUrl = BASE + "/bundle.css";
    var jsUrl = BASE + "/bundle.js";

    var pl = document.createElement("link");
    pl.rel = "preload"; pl.as = "style"; pl.href = cssUrl;
    document.head.appendChild(pl);
    var pj = document.createElement("link");
    pj.rel = "preload"; pj.as = "script"; pj.href = jsUrl;
    document.head.appendChild(pj);

    var link = document.createElement("link");
    link.rel = "stylesheet"; link.href = cssUrl;
    document.head.appendChild(link);

    function loadJS() {
        var s = document.createElement("script");
        s.src = jsUrl; s.async = true;
        (document.body || document.head).appendChild(s);
    }
    if (document.body) loadJS();
    else document.addEventListener("DOMContentLoaded", loadJS);
})();
