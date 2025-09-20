// app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Wichtig: erzwingt dynamische Route, auch bei static export
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return NextResponse.json(users);
  } catch (e: any) {
    console.error("API ERROR:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
