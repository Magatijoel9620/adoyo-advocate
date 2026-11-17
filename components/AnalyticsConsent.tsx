"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

const MEASUREMENT_ID = "G-9CY1LMCMN8";
const CONSENT_KEY = "adoyo-ga4-consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function sendEvent(name: string, parameters: Record<string, string> = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, parameters);
  }
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "accepted" || saved === "declined") setChoice(saved);
    } catch {
      // If storage is unavailable, keep analytics disabled and do not block the site.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      setChoice(null);
      setShowPreferences(true);
    };
    window.addEventListener("adoyo:open-cookie-preferences", openPreferences);
    return () => window.removeEventListener("adoyo:open-cookie-preferences", openPreferences);
  }, []);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    if (!document.querySelector(`script[data-adoyo-ga="${MEASUREMENT_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.dataset.adoyoGa = MEASUREMENT_ID;
      document.head.appendChild(script);
    }

    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
  }, [choice, ready]);

  useEffect(() => {
    if (choice !== "accepted") return;
    // Deliberately omit query strings and fragments to avoid collecting accidental personal data.
    const safeLocation = `${window.location.origin}${pathname}`;
    sendEvent("page_view", { page_location: safeLocation, page_path: pathname });
    if (pathname.startsWith("/services/")) {
      sendEvent("service_view", { service_path: pathname });
    }
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== "accepted") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("https://wa.me/") || href.includes("whatsapp.com/")) {
        sendEvent("whatsapp_click", { link_url: "whatsapp" });
      } else if (href.startsWith("tel:")) {
        sendEvent("phone_click", { link_url: "telephone" });
      } else if (href.startsWith("mailto:")) {
        sendEvent("email_click", { link_url: "email" });
      }
    };

    const onFinder = (event: Event) => {
      const detail = (event as CustomEvent<{ serviceId?: string }>).detail;
      sendEvent("service_finder_interaction", {
        service_id: detail?.serviceId || "selection",
      });
    };

    const onFormStart = () => sendEvent("enquiry_form_start");
    const onFormSuccess = (event: Event) => {
      const detail = (event as CustomEvent<{ service?: string }>).detail;
      // Only a fixed service category is sent; never send form contents or contact details.
      sendEvent("enquiry_submit_success", {
        service: detail?.service || "unspecified",
      });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("adoyo:service-finder", onFinder);
    window.addEventListener("adoyo:enquiry-start", onFormStart);
    window.addEventListener("adoyo:enquiry-success", onFormSuccess);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("adoyo:service-finder", onFinder);
      window.removeEventListener("adoyo:enquiry-start", onFormStart);
      window.removeEventListener("adoyo:enquiry-success", onFormSuccess);
    };
  }, [choice]);

  const saveChoice = useCallback((next: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // A storage failure must not prevent the visitor from using the website.
    }
    setChoice(next);
    setShowPreferences(false);
  }, []);

  if (!ready || choice !== null || !showPreferences) return null;

  return (
    <aside
      aria-label="Analytics preferences"
      style={{
        position: "fixed", zIndex: 1200, left: "max(16px, env(safe-area-inset-left))",
        right: "max(16px, env(safe-area-inset-right))", bottom: "max(16px, env(safe-area-inset-bottom))",
        maxWidth: 620, margin: "0 auto", padding: 18, background: "#1d2422", color: "#faf8f2",
        border: "1px solid rgba(221,199,159,.45)", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,.28)",
      }}
    >
      <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.55 }}>
        We use Google Analytics to understand how visitors use this website and improve access to our services.
        Analytics is optional. We do not send enquiry form contents or contact details to Google Analytics.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button type="button" onClick={() => saveChoice("accepted")} style={buttonStyle(true)}>Allow analytics</button>
        <button type="button" onClick={() => saveChoice("declined")} style={buttonStyle(false)}>Decline</button>
      </div>
    </aside>
  );
}

function buttonStyle(primary: boolean): CSSProperties {
  return {
    border: "1px solid #c3a16b", borderRadius: 5, padding: "9px 14px", cursor: "pointer",
    background: primary ? "#c3a16b" : "transparent", color: primary ? "#1d2422" : "#faf8f2",
    font: "inherit", fontSize: 13,
  };
}