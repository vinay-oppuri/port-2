import { z } from "zod";

const shortText = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const ContactFormSchema = z
  .object({
    name: shortText("Name", 2, 80),
    phone: z.string().trim().max(30, "Phone must be 30 characters or fewer.").optional().default(""),
    email: z.string().trim().email("Enter a valid email address.").max(254),
    message: shortText("Message", 10, 2000),
  })
  .strict();

export const FeedbackSchema = z
  .object({
    name: shortText("Name", 2, 80),
    feedback: shortText("Feedback", 10, 2000),
  })
  .strict();

export const ServerEnvSchema = z.object({
  RESEND_API_KEY: z.string().trim().min(1, "RESEND_API_KEY is required."),
});

export const ProjectStatusSchema = z.enum(["building", "operational"]);

export type ContactFormData = z.output<typeof ContactFormSchema>;
export type FeedbackData = z.output<typeof FeedbackSchema>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
