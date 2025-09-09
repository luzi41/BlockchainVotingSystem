/*
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public/contracts/Bundestagswahl.sol", "Bundestagswahl.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const abi = JSON.parse(jsonData);
    return NextResponse.json({ abi });
  } catch (err: any) {  
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
*/