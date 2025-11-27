const API_URL = "https://prod-56.japaneast.logic.azure.com:443/workflows/274fd28c939748a3aee0c6a1994e80b4/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=2Iqm_M4sYZSIkPMMYdUfRoimdrNfiEBYsKZbU50sImA";

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
