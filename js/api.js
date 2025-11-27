const API_URL = "https://prod-49.japaneast.logic.azure.com:443/workflows/6506d34d5ae94bdcb61ca0c6bf5ff23d/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=om4cTi9hss7-usRhKWnT9n9AIuMN9qq88GGtvZhmmvw";

async function callApi(body) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const msg = await res.text();
        console.error(msg);
        alert("APIエラー: " + msg);
        return null;
    }

    return res.json();
}
