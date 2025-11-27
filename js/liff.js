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
