// js/api.js

const API_URL =
 "https://prod-56.japaneast.logic.azure.com:443/workflows/274fd28c939748a3aee0c6a1994e80b4/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=2Iqm_M4sYZSIkPMMYdUfRoimdrNfiEBYsKZbU50sImA";

async function callApi(body) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        console.error(await res.text());
        return null;
    }
    return res.json();
}

// -------------------------------
// 個別 API ラッパー
// -------------------------------

// ★ 管理者取得
async function getAdmin(LINEID) {
    return await callApi({
        action: "getAdmin",
        LINEID
    });
}

// ★ 管理者登録・更新
async function registerAdmin(data) {
    return await callApi({
        action: "registerAdmin",
        ...data
    });
}

// ★ 倉庫一覧取得
async function listWarehouses(LINEID) {
    return await callApi({
        action: "listWarehouses",
        LINEID
    });
}

// ★ 倉庫詳細（編集画面用）
async function getWarehouseDetail(number, LINEID) {
    return await callApi({
        action: "getWarehouseDetail",
        number,
        LINEID
    });
}

// ★ 倉庫登録
async function registerWarehouse(data) {
    return await callApi({
        action: "registerWarehouse",
        ...data
    });
}

// ★ 倉庫更新
async function updateWarehouse(data) {
    return await callApi({
        action: "updateWarehouse",
        ...data
    });
}

// ★ 倉庫削除
async function deleteWarehouse(number, LINEID) {
    return await callApi({
        action: "deleteWarehouse",
        number,
        LINEID
    });
}

// ★ 施錠/通知解錠/非通知解錠
async function operateWarehouse(data) {
    return await callApi({
        action: "operateWarehouse",
        ...data
    });
}
