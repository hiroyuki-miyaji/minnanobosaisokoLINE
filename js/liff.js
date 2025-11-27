// js/liff.js
// ----------------------------------
// LIFF 共通処理 & デバッグ
// ----------------------------------

// デバッグ表示
function debug(msg) {
    console.log(msg);
    const area = document.getElementById("debugArea");
    if (area) area.innerHTML += msg + "<br>";
}

// LIFF初期化
async function initLiff(liffId) {
    debug("liff.init start");

    if (typeof liff === "undefined") {
        debug("ERROR: liff is not defined (SDK未ロード)");
        throw new Error("liff is not defined");
    }

    await liff.init({ liffId });
    debug("liff.init OK");

    if (!liff.isLoggedIn()) {
        debug("not logged in → login()");
        liff.login();
        return null;
    }
    debug("already logged in");
    return true;
}

// LINE userId を取得
async function getLineId() {
    const profile = await liff.getProfile();
    return profile.userId;
}

// グローバルエラー捕捉
window.addEventListener("error", (e) => {
    debug("[GlobalError] " + e.message);
});

// 関数を外部から使えるようにする
window.initLiff = initLiff;
window.getLineId = getLineId;
