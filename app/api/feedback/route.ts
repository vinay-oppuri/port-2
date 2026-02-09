
import { FeedbackTemplate } from "@/components/feedback-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { feedback, name } = await req.json()

        const { data, error } = await resend.emails.send({
            from: 'Feedback-Vinay <onboarding@resend.dev>',
            to: ['oppurivinay25@gmail.com'],
            subject: `New Feedback from ${name}`,
            react: FeedbackTemplate({ feedback, name })
        })

        if (error) {
            console.error('Resend API Error: ', error)
            return Response.json({ error }, { status: 500 })
        }

        return Response.json(data)
    } catch (error) {
        console.error('Internal Server Error: ', error)
        return Response.json({ error }, { status: 500 })
    }
}