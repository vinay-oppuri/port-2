"use client";

import { useState } from "react";
import { Loader2, MessageSquare, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveDialog } from "../responsive-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const FeedbackDialog = () => {
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.feedback.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Feedback sent successfully!");
        setFormData({ name: "", feedback: "" });
        setOpen(false);
      } else {
        toast.error("Failed to send feedback.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveDialog
      title="Share Feedback"
      description="Tell me what you liked and what could be improved."
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-auto h-11 md:h-9 rounded-full px-5! text-xs text-foreground/80 border-foreground/20 hover:border-foreground/40"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          Feedback
        </Button>
      }
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
  );
};
