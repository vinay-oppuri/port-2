"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setErrorMessage('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen mx-auto px-4 md:px-8 py-4 md:py-8">

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

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center border border-border/60 rounded-xl bg-card/40 p-6">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 animate-in zoom-in-50 duration-300" />
            <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Thank you for reaching out. I will get back to you as soon as possible.
            </p>
            <Button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setErrorMessage(null);
              }}
              variant="outline"
              className="mt-4 text-xs cursor-pointer"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Name *</label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="px-4 py-5 bg-background border-border text-sm md:text-base"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-sm font-semibold text-foreground">Phone *</label>
                <Input
                  id="contact-phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) xxx-xxxx"
                  className="px-4 py-5 bg-background border-border text-sm md:text-base"
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
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="px-4 py-5 bg-background border-border text-sm md:text-base"
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
                required
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="relative mt-4 pl-8! w-40 flex gap-2 text-xs md:text-sm">
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <div className="absolute left-0.5 p-2 bg-background text-foreground rounded-sm"><SendIcon className="w-4 h-4" /></div>
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
