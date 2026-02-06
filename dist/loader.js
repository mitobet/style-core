/* MITOBET Loader */
(function() {
    var V = "v1";
    var CB = "?cb=2";
    var BASE = "https://cdn.jsdelivr.net/gh/osxmeta/mitobet@main/dist/" + V;

    // CSS yukle
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = BASE + "/bundle.css" + CB;
    document.head.appendChild(link);

    // JS yukle
    function loadJS() {
        var script = document.createElement("script");
        script.src = BASE + "/bundle.js" + CB;
        (document.body || document.head).appendChild(script);
    }

    if (document.body) {
        loadJS();
    } else {
        document.addEventListener("DOMContentLoaded", loadJS);
    }
})();
