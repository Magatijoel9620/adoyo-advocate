
"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";

const SERVICES = [
  "Criminal law & defence",
  "Conveyancing & property",
  "Employment & labour",
  "Road traffic accident claims",
  "General legal enquiry",
] as const;

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export default function EnquiryForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || "").trim(),
    };

    if (
      payload.name.length < 2 ||
      payload.phone.length < 7 ||
      payload.phone.length > 24 ||
      payload.message.length < 10
    ) {
      setStatus("error");
      setError(
        "Please provide your name, a reachable phone number and a message of at least 10 characters.",
      );
      return;
    }

    if (!SERVICES.includes(payload.service as (typeof SERVICES)[number])) {
      setStatus("error");
      setError("Please select a valid area of assistance.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "We couldn't submit your enquiry. Please try again.",
        );
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Your name"
            disabled={status === "sending"}
          />
        </label>

        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            minLength={7}
            maxLength={24}
            placeholder="+254 7xx xxx xxx or your country code"
            disabled={status === "sending"}
          />
        </label>
      </div>

      <label>
        Email address <span className="optional">OPTIONAL</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </label>

      <label>
        What can we help with?
        <select
          name="service"
          defaultValue=""
          required
          disabled={status === "sending"}
        >
          <option value="" disabled>
            Select an area
          </option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <label>
        Briefly describe your enquiry
        <textarea
          name="message"
          rows={4}
          minLength={10}
          maxLength={2000}
          required
          placeholder="A short overview is enough for this first contact."
          disabled={status === "sending"}
        />
      </label>

      <button
        className="button button-gold form-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            Sending <LoaderCircle size={17} className="spin" />
          </>
        ) : (
          <>
            Send enquiry <ArrowUpRight size={17} />
          </>
        )}
      </button>

      <p className="form-note">
        Your enquiry will be sent to Adoyo Advocates by email. Please avoid
        including confidential documents or sensitive details in this initial
        message. Do not use this form for urgent or time-critical matters.
      </p>

      {status === "error" && (
        <p className="form-feedback form-error" role="alert">
          {error}
        </p>
      )}

      {status === "success" && (
        <p className="form-feedback" role="status">
          <CheckCircle2 size={16} />
          Your enquiry has been submitted. Thank you for contacting Adoyo
          Advocates.
        </p>
      )}
    </form>
  );
}
