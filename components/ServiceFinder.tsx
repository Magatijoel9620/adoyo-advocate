"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CarFront,
  CircleHelp,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const options = [
  {
    id: "criminal",
    title: "A criminal investigation or court matter",
    detail: "Bail, bond, defence or court representation",
    service: "Criminal law & defence",
    icon: ShieldCheck,
  },
  {
    id: "property",
    title: "A property or land transaction",
    detail: "Buying, selling, title checks or conveyancing",
    service: "Conveyancing & property",
    icon: Landmark,
  },
  {
    id: "employment",
    title: "A workplace or employment issue",
    detail: "Employment contracts, disputes or termination",
    service: "Employment & labour",
    icon: BriefcaseBusiness,
  },
  {
    id: "accident",
    title: "A road accident or injury claim",
    detail: "A claim, liability or compensation enquiry",
    service: "Road traffic accident claims",
    icon: CarFront,
  },
  {
    id: "unsure",
    title: "Something else / I'm not sure",
    detail: "Start with a general enquiry and the firm can review it",
    service: "General legal enquiry",
    icon: CircleHelp,
  },
] as const;

export default function ServiceFinder() {
  const [selected, setSelected] = useState<(typeof options)[number] | null>(null);

  return (
    <div className="service-finder" aria-labelledby="service-finder-title">
      <div className="service-finder-intro">
        <span className="finder-label">A SIMPLE PLACE TO START</span>
        <h3 id="service-finder-title">
          What brings you <em>here today?</em>
        </h3>
        <p>
          Choose the description that feels closest. This guide only helps direct
          your enquiry to an area of practice; it does not assess your legal position.
        </p>
      </div>
      <div className="finder-options" role="group" aria-label="Choose the kind of legal enquiry">
        {options.map((option) => {
          const Icon = option.icon;
          const active = selected?.id === option.id;
          return (
            <button
              className={`finder-option${active ? " is-selected" : ""}`}
              type="button"
              key={option.id}
              aria-pressed={active}
              onClick={() => setSelected(option)}
            >
              <span className="finder-option-icon"><Icon size={19} /></span>
              <span className="finder-option-copy">
                <strong>{option.title}</strong>
                <small>{option.detail}</small>
              </span>
              <span className="finder-option-check" aria-hidden="true">{active ? "✓" : "＋"}</span>
            </button>
          );
        })}
      </div>
      <div className="finder-result" aria-live="polite">
        {selected ? (
          <>
            <span>YOUR SELECTED AREA</span>
            <strong>{selected.service}</strong>
            <div className="finder-result-actions">
              <a
                className="finder-whatsapp-cta"
                href={`https://wa.me/254701403467?text=${encodeURIComponent(`Hello, I would like to make an enquiry about ${selected.service}. Could you please guide me on the next step?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Start a WhatsApp enquiry about ${selected.service}`}
              >
                Continue on WhatsApp <ArrowUpRight size={16} />
              </a>
              <a className="finder-form-link" href="#contact">
                Prefer the enquiry form? <span>Go to contact</span>
              </a>
            </div>
          </>
        ) : (
          <span>Select an option to prepare your enquiry.</span>
        )}
      </div>
    </div>
  );
}
