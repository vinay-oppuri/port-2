import { NextResponse } from "next/server";
import { play, pause } from "@/lib/spotify-helper";

export async function POST(req: Request) {
    const { action } = await req.json();

    try {
        if (action === "play") {
            await play();
        } else if (action === "pause") {
            await pause();
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
