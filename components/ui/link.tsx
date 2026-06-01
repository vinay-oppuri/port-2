"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { playClickSound } from "@/hooks/use-sound";
import { forwardRef } from "react";

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children?: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      playClickSound();
      if (onClick) {
        onClick(e);
      }
    };

    return <NextLink ref={ref} onClick={handleClick} {...props} />;
  }
);
Link.displayName = "Link";

export default Link;
