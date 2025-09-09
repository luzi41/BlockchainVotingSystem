// src-tauri/src/abi.rs
use ethers_core::abi::{AbiEncode, Token};
use ethers_core::utils::keccak256;

/// Hilfsfunktion: Function-Selector berechnen (erste 4 Bytes von Keccak256 Hash)
pub fn selector(signature: &str) -> String {
    let hash = keccak256(signature.as_bytes());
    format!("0x{}", hex::encode(&hash[..4]))
}

/// Hilfsfunktion: Beliebige Argumente ABI-konform encoden
pub fn encode_args(tokens: Vec<Token>) -> String {
    format!("0x{}", hex::encode(tokens.encode()))
}

/// Hilfsfunktion: Function Call (Selector + Encoded Args)
pub fn encode_function_call(signature: &str, args: Vec<Token>) -> String {
    let sel = selector(signature);
    let encoded = encode_args(args);
    format!("{}{}", sel, &encoded[2..])
}

/// Convenience-Wrapper für einzelne Typen:

pub fn encode_address(signature: &str, address: &str) -> String {
    let addr = address.trim_start_matches("0x");
    let addr_bytes = hex::decode(addr).expect("Invalid hex address");
    encode_function_call(signature, vec![Token::Address(addr_bytes.into())])
}

pub fn encode_uint(signature: &str, value: u64) -> String {
    encode_function_call(signature, vec![Token::Uint(value.into())])
}

pub fn encode_string(signature: &str, value: &str) -> String {
    encode_function_call(signature, vec![Token::String(value.to_string())])
}

pub fn encode_bool(signature: &str, value: bool) -> String {
    encode_function_call(signature, vec![Token::Bool(value)])
}

pub fn encode_uint_array(signature: &str, values: Vec<u64>) -> String {
    let tokens: Vec<Token> = values.into_iter().map(|v| Token::Uint(v.into())).collect();
    encode_function_call(signature, vec![Token::Array(tokens)])
}

pub fn encode_address_array(signature: &str, values: Vec<&str>) -> String {
    let tokens: Vec<Token> = values.into_iter().map(|v| {
        let clean = v.trim_start_matches("0x");
        let addr_bytes = hex::decode(clean).expect("Invalid address");
        Token::Address(addr_bytes.into())
    }).collect();
    encode_function_call(signature, vec![Token::Array(tokens)])
}
