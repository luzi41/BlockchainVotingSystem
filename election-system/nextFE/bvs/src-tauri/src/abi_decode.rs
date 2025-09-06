// src-tauri/src/abi_decode.rs
use ethers_core::abi::{decode, ParamType, Token};
use ethers_core::abi::param_type::Reader;
use std::str::FromStr;

/// Hilfsfunktion: Hex-String -> Bytes
fn hex_to_bytes(data: &str) -> Vec<u8> {
    let clean = data.trim_start_matches("0x");
    hex::decode(clean).expect("Invalid hex string")
}

/// Ergebnis eines `eth_call` decodieren
pub fn decode_uint(data: &str) -> u64 {
    let tokens = decode(&[ParamType::Uint(256)], &hex_to_bytes(data))
        .expect("Failed to decode uint");
    match tokens[0].clone() {
        Token::Uint(n) => n.as_u64(),
        _ => panic!("Unexpected token type"),
    }
}

pub fn decode_bool(data: &str) -> bool {
    let tokens = decode(&[ParamType::Bool], &hex_to_bytes(data))
        .expect("Failed to decode bool");
    match tokens[0].clone() {
        Token::Bool(b) => b,
        _ => panic!("Unexpected token type"),
    }
}

pub fn decode_string(data: &str) -> String {
    let tokens = decode(&[ParamType::String], &hex_to_bytes(data))
        .expect("Failed to decode string");
    match tokens[0].clone() {
        Token::String(s) => s,
        _ => panic!("Unexpected token type"),
    }
}

pub fn decode_address(data: &str) -> String {
    let tokens = decode(&[ParamType::Address], &hex_to_bytes(data))
        .expect("Failed to decode address");
    match tokens[0].clone() {
        Token::Address(addr) => format!("0x{}", hex::encode(addr.as_bytes())),
        _ => panic!("Unexpected token type"),
    }
}

pub fn decode_uint_array(data: &str) -> Vec<u64> {
    let tokens = decode(&[ParamType::Array(Box::new(ParamType::Uint(256)))], &hex_to_bytes(data))
        .expect("Failed to decode uint array");
    match tokens[0].clone() {
        Token::Array(arr) => arr.into_iter().map(|t| match t {
            Token::Uint(n) => n.as_u64(),
            _ => panic!("Unexpected element in array"),
        }).collect(),
        _ => panic!("Unexpected token type"),
    }
}

pub fn decode_address_array(data: &str) -> Vec<String> {
    let tokens = decode(&[ParamType::Array(Box::new(ParamType::Address))], &hex_to_bytes(data))
        .expect("Failed to decode address array");
    match tokens[0].clone() {
        Token::Array(arr) => arr.into_iter().map(|t| match t {
            Token::Address(addr) => format!("0x{}", hex::encode(addr.as_bytes())),
            _ => panic!("Unexpected element in array"),
        }).collect(),
        _ => panic!("Unexpected token type"),
    }
}

/// Hilfsfunktion: Hex-String -> Bytes
fn hex_to_bytes(data: &str) -> Vec<u8> {
    let clean = data.trim_start_matches("0x");
    hex::decode(clean).expect("Invalid hex string")
}

/// Generischer Decoder: Signatur + Hex -> Vec<Token>
pub fn decode_function_result(signature: &str, data: &str) -> Vec<Token> {
    // Beispiel signature: "tally():(uint256[])" oder "getStatus():(string)"
    // ethers-core kann ParamTypes parsen
    let parts: Vec<&str> = signature.split(':').collect();
    if parts.len() < 2 {
        panic!("Signature must include return types, e.g. 'getStatus():(string)'");
    }

    let output_types_str = parts[1].trim_start_matches('(').trim_end_matches(')');
    let mut output_types: Vec<ParamType> = vec![];

    if !output_types_str.is_empty() {
        let type_parts = output_types_str.split(',').collect::<Vec<_>>();
        for t in type_parts {
            let param = Reader::read(t).expect("Failed to parse return type");
            output_types.push(param);
        }
    }

    let tokens = decode(&output_types, &hex_to_bytes(data))
        .expect("Failed to decode function result");

    tokens
}

/// Hilfsfunktionen zum Umwandeln von Token → Rust
pub fn token_to_string(token: &Token) -> String {
    match token {
        Token::String(s) => s.clone(),
        Token::Address(addr) => format!("0x{}", hex::encode(addr.as_bytes())),
        Token::Uint(n) => n.to_string(),
        Token::Bool(b) => b.to_string(),
        other => format!("{:?}", other),
    }
}

pub fn token_to_u64(token: &Token) -> u64 {
    match token {
        Token::Uint(n) => n.as_u64(),
        _ => panic!("Expected uint"),
    }
}

pub fn token_to_string_array(token: &Token) -> Vec<String> {
    match token {
        Token::Array(arr) => arr.iter().map(token_to_string).collect(),
        _ => panic!("Expected array"),
    }
}

pub fn token_to_u64_array(token: &Token) -> Vec<u64> {
    match token {
        Token::Array(arr) => arr.iter().map(token_to_u64).collect(),
        _ => panic!("Expected array"),
    }
}

