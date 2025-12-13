// app/api/spotify/token/route.ts
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    return NextResponse.json({ accessToken });
  } catch (error: any) {
    console.error("Token generation error:", error);
    return NextResponse.json({ error: error.message || "Token error", details: error.toString() }, { status: 500 });
  }
}