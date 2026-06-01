"use client";

import { Howl } from "howler";

export const clickSound = new Howl({
  src: ["/sounds/click.mp3"],
  volume: 0.1,
  preload: true,
});

let lastPlayed = 0;
export const playClickSound = () => {
  const now = Date.now();
  if (now - lastPlayed > 50) {
    clickSound.play();
    lastPlayed = now;
  }
};