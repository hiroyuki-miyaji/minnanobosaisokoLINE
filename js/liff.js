// js/liff.js

function debug(msg) {
    console.log(msg);
    const area = document.getElementById("debugArea");
    if (area) area.innerHTML += msg + "<br>";
}

// ★ LIFF SDK ロード待ち
function waitForLiff() {
    return new Promise(resolve => {
        if (window.liff) {
            resolve();
            return;
        }
        const timer = setInterval(() => {
            if (window.liff) {
                clearInterval(timer);
                resolve();
            }
        }, 50);
    });
}

async function initLiff(liffId) {
    debug("init start...");

    // ★ SDK がロードされるまで絶対に待つ
    await waitForLiff();

    debug("liff detected. calling liff.init()...");

    try {
        await liff.init({ liffId });
        debug("liff.init OK");
    } catch (e) {
        debug("liff.init FAILED: " + e);
        throw e;
    }

    if (!liff.isLoggedIn()) {
        debug("not logged in → login()");
        liff.login();
        return;
    }
    debug("already logged in");
}

window.initLiff = initLiff;
