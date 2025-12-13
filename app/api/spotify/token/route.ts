// app/api/spotify/token/route.ts
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("[API] Token Error:", error);
    return NextResponse.json({ error: "Token error" }, { status: 500 });
  }
}