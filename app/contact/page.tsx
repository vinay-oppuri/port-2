"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/common/loading-state";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  if(!mounted) return <LoadingScreen/>

  return (
    <section className="w-full min-h-screen mx-auto px-6 md:px-10 py-6 md:py-12">

      <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-4 md:mb-8 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold">Contact</h1>

        <p className="text-md md:text-xl text-muted-foreground font-semibold">
          Get in touch with me. I will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Send me a message</h2>
        <p className="text-muted-foreground mb-8">
          Fill out the form below and I will get back to you as soon as possible.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground">Name *</label>
              <Input
                placeholder="Your full name"
                className="px-4 py-5 bg-background border-border text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground">Phone *</label>
              <Input
                placeholder="+1 (123) xxx-xxxx"
                className="px-4 py-5 bg-background border-border text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Email *</label>
            <Input
              placeholder="your.email@example.com"
              className="px-4 py-5 bg-background border-border text-sm md:text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Message *</label>
            <Textarea
              placeholder="Tell me about your project or just say hello..."
              className="min-h-40 px-4 py-5 bg-background border-border text-sm md:text-base"
            />
          </div>

          <Button
            type="submit"
            className="mt-4 px-6 py-5 flex items-center gap-2 text-sm md:text-base">
            <SendIcon className="w-4 h-4" />
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}