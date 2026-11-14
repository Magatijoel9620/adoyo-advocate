"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, MessageCircle, Scale, X } from "lucide-react";

const DISMISS_KEY = "adoyo-first-visit-welcome-dismissed";
const pathways = [
  {
    number: "01",
    title: "Explore legal services",
    description: "Find the practice area closest to your matter.",
    href: "#services",
    icon: Scale,
    external: false,
  },
  {
    number: "02",
    title: "Speak with the firm",
    description: "Take the next step through a direct enquiry.",
    href: "#contact",
    icon: MessageCircle,
    external: false,
  },
  {
    number: "03",
    title: "Get to know Adoyo",
    description: "Learn about the firm and its approach to legal work.",
    href: "#firm",
    icon: ArrowUpRight,
    external: false,
  },
  {
    number: "04",
    title: "Find our office",
    description: "Get directions to our Malindi office.",
    href: "https://maps.app.goo.gl/DRXyySy53Q5vJuqR9",
    icon: MapPin,
    external: true,
  },
];

export default function FirstVisitWelcome() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) !== "1") {
        const frame = window.requestAnimationFrame(() => setOpen(true));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      // Storage can be unavailable in private/restricted browsing contexts.
      const frame = window.requestAnimationFrame(() => setOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // The dialog still closes for this visit if storage is unavailable.
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
      if (event.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const focusable = Array.from(items).filter(
          (item) => item.offsetWidth > 0 || item.offsetHeight > 0,
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="welcome-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        ref={dialogRef}
        className="welcome-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-description"
      >
        <section className="welcome-brand-panel" aria-label="Adoyo brand">
          <div className="welcome-brand-mark">
            <Image
              src="/logo.png"
              alt="Adoyo J & Company Advocates brand mark"
              width={240}
              height={240}
              priority
            />
          </div>
          <span className="welcome-panel-rule" />
          <p className="welcome-panel-caption">ADOYO J & COMPANY ADVOCATES</p>
          <p className="welcome-panel-note">The law, with clarity.</p>
          <span className="welcome-panel-index">MALINDI · KENYA</span>
        </section>

        <section className="welcome-content">
          <button
            ref={closeRef}
            className="welcome-close"
            type="button"
            onClick={dismiss}
            aria-label="Close welcome message"
          >
            <X size={18} />
          </button>
          <div className="welcome-content-scroll">
            <p className="welcome-eyebrow">
              <span /> A THOUGHTFUL PLACE TO BEGIN
            </p>
            <h2 id="welcome-title">
              Every matter deserves a <em>thoughtful beginning.</em>
            </h2>
            <p id="welcome-description" className="welcome-intro">
              Welcome to Adoyo J & Company Advocates. We are here to help you
              understand where to begin, explore your options and take a
              considered next step.
            </p>

            <div className="welcome-pathways" aria-label="Choose where to begin">
              {pathways.map((pathway) => {
                const Icon = pathway.icon;
                return (
                  <a
                    className="welcome-pathway"
                    href={pathway.href}
                    key={pathway.number}
                    onClick={dismiss}
                    {...(pathway.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className="welcome-pathway-number">{pathway.number}</span>
                    <span className="welcome-pathway-icon"><Icon size={17} /></span>
                    <span className="welcome-pathway-copy">
                      <strong>{pathway.title}</strong>
                      <small>{pathway.description}</small>
                    </span>
                    <ArrowUpRight className="welcome-pathway-arrow" size={17} />
                  </a>
                );
              })}
            </div>

            <div className="welcome-footer">
              <span>LEGAL GUIDANCE · MALINDI, KENYA</span>
              <button type="button" onClick={dismiss}>
                Continue to website <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
