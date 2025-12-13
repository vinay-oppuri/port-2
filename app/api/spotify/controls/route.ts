import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const action = body?.action;
    const deviceId = body?.deviceId; // Get deviceId from frontend

    console.log(`[Spotify Controls] Received request: action=${action}, deviceId=${deviceId}`);

    if (action !== "play" && action !== "pause") {
      return NextResponse.json(
        { success: false, reason: "INVALID_ACTION" },
        { status: 400 }
      );
    }

    const token = await getAccessToken();

    // STRICT MODE: If we have a specific deviceId (SDK) and want to PLAY,
    // use transferPlayback directly. This is more reliable than /play?device_id
    // because it wakes up the device and sets it as active in one go.
    if (action === "play" && deviceId) {
      console.log(`[Spotify Controls] Strictly transferring playback to SDK device: ${deviceId}`);
      const { transferPlayback } = await import("@/lib/spotify-helper");

      await transferPlayback(deviceId);
      return NextResponse.json({ success: true, message: "Playback started on Web SDK" });
    }

    const endpoint =
      action === "play"
        ? "https://api.spotify.com/v1/me/player/play"
        : "https://api.spotify.com/v1/me/player/pause";

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(`[Spotify Controls] Spotify API response: ${res.status}`);

    // ✅ SUCCESS
    if (res.status === 204) {
      return NextResponse.json({ success: true });
    }

    // ✅ NO ACTIVE DEVICE (normal, NOT error)
    if (res.status === 404) {
      console.log("[Spotify Controls] 404 No Active Device. Attempting recovery...");
      // If we tried to PLAY and got 404
      if (action === "play") {
        const { transferPlayback, getAvailableDevices } = await import(
          "@/lib/spotify-helper"
        );

        // 1. If frontend sent a specific deviceId (SDK), try that FIRST (fastest)
        if (deviceId) {
          console.log(`[Spotify Controls] Transferring playback to SDK device: ${deviceId}`);
          await transferPlayback(deviceId);
          return NextResponse.json({
            success: true,
            message: "Transferred to SDK device",
          });
        }

        console.log("[Spotify Controls] No SDK deviceId provided. Cannot transfer.");
        // REMOVED fallback search for other devices as per user request.

        return NextResponse.json({
          success: false,
          reason: "NO_ACTIVE_DEVICE",
          message: "Web Player not ready",
        });
      }

      return NextResponse.json({
        success: false,
        reason: "NO_ACTIVE_DEVICE",
        message: "Open Spotify app or Web Player",
      });
    }

    // ✅ FORBIDDEN (premium / playback restriction)
    if (res.status === 403) {
      return NextResponse.json({
        success: false,
        reason: "FORBIDDEN",
        message: "Playback not allowed",
      });
    }

    // ⚠️ Unexpected but handled
    return NextResponse.json({
      success: false,
      reason: "UNKNOWN",
      status: res.status,
    });
  } catch (err) {
    console.error("Spotify controls crash:", err);
    return NextResponse.json({
      success: false,
      reason: "INTERNAL_ERROR",
    });
  }
}
