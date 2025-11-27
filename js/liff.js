// js/liff.js
async function initLiff(liffId) {
    await liff.init({ liffId });
    if (!liff.isLoggedIn()) {
        liff.login();
        return;
    }
}

async function getLineId() {
    const profile = await liff.getProfile();
    return profile.userId;
}

window.LIFF_ID = "2008561144-5WLWMVPP";

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
