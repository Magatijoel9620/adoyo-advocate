"use client";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="footer-cookie-preferences"
      onClick={() => window.dispatchEvent(new Event("adoyo:open-cookie-preferences"))}
    >
      Cookie preferences
    </button>
  );
}
