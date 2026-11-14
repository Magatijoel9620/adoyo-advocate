"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CarFront,
  CircleHelp,
  Landmark,
  ShieldCheck,
  X,
} from "lucide-react";

const DISMISS_KEY = "adoyo-first-visit-welcome-dismissed";

const services = [
  { id: "criminal", number: "01", title: "Criminal law & defence", description: "Investigations, bail and bond, defence and court representation.", destination: "#service-01", action: "Explore criminal law & defence", Icon: ShieldCheck },
  { id: "property", number: "02", title: "Conveyancing & property", description: "Property transactions, title review, due diligence and conveyancing.", destination: "#service-02", action: "Explore conveyancing & property", Icon: Landmark },
  { id: "employment", number: "03", title: "Employment & labour", description: "Employment relationships, workplace rights, contracts and disputes.", destination: "#service-03", action: "Explore employment & labour", Icon: BriefcaseBusiness },
  { id: "road-traffic", number: "04", title: "Road traffic claims", description: "Accident-related claims, liability and compensation enquiries.", destination: "#service-04", action: "Explore road traffic claims", Icon: CarFront },
  { id: "general", number: "05", title: "Another legal enquiry", description: "Not sure which area applies? Start with a general enquiry.", destination: "#contact", action: "Continue to general enquiry", Icon: CircleHelp },
] as const;

type ServiceId = (typeof services)[number]["id"];

export default function FirstVisitWelcome() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<ServiceId | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const selected = services.find((service) => service.id === selectedId) ?? null;

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) !== "1") {
        const frame = window.requestAnimationFrame(() => setOpen(true));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      const frame = window.requestAnimationFrame(() => setOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const dismiss = useCallback(() => {
    try { window.localStorage.setItem(DISMISS_KEY, "1"); } catch { /* Close for this visit if storage is unavailable. */ }
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
      if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )).filter((item) => item.offsetWidth > 0 || item.offsetHeight > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
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
    <div className="welcome-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <div ref={dialogRef} className="welcome-dialog welcome-guided-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-description">
        <header className="welcome-guided-header">
          <div className="welcome-guided-brand">
            <span className="welcome-brand-mark">
              <Image src="/logo.png" alt="Adoyo J & Company Advocates logo" width={240} height={240} priority />
            </span>
            <span className="welcome-guided-brand-copy">
              <strong>ADOYO J & COMPANY ADVOCATES</strong>
              <small>MALINDI · KENYA</small>
            </span>
          </div>
          <button ref={closeRef} className="welcome-close" type="button" onClick={dismiss} aria-label="Close service selector"><X size={18} /></button>
        </header>

        <div className="welcome-content welcome-guided-content">
          <div className="welcome-content-scroll welcome-guided-scroll">
            <p className="welcome-eyebrow"><span /> FIND A PLACE TO START</p>
            <h2 id="welcome-title">What brings you <em>here today?</em></h2>
            <p id="welcome-description" className="welcome-intro">Choose the area closest to what you need help with. You can explore the relevant service or make a general enquiry if you are unsure.</p>

            <div className="welcome-service-grid" role="group" aria-label="Select a legal service">
              {services.map(({ id, number, title, description, Icon }) => {
                const active = selectedId === id;
                return (
                  <button key={id} type="button" className={`welcome-service-card${active ? " is-selected" : ""}`} aria-pressed={active} onClick={() => setSelectedId(id)}>
                    <span className="welcome-service-card-top"><span className="welcome-service-icon"><Icon size={19} strokeWidth={1.7} /></span><span className="welcome-service-number">{number}</span></span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                    <span className="welcome-service-select" aria-hidden="true">{active ? "Selected ✓" : "Select area"}</span>
                  </button>
                );
              })}
            </div>

            <div className="welcome-selection-result" aria-live="polite" aria-atomic="true">
              {selected ? <>
                <div><span className="welcome-result-label">YOUR SELECTED AREA</span><strong>{selected.title}</strong></div>
                <a className="welcome-result-cta" href={selected.destination} onClick={dismiss}>{selected.action} <ArrowUpRight size={16} /></a>
              </> : <span>Select a service to see the most relevant next step.</span>}
            </div>

            <footer className="welcome-guided-footer">
              <span>Not ready to choose?</span>
              <button type="button" onClick={dismiss}>Continue to website <ArrowUpRight size={15} /></button>
            </footer>
            <p className="welcome-guided-note">This selector helps you navigate the firm’s services; it does not provide legal advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
