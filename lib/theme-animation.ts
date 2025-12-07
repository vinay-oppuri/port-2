// -------------------------------------------------------------
// FULL ANIMATION ENGINE — supports ALL features
// circle, circle-blur, rectangle, polygon, gif
// -------------------------------------------------------------

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";

export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

// -------------------------------------------------------------
// Position maps for clip-path / mask engines
// -------------------------------------------------------------
const getSVGPosition = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    default:
      return { cx: "20", cy: "20" };
  }
};

const getClipPosition = (start: AnimationStart): string => {
  switch (start) {
    case "top-left":
      return "0% 0%";
    case "top-right":
      return "100% 0%";
    case "bottom-left":
      return "0% 100%";
    case "bottom-right":
      return "100% 100%";
    case "top-center":
      return "50% 0%";
    case "bottom-center":
      return "50% 100%";
    default:
      return "50% 50%";
  }
};

const getTransformOrigin = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    case "top-center":
      return "top center";
    case "bottom-center":
      return "bottom center";
    default:
      return "center";
  }
};

// -------------------------------------------------------------
// SVG Generator (circle + circle-blur)
// -------------------------------------------------------------
const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  const { cx, cy } = getSVGPosition(start);

  // CIRCLE-BLUR special case
  if (variant === "circle-blur") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  // Standard circle mask
  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

// -------------------------------------------------------------
// Full createAnimation engine — COMPLETE
// -------------------------------------------------------------
export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  gifUrl?: string
): Animation => {
  const svg = generateSVG(variant, start);
  const clipPosition = getClipPosition(start);
  const origin = getTransformOrigin(start);

  // -------------------------------------------------------------
  // GIF MASK VARIANT
  // -------------------------------------------------------------
  if (variant === "gif") {
    return {
      name: `gif-${start}`,
      css: `
        ::view-transition-new(root) {
          mask: url('${gifUrl}') ${clipPosition} / 0 no-repeat;
          animation: gifScale 1.4s ease-out;
        }

        @keyframes gifScale {
          0% { mask-size: 0; }
          10% { mask-size: 50vmax; }
          90% { mask-size: 50vmax; }
          100% { mask-size: 300vmax; }
        }
      `,
    };
  }

  // -------------------------------------------------------------
  // RECTANGLE VARIANT (sliding directions)
  // -------------------------------------------------------------
  if (variant === "rectangle") {
    const getClip = (start: AnimationStart) => {
      switch (start) {
        case "top-down":
          return {
            from: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            to: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          };
        case "bottom-up":
          return {
            from: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
            to: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          };
        case "left-right":
          return {
            from: "polygon(0% 0%,0% 0%,0% 100%,0% 100%)",
            to: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          };
        case "right-left":
          return {
            from: "polygon(100% 0%,100% 0%,100% 100%,100% 100%)",
            to: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          };
        default:
          return {
            from: "polygon(0% 0%,0% 0%,0% 0%,0% 0%)",
            to: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          };
      }
    };

    const clip = getClip(start);

    return {
      name: `rectangle-${start}`,
      css: `
        ::view-transition-new(root) {
          animation: rectReveal 0.9s ease-out;
        }

        @keyframes rectReveal {
          from { clip-path: ${clip.from}; }
          to { clip-path: ${clip.to}; }
        }
      `,
    };
  }

  // -------------------------------------------------------------
  // POLYGON VARIANT (irregular reveal)
  // -------------------------------------------------------------
  if (variant === "polygon") {
    return {
      name: `polygon-${start}`,
      css: `
        ::view-transition-new(root) {
          animation: polygonReveal 1s ease-in-out;
        }

        @keyframes polygonReveal {
          from { clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%); }
          to   { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
        }
      `,
    };
  }

  // -------------------------------------------------------------
  // CIRCLE-BLUR VARIANT
  // -------------------------------------------------------------
  if (variant === "circle-blur") {
    return {
      name: `circle-blur-${start}`,
      css: `
        ::view-transition-new(root) {
          mask: url('${svg}') ${clipPosition} / 0 no-repeat;
          animation: blurCircle 1s ease-out;
          transform-origin: ${origin};
        }

        @keyframes blurCircle {
          to { mask-size: 350vmax; }
        }
      `,
    };
  }

  // -------------------------------------------------------------
  // DEFAULT CIRCLE REVEAL
  // -------------------------------------------------------------
  return {
    name: `circle-${start}`,
    css: `
      ::view-transition-new(root) {
        animation: circleReveal 0.9s ease-out;
      }

      @keyframes circleReveal {
        from { clip-path: circle(0% at ${clipPosition}); }
        to   { clip-path: circle(160% at ${clipPosition}); }
      }
    `,
  };
};

// -------------------------------------------------------------
// STYLE INJECTION
// -------------------------------------------------------------
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