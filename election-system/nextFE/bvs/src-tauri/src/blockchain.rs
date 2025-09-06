use serde_json::json;
use crate::abi;
use crate::abi_decode::{decode_function_result, token_to_string, token_to_u64_array};

/// Low-Level JSON-RPC Call
async fn rpc_call(rpc_url: &str, method: &str, params: serde_json::Value) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let payload = json!({
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": 1,
    });

    let res = client.post(rpc_url)
        .json(&payload)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let body: serde_json::Value = res.json()
        .await
        .map_err(|e| format!("Invalid JSON response: {}", e))?;

    if body.get("error").is_some() {
        return Err(format!("RPC Error: {}", body["error"]));
    }

    Ok(body["result"].clone())
}

/// Beispiel: Stimme abgeben (vote(uint256))
#[tauri::command]
pub async fn send_vote(rpc_url: String, contract_address: String, from: String, proposal_id: u64) -> Result<String, String> {
    let data = abi::encode_uint("vote(uint256)", proposal_id);

    let params = json!([{
        "from": from,
        "to": contract_address,
        "gas": "0x5208",
        "data": data
    }]);

    let result = rpc_call(&rpc_url, "eth_sendTransaction", params).await?;
    Ok(result.to_string())
}

/// Beispiel: Ergebnisse abfragen (tally())
#[tauri::command]
pub async fn get_results(rpc_url: String, contract_address: String) -> Result<String, String> {
    let data = abi::encode_function_call("tally()", vec![]);

    let params = json!([{
        "to": contract_address,
        "data": data
    }, "latest"]);

    let result = rpc_call(&rpc_url, "eth_call", params).await?;
    Ok(result.to_string())
}

/// Beispiel: Status abfragen (getStatus())
#[tauri::command]
pub async fn get_election_status(rpc_url: String, contract_address: String) -> Result<String, String> {
    let data = abi::encode_function_call("getStatus()", vec![]);

    let params = json!([{
        "to": contract_address,
        "data": data
    }, "latest"]);

    let result = rpc_call(&rpc_url, "eth_call", params).await?;
    Ok(result.to_string())
}
#[tauri::command]
pub async fn get_results(rpc_url: String, contract_address: String) -> Result<Vec<u64>, String> {
    let data = crate::abi::encode_function_call("tally()", vec![]);
    let params = serde_json::json!([{
        "to": contract_address,
        "data": data
    }, "latest"]);

    let result = super::rpc_call(&rpc_url, "eth_call", params).await?;
    let decoded = abi_decode::decode_uint_array(result.as_str().unwrap());
    Ok(decoded)
}

#[tauri::command]
pub async fn get_election_status(rpc_url: String, contract_address: String) -> Result<String, String> {
    let data = crate::abi::encode_function_call("getStatus()", vec![]);
    let params = serde_json::json!([{
        "to": contract_address,
        "data": data
    }, "latest"]);

    let result = super::rpc_call(&rpc_url, "eth_call", params).await?;
    let tokens = decode_function_result("getStatus():(string)", result.as_str().unwrap());
    Ok(token_to_string(&tokens[0]))
}

#[tauri::command]
pub async fn get_results(rpc_url: String, contract_address: String) -> Result<Vec<u64>, String> {
    let data = crate::abi::encode_function_call("tally()", vec![]);
    let params = serde_json::json!([{
        "to": contract_address,
        "data": data
    }, "latest"]);

    let result = super::rpc_call(&rpc_url, "eth_call", params).await?;
    let tokens = decode_function_result("tally():(uint256[])", result.as_str().unwrap());
    let values = token_to_u64_array(&tokens[0]);
    Ok(values)
}