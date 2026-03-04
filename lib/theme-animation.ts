export const injectAnimationStyles = (css: string) => {
  if (typeof document === "undefined") return;

  const id = "theme-transition-style";
  let style = document.getElementById(id) as HTMLStyleElement;

  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }

  style.textContent = css;
};

export const circleBlurTopRightCSS = `
  /* Performant timing */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
  }

  /* Old page stays fully visible */
  ::view-transition-old(root) {
    animation: none;
    z-index: -1;
  }

  /* New page gets hardware-accelerated clip-path reveal */
  ::view-transition-new(root) {
    animation-name: circleReveal;
    z-index: 1;
  }

  @keyframes circleReveal {
    from {
      clip-path: circle(0% at top right);
    }
    to {
      clip-path: circle(150% at top right);
    }
  }
`;
