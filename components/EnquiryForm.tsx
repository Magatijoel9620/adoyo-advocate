"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const EMAIL = "adoyoadvocate@gmail.com";

export default function EnquiryForm() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReady(false);

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "General legal enquiry");
    const message = String(data.get("message") || "").trim();

    if (name.length < 2 || phone.length < 7 || message.length < 10) {
      setError(
        "Please add your name, a reachable phone number and a short message (at least 10 characters).",
      );
      return;
    }

    const subject = `Website enquiry: ${service}`;
    const body = `Hello Adoyo J & Company Advocates,

My name is ${name}.
Phone: ${phone}${email ? `\nEmail: ${email}` : ""}
Area of assistance: ${service}

Enquiry: ${message}

Please let me know how I may proceed.`;

    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setReady(true);
    window.location.href = mailtoUrl;
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
          />
        </label>

        <label>
          Phone number
          <input
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            minLength={7}
            maxLength={24}
            placeholder="+254 7xx xxx xxx or your country code"
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
        />
      </label>

      <label>
        What can we help with?
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Select an area
          </option>
          <option>Criminal law &amp; defence</option>
          <option>Conveyancing &amp; property</option>
          <option>Employment &amp; labour</option>
          <option>Road traffic accident claims</option>
          <option>General legal enquiry</option>
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
        />
      </label>

      <button className="button button-gold form-submit" type="submit">
        Prepare email <ArrowUpRight size={17} />
      </button>

      <p className="form-note">
        Your details are not stored by this website. This form prepares an
        email in your default email application; review and send it yourself.
        Please do not include confidential or time-critical details.
      </p>

      {error && (
        <p className="form-feedback form-error" role="alert">
          {error}
        </p>
      )}

      {ready && (
        <p className="form-feedback" role="status">
          <CheckCircle2 size={16} /> Your email draft is being opened. Review it
          and press Send to contact the firm.
        </p>
      )}
    </form>
  );
}