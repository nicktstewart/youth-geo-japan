import type { CSSProperties } from "react";

/** Stagger index for [data-reveal] children (read by globals.css as --i). */
export const stagger = (index: number) => ({ "--i": index }) as CSSProperties;
