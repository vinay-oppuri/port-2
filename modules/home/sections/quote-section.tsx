"use client";

import { useEffect, useState } from "react";
import { Quote as QuoteIcon } from "lucide-react";
import { motion } from "motion/react";

interface QuoteItem {
  id?: number | string;
  content: string;
  author: string;
}

export default function QuoteSection() {
  const [quote, setQuote] = useState<QuoteItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchQuote = async () => {
      try {
        const res = await fetch("/api/quote");
        if (!res.ok) throw new Error("Failed to fetch quote");
        const data = await res.json();
        if (isMounted && data?.data) {
          setQuote(data.data);
        }
      } catch (error) {
        console.error("Error fetching daily quote:", error);
        if (isMounted) {
          setQuote({
            content: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuote();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="relative clay-card p-5 md:p-6 overflow-hidden">
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted/60 rounded animate-pulse" />
            <div className="flex justify-start items-center pt-2">
              <div className="h-3 w-28 bg-muted/60 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative clay-card p-5 md:p-6 overflow-hidden"
      >
        {/* Background decorative watermark */}
        <QuoteIcon
          className="absolute bottom-0 left-10 w-24 h-24 text-foreground/5 pointer-events-none select-none rotate-12"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-3 relative z-10">
            <blockquote className="text-xs md:text-sm font-mono tracking-tight text-foreground/70 leading-relaxed italic">
              &ldquo;{quote.content}&rdquo;
            </blockquote>

          <div className="pt-2 flex items-end justify-end">
            <span className="text-xs font-mono text-muted-foreground">
              — {quote.author}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
