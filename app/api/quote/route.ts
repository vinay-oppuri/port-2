import { NextResponse } from "next/server";

export const revalidate = 86400;

export interface QuoteData {
  id?: number | string;
  content: string;
  author: string;
}

const MAX_QUOTE_LENGTH = 75;

const fallbackQuotes: QuoteData[] = [
  {
    id: 1,
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    content: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: 3,
    content: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    id: 4,
    content: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    id: 5,
    content: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    id: 6,
    content: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    id: 7,
    content: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    id: 8,
    content: "Think twice, code once.",
    author: "Anonymous",
  },
  {
    id: 9,
    content: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    id: 10,
    content: "It always seems impossible until it is done.",
    author: "Nelson Mandela",
  },
  {
    id: 11,
    content: "Less is more.",
    author: "Ludwig Mies van der Rohe",
  },
  {
    id: 12,
    content: "Whatever you are, be a good one.",
    author: "Abraham Lincoln",
  },
];

function getDayOfYear(): { dayOfYear: number; year: number } {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { dayOfYear, year: now.getFullYear() };
}

function getDailyFallbackQuote(): QuoteData {
  const { dayOfYear, year } = getDayOfYear();
  const index = Math.abs((year * 365 + dayOfYear) % fallbackQuotes.length);
  return fallbackQuotes[index];
}

export async function GET() {
  try {
    const { dayOfYear, year } = getDayOfYear();
    // Deterministic page and quote index based on the day of the year so it stays constant throughout the day
    const page = ((year * 365 + dayOfYear) % 30) + 1;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(
      `https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=10`,
      {
        next: { revalidate: 86400 },
        signal: controller.signal,
        headers: { Accept: "application/json" },
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      const items: Array<{ id: number; content: string; author: string }> =
        result?.data?.data ?? [];

      const shortQuotes = items.filter(
        (q) => q.content && q.author && q.content.trim().length <= MAX_QUOTE_LENGTH
      );

      if (shortQuotes.length > 0) {
        const pickedIndex = Math.abs(dayOfYear % shortQuotes.length);
        const picked = shortQuotes[pickedIndex];

        return NextResponse.json(
          {
            success: true,
            data: {
              id: picked.id,
              content: picked.content.trim(),
              author: picked.author.trim(),
            },
          },
          {
            status: 200,
            headers: {
              "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
            },
          }
        );
      }
    }
  } catch (error) {
    console.error("FreeAPI quote fetch error (serving daily fallback):", error);
  }

  const dailyQuote = getDailyFallbackQuote();
  return NextResponse.json(
    {
      success: true,
      data: dailyQuote,
      fallback: true,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    }
  );
}