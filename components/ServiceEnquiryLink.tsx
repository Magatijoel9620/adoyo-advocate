"use client";

import { ArrowUpRight } from "lucide-react";

type Props = { service: string; label: string };

export default function ServiceEnquiryLink({ service, label }: Props) {
  function selectService() {
    window.dispatchEvent(
      new CustomEvent("adoyo:service-selected", { detail: service }),
    );
  }

  return (
    <a href="#contact" onClick={selectService} aria-label={label}>
      <ArrowUpRight size={20} />
    </a>
  );
}
