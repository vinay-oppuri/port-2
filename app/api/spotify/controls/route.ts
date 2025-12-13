import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const action = body?.action;
    const deviceId = body?.deviceId; // Get deviceId from frontend

    if (action !== "play" && action !== "pause") {
      return NextResponse.json(
        { success: false, reason: "INVALID_ACTION" },
        { status: 400 }
      );
    }

    const token = await getAccessToken();

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

    // ✅ SUCCESS
    if (res.status === 204) {
      return NextResponse.json({ success: true });
    }

    // ✅ NO ACTIVE DEVICE (normal, NOT error)
    if (res.status === 404) {
      // If we tried to PLAY and got 404
      if (action === "play") {
        const { transferPlayback, getAvailableDevices } = await import(
          "@/lib/spotify-helper"
        );

        // 1. If frontend sent a specific deviceId (SDK), try that FIRST (fastest)
        if (deviceId) {
          await transferPlayback(deviceId);
          return NextResponse.json({
            success: true,
            message: "Transferred to SDK device",
          });
        }

        // 2. Fallback: Search for other available devices
        const devices = await getAvailableDevices();
        if (devices.length > 0) {
          await transferPlayback(devices[0].id);
          return NextResponse.json({
            success: true,
            message: "Transferred to available device",
          });
        }
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
