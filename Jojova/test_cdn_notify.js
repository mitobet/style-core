(function () {
  "use strict";

  try {
    if (document.getElementById("jojova-cdn-test-notify")) return;

    var box = document.createElement("div");
    box.id = "jojova-cdn-test-notify";
    box.textContent = "JOJOVA TEST: GitHub CDN kodu calisti";

    box.style.position = "fixed";
    box.style.top = "16px";
    box.style.right = "16px";
    box.style.zIndex = "2147483647";
    box.style.background = "#111";
    box.style.color = "#ffe55c";
    box.style.border = "1px solid #ffe55c";
    box.style.borderRadius = "8px";
    box.style.padding = "10px 14px";
    box.style.fontFamily = "Arial, sans-serif";
    box.style.fontSize = "13px";
    box.style.fontWeight = "700";
    box.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";

    document.body.appendChild(box);

    setTimeout(function () {
      if (box && box.parentNode) box.parentNode.removeChild(box);
    }, 5000);
  } catch (e) {
    // no-op
  }
})();
