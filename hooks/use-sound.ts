"use client";

import { Howl } from "howler";

let clickSound: Howl | null = null;
let lastPlayed = 0;

export const playClickSound = () => {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastPlayed <= 50) return;

  if (!clickSound) {
    clickSound = new Howl({
      src: ["/sounds/click.mp3"],
      volume: 0.1,
      preload: true,
    });
  }

  clickSound.play();
  lastPlayed = now;
};
