// ========================================
// js/api.js
// LogicApps 統合 API 呼び出し（共通）
// ========================================

// ---- LogicApps の HTTP Endpoint ----
const API_URL =
  "https://prod-56.japaneast.logic.azure.com:443/workflows/274fd28c939748a3aee0c6a1994e80b4/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=2Iqm_M4sYZSIkPMMYdUfRoimdrNfiEBYsKZbU50sImA";


// ========================================
// 共通 POST メソッド
// ========================================
async function callApi(body) {
    console.log("▶ API Request:", body);

    let res;
    try {
        res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (e) {
        console.error("API fetch error:", e);
        return { result: "error", message: "network_error", detail: e };
    }

    let json = null;

    try {
        json = await res.json();
    } catch (e) {
        console.error("JSON parse error:", e);
        return { result: "error", message: "json_parse_error", detail: e };
    }

    console.log("▼ API Response:", json);

    // ✔ LogicApps が成功 → 200
    if (res.ok && json?.result === "success") {
        return json;
    }

    // ✔ LogicApps が返したエラー
    if (json?.result === "error") {
        return json;
    }

    // ✔ HTTP エラー（想定外）
    return {
        result: "error",
        message: "http_error",
        status: res.status,
        detail: json
    };
}


// ========================================
// API ラッパー関数群
// （LIFF → LogicApps に送る payload を統一）
// ========================================

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

// 倉庫一覧を取得
async function listWarehouses(lineId) {
    return await callApi({
        action: "listWarehouses",
        LINEID: lineId
    });
}

// 倉庫詳細取得
async function getWarehouseDetail(data) {
    return await callApi({
        action: "getWarehouseDetail",
        ...data
    });
}

// 倉庫紐づけ（管理者が追加）
async function registerWarehouse(data) {
    return await callApi({
        action: "registerWarehouse",
        ...data
    });
}

// 備蓄品・暗証番号 更新
async function updateWarehouse(data) {
    return await callApi({
        action: "updateWarehouse",
        ...data
    });
}

// 紐づけ解除
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
