// js/liff.js  --- 共通ロジックのみ（UIは禁止）

const LIFF_ID = "2008561144-5WLWMVPP";

/**
 * デバッグ出力
 */
export function debug(msg) {
    console.log(msg);
    const area = document.getElementById("debugArea");
    if (area) area.innerHTML += msg + "<br>";
}

/**
 * LIFF 初期化（UIロジックは含めない）
 */
export async function initLiff() {
    try {
        debug("initLiff: start");

        await liff.init({ liffId: LIFF_ID });

        debug("initLiff: liff.init OK");

        if (!liff.isLoggedIn()) {
            debug("not logged in → login()");
            liff.login();
            return false;
        }
        return true;

    } catch (e) {
        debug("initLiff FAILED: " + e);
        return false;
    }
}

/**
 * プロフィール取得
 */
export async function getUserProfile() {
    try {
        const p = await liff.getProfile();
        debug("profile OK: " + p.userId);
        return p;
    } catch (e) {
        debug("profile FAILED: " + e);
        throw e;
    }
}
