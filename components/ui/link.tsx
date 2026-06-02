"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children?: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    return <NextLink ref={ref} {...props} />;
  }
);
Link.displayName = "Link";

export default Link;
