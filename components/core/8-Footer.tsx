"use client";

import { useEffect, useState } from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import Link from "next/link";
import { ArrowRight, Loader2, SendIcon } from "lucide-react";
import { AvatarLogo } from "../common/AvatarLogo";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { socialLinks } from "@/lib/hero.config";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Footer = () => {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    feedback: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.feedback.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Feedback sent successfully!');
        setFormData({ name: "", feedback: "" });
      } else {
        toast.error('Failed to send feedback.');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <footer className="w-full relative overflow-hidden px-2 md:py-4 py-2 mb-0 bg-background">
      {/* Pre-footer large text */}
      <div className="h-70 flex items-center justify-center md:py-6 py-0 mb-0">
        <TextHoverEffect text="ViNAY" />
      </div>

      <div className="w-full mx-auto px-4 md:px-8 border-t border-foreground/10 pt-8 md:pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16 max-w-7xl mx-auto">
          {/* Left Side: Brand & Description */}
          <div className="flex flex-col gap-4 max-w-md text-center md:text-left mx-auto md:mx-0">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <AvatarLogo className="w-full h-full rounded-full text-ring" />
              </div>
              <span className="text-xl font-bold tracking-wider text-foreground">ViNAY OPPURI</span>
            </div>

            <p className="text-muted-foreground">
              I&apos;m a software engineer who loves building cool stuff, passionate about technology and always looking for new challenges.
            </p>
          </div>

          {/* Right Side: Feedback Form */}
          <form className="space-y-4 w-full max-w-sm mx-auto md:mx-0" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={formData.name}
              onChange={handleChange}
              className="bg-background/50 placeholder:text-muted-foreground/50 text-foreground" 
              required
            />
            <Textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter your feedback..."
              className="w-full rounded-lg py-3 px-4 min-h-[100px] resize-none transition-all placeholder:text-muted-foreground/50 text-foreground bg-background/50"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <SendIcon className="w-4 h-4 mr-2" />
              )}
              {loading ? "Sending..." : "Send Feedback"}
            </Button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="w-full hidden border-t border-foreground/10 py-8 md:flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-4 max-w-7xl mx-auto">
          <Link href="https://linktr.ee/vinayoppuri" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground font-mono text-center md:text-left hover:text-foreground transition-colors">
                // DEVELOPED_BY_VINAY_OPPURI
          </Link>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {socialLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    {link.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <div className="hidden md:block h-4 w-px bg-foreground/10 mx-2"></div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-foreground/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-green-500">ALL SYSTEMS NORMAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;