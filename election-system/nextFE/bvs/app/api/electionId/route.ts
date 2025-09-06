/*
import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

// Registry-Contract ABI (nur die Methode, die wir brauchen)
const registryAbi = [
  "function getElectionIdByContract(address contractAddress) view returns (uint)"
];

// Adresse deines Registry-Contracts
const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || "";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const contractAddress = url.searchParams.get("contract");
    if (!contractAddress) {
      return NextResponse.json({ error: "Missing contract address" }, { status: 400 });
    }

    // Verbindung zum Ethereum/Quorum Node
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

    const registry = new ethers.Contract(registryAddress, registryAbi, provider);

    const electionId: bigint = await registry.getElectionIdByContract(contractAddress);

    return NextResponse.json({ electionId: electionId.toString() });
  } catch (err: unknown) {
    console.error("Error fetching electionId:", err);
    return NextResponse.json({ error: "Failed to fetch electionId" }, { status: 500 });
  }
}
*/