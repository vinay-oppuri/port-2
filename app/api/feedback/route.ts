import { FeedbackTemplate } from "@/components/feedback-template";
import { getServerEnv } from "@/lib/env";
import { checkRateLimit, getClientIp, isAllowedOrigin } from "@/lib/rate-limit";
import { FeedbackSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const rateLimit = {
  limit: 3,
  windowMs: 60_000,
};

const jsonHeaders = {
  "Cache-Control": "no-store",
};

function jsonError(message: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json(
    { ok: false, message },
    {
      status,
      headers: {
        ...jsonHeaders,
        ...headers,
      },
    }
  );
}

function safeSubjectName(name: string) {
  return name.replace(/[\r\n]+/g, " ").slice(0, 80);
}

async function readJson(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonError("Request origin is not allowed.", 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Expected a JSON request body.", 415);
  }

  const clientIp = getClientIp(request);
  const limit = checkRateLimit(`feedback:${clientIp}`, rateLimit);

  if (!limit.allowed) {
    return jsonError("Too many requests. Please try again shortly.", 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const payload = FeedbackSchema.safeParse(await readJson(request));

  if (!payload.success) {
    return jsonError("Please check the feedback fields and try again.", 400);
  }

  try {
    const { RESEND_API_KEY } = getServerEnv();
    const resend = new Resend(RESEND_API_KEY);
    const { feedback, name } = payload.data;

    const { data, error } = await resend.emails.send({
      from: "Feedback-Vinay <onboarding@resend.dev>",
      to: ["oppurivinay25@gmail.com"],
      subject: `New Feedback from ${safeSubjectName(name)}`,
      react: FeedbackTemplate({ feedback, name }),
    });

    if (error) {
      console.error("Resend feedback error:", error);
      return jsonError("Feedback could not be sent right now. Please try again later.", 502);
    }

    return NextResponse.json(
      {
        ok: true,
        id: data?.id ?? null,
        message: "Feedback sent successfully.",
      },
      {
        status: 200,
        headers: jsonHeaders,
      }
    );
  } catch (error) {
    console.error("Feedback route error:", error);
    return jsonError("Feedback could not be sent right now. Please try again later.", 500);
  }
}
