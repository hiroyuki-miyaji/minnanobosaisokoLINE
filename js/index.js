const LIFF_ID = "2008561144-5WLWMVPP";

async function main() {
    debug("LIFF 初期化開始…");

    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
        debug("LIFF 未ログイン → login()");
        liff.login();
        return;
    }

    const profile = await liff.getProfile();
    const lineId = profile.userId;

    debug("LINE ID = " + lineId);

    document.getElementById("profileArea").innerText =
        `${profile.displayName} さんとしてログインしました`;

    // ここで API 呼び出し
    debug("getAdmin() 実行開始…");

    const admin = await getAdmin(lineId);

    debug("API応答：" + JSON.stringify(admin));

    // 管理者が未登録ならメニューを制限
    if (!admin || !admin.data || admin.data.registered === false) {
        debug("管理者未登録 → 管理者登録のみ表示");

        document.getElementById("btnWarehouse").style.display = "none";
        document.getElementById("btnList").style.display = "none";
    }
}

function debug(msg) {
    document.getElementById("debug").innerHTML += msg + "<br>";
}

main();
