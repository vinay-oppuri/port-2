import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}