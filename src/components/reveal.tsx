"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * IntersectionObserver reveal. Content is fully visible without JS
 * (opacity only applies once the observer attaches) and honors
 * prefers-reduced-motion via the CSS layer in globals.css.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${shown ? "reveal-in" : "reveal-base"} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
