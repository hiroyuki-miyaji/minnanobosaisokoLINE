const LIFF_ID = "2008561144-5WLWMVPP";

async function getUserId() {
    await liff.init({ liffId: LIFF_ID });
    if (!liff.isLoggedIn()) liff.login();
    const profile = await liff.getProfile();
    return profile.userId;
}
