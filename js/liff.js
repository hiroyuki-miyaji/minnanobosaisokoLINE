// js/liff.js
// LIFF 共通デバッグ機能

function debug(msg) {
    console.log(msg);
    const area = document.getElementById("debugArea");
    if (area) {
        area.innerHTML += msg + "<br>";
    }
}

// グローバル例外キャッチ
window.addEventListener("error", function (event) {
    debug("[GlobalError] " + event.message);
});
