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
        return { result: "error", message: "network_error" };
    }

    let json = null;

    try {
        json = await res.json();
    } catch (e) {
        console.error("JSON parse error:", e);
        return { result: "error", message: "json_parse_error" };
    }

    console.log("▼ API Response:", json);

    // ===== 正常応答(result = success) =====
    if (res.ok && json?.result === "success") {
        return json;
    }

    // ===== LogicApps の error 応答 =====
    if (json?.result === "error") {
        return json;
    }

    // ===== HTTPエラー =====
    return {
        result: "error",
        message: "http_error",
        status: res.status
    };
}


// ========================================
// API ラッパー関数
// ========================================

// 管理者取得
async function getAdmin(lineId) {
    return await callApi({
        action: "getAdmin",
        LINEID: lineId
    });
}

// 管理者登録
async function registerAdmin(data) {
    return await callApi({
        action: "registerAdmin",
        ...data
    });
}

// 倉庫一覧
async function listWarehouses(lineId) {
    return await callApi({
        action: "listWarehouses",
        LINEID: lineId
    });
}

// 倉庫詳細
async function getWarehouseDetail(data) {
    return await callApi({
        action: "getWarehouseDetail",
        ...data
    });
}

// 倉庫登録
async function registerWarehouse(data) {
    return await callApi({
        action: "registerWarehouse",
        ...data
    });
}

// 倉庫更新
async function updateWarehouse(data) {
    return await callApi({
        action: "updateWarehouse",
        ...data
    });
}

// 紐付け解除
async function deleteWarehouse(data) {
    return await callApi({
        action: "deleteWarehouse",
        ...data
    });
}

// 操作(施錠/解錠)
async function operateWarehouse(data) {
    return await callApi({
        action: "operateWarehouse",
        ...data
    });
}
