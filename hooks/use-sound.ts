"use client";

let clickSound: import("howler").Howl | null = null;
let lastPlayed = 0;

export const playClickSound = () => {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastPlayed <= 50) return;

  if (!clickSound) {
    import("howler").then(({ Howl }) => {
      clickSound = new Howl({
        src: ["/sounds/click.mp3"],
        volume: 0.1,
        preload: true,
      });
      clickSound.play();
    });
  } else {
    clickSound.play();
  }

  lastPlayed = now;
};
