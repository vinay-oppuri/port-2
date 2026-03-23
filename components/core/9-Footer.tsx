"use client";

import { cloneElement, isValidElement, useEffect, useState } from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import Link from "next/link";
import { Loader2, MessageSquare, SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { socialLinks } from "@/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ResponsiveDialog } from "../responsive-dialog";

const Footer = () => {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    feedback: ""
  })
  const [loading, setLoading] = useState(false)
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)

  const renderMonochromeIcon = (icon: React.ReactNode) => {
    if (!isValidElement(icon)) return icon;

    return cloneElement(
      icon as React.ReactElement<{ className?: string }>,
      { className: "w-4 h-4 text-foreground/70!" }
    );
  }

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
        setIsFeedbackDialogOpen(false);
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
      <ResponsiveDialog
        title="Share Feedback"
        description="Tell me what you liked and what could be improved."
        open={isFeedbackDialogOpen}
        onOpenChange={setIsFeedbackDialogOpen}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleChange}
            className="bg-foreground/3! rounded-sm placeholder:text-muted-foreground/50 text-foreground text-xs md:text-base border border-white/5"
            required
          />
          <Textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Enter your feedback..."
            className="w-full bg-foreground/3! rounded-sm py-3 px-4 min-h-24 resize-none transition-all placeholder:text-muted-foreground/50 text-foreground text-xs md:text-base border border-white/5"
            required
          />
          <Button type="submit" disabled={loading} className="w-full text-xs md:text-base">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <SendIcon className="w-4 h-4 mr-2" />
            )}
            {loading ? "Sending..." : "Send Feedback"}
          </Button>
        </form>
      </ResponsiveDialog>

      <div className="w-full border-t border-foreground/10 py-6 mb-6 px-4 md:px-8 flex flex-wrap md:flex-nowrap justify-between items-center gap-y-6 md:gap-x-6 max-w-7xl mx-auto">
        <Link href="https://linktr.ee/vinayoppuri" target="_blank" rel="noopener noreferrer" className="order-1 md:order-1 md:mr-auto text-xs text-muted-foreground font-mono text-left hover:text-foreground transition-colors">
          {"// DEVELOPED_BY_VINAY"}
        </Link>

        <div className="order-3 md:order-2 w-full md:w-auto flex justify-center md:justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full md:w-auto h-11 md:h-9 rounded-full px-5! text-xs text-foreground/80 border-foreground/20 hover:border-foreground/40"
            onClick={() => setIsFeedbackDialogOpen(true)}
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Feedback
          </Button>
        </div>

        <div className="order-2 md:order-3 flex items-center gap-2">
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {renderMonochromeIcon(link.icon)}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
