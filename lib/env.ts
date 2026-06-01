import "server-only";

import { ServerEnvSchema } from "@/lib/schemas";

export function getServerEnv() {
  const parsed = ServerEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  });

  if (!parsed.success) {
    throw new Error("Server environment is missing required email configuration.");
  }

  return parsed.data;
}
