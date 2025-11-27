// ==========================
// API 共通設定
// ==========================
const API_URL =
  "https://prod-56.japaneast.logic.azure.com:443/workflows/274fd28c939748a3aee0c6a1994e80b4/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=2Iqm_M4sYZSIkPMMYdUfRoimdrNfiEBYsKZbU50sImA";

// 共通 POST
async function callApi(body) {
    console.log("▶ API Request:", body);

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const msg = await res.text();
        console.error("API Error:", msg);
        return null;
    }

    const json = await res.json();
    console.log("▼ API Response:", json);
    return json;
}

// ==========================
// API ラッパー群
// ==========================

// 管理者情報取得
async function getAdmin(lineId) {
    return await callApi({
        action: "getAdmin",
        LINEID: lineId
    });
}

// 管理者登録・更新
async function registerAdmin(data) {
    return await callApi({
        action: "registerAdmin",
        ...data
    });
}

// 管理中の倉庫一覧取得
async function listWarehouses(lineId) {
    return await callApi({
        action: "listWarehouses",
        LINEID: lineId
    });
}

// 倉庫の詳細情報取得
async function getWarehouseDetail(data) {
    return await callApi({
        action: "getWarehouseDetail",
        ...data
    });
}

// 管理者用：倉庫追加（紐づけ登録のみ）
async function registerWarehouse(data) {
    return await callApi({
        action: "registerWarehouse",
        ...data
    });
}

// 倉庫の更新（備蓄品・暗証番号）
async function updateWarehouse(data) {
    return await callApi({
        action: "updateWarehouse",
        ...data
    });
}

// 倉庫の削除（紐づけ解除）
async function deleteWarehouse(data) {
    return await callApi({
        action: "deleteWarehouse",
        ...data
    });
}

// 施錠 / 解錠
async function operateWarehouse(data) {
    return await callApi({
        action: "operateWarehouse",
        ...data
    });
}
