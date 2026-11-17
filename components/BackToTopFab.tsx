"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollableHeight > 0 && window.scrollY / scrollableHeight >= 0.5);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <a className="floating-back-to-top" href="#home" aria-label="Back to top">
      <ArrowUp size={19} aria-hidden="true" />
    </a>
  );
}
