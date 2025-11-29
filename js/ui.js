// ui.js — 共通ヘッダー・フッターを生成する

// ------------------------------
// ヘッダー描画
// ------------------------------
export function renderHeader(title = "") {
    const header = document.createElement("div");
    header.className = "app-header";

    header.innerHTML = `
        <div class="header-left" id="btnBack">←</div>
        <div class="header-title">${title}</div>
        <div class="header-right" id="btnHome">🏠</div>
    `;

    document.body.prepend(header);

    // 戻る
    document.getElementById("btnBack").addEventListener("click", () => {
        if (history.length > 1) history.back();
        else location.href = "./index.html"; // fallback
    });

    // ホームボタン → index.html へ
    document.getElementById("btnHome").addEventListener("click", () => {
        location.href = "./index.html";
    });
}

// ------------------------------
// フッター描画
// ------------------------------
export function renderFooter() {
    const footer = document.createElement("div");
    footer.className = "app-footer";
    footer.innerHTML = `
        <div class="footer-inner">
            <!-- 必要ならコピーライトなど -->
        </div>
    `;
    document.body.append(footer);
}
