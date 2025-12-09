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
  /* Smooth timing */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.55s;
    animation-timing-function: ease-out;
  }

  /* Old page stays fully visible → prevents flick flash */
  ::view-transition-old(root) {
    mask: none;
  }

  /* New page gets circle-blur reveal */
  ::view-transition-new(root) {
    mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><defs><filter id='b'><feGaussianBlur stdDeviation='2'/></filter></defs><circle cx='40' cy='0' r='18' fill='white' filter='url(%23b)'/></svg>")
      top right / 0 no-repeat;
    animation-name: circleRevealBlur;
  }

  @keyframes circleRevealBlur {
    from { mask-size: 0; }
    to   { mask-size: 300vmax; }
  }
`;
