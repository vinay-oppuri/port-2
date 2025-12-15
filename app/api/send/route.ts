
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, phone, email, message } = await req.json();

        const { data, error } = await resend.emails.send({
            from: 'Portfolio-Vinay <onboarding@resend.dev>',
            to: ['oppurivinay25@gmail.com'],
            subject: `New Message from ${name}`,
            replyTo: email,
            react: EmailTemplate({ name, phone, email, message }),
        });

        if (error) {
            console.error('Resend API Error:', error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Internal Server Error:', error);
        return Response.json({ error }, { status: 500 });
    }
}