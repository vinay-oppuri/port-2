"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ApiResponse = {
  message?: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => ({}))) as ApiResponse;

      if (response.ok) {
        toast.success(result.message ?? 'Message sent successfully!');
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error(result.message ?? 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full min-h-screen mx-auto px-6 md:px-10 py-4 md:py-8">

      <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-8 pb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">Contact</h1>

        <p className="text-sm md:text-lg text-muted-foreground font-semibold">
          Get in touch with me. I will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Send me a message</h2>
        <p className="text-muted-foreground mb-8">
          Fill out the form below and I will get back to you as soon as possible.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Name *</label>
              <Input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="px-4 py-5 bg-background border-border text-sm md:text-base"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-phone" className="text-sm font-semibold text-foreground">Phone *</label>
              <Input
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (123) xxx-xxxx"
                className="px-4 py-5 bg-background border-border text-sm md:text-base"
                autoComplete="tel"
                maxLength={30}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-foreground">Email *</label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="px-4 py-5 bg-background border-border text-sm md:text-base"
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">Message *</label>
            <Textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or just say hello..."
              className="min-h-40 px-4 py-5 bg-background border-border text-sm md:text-base"
              minLength={10}
              maxLength={2000}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center gap-2 text-xs md:text-sm">
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
