"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import EnquiryForm from "@/components/EnquiryForm";

type Props = { service: string };

export default function ServiceEnquiryModal({ service }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button className="button button-outline" type="button" onClick={() => setOpen(true)}>
        Use the enquiry form
      </button>
      {open && typeof document !== "undefined" &&
        createPortal(
          <div
            className="enquiry-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <section
              className="enquiry-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
            >
              <div className="enquiry-modal-heading">
                <div>
                  <span className="finder-label">CONTACT THE FIRM</span>
                  <h2 id="enquiry-modal-title">
                    Make an <em>enquiry.</em>
                  </h2>
                  <p>
                    Your enquiry will be reviewed by the firm. Please avoid
                    including confidential documents or sensitive details.
                  </p>
                </div>
                <button
                  className="enquiry-modal-close"
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close enquiry form"
                >
                  <X size={21} />
                </button>
              </div>
              <EnquiryForm initialService={service} />
            </section>
          </div>,
          document.body,
        )
      }
    </>
  );
}
