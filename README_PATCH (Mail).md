# Adoyo Advocates — Server-Side Enquiry Email (Resend) Patch

This patch documents how to replace the WhatsApp/`mailto:` enquiry flow with server-side email using Resend and a Next.js App Router API route.

**Recipient:** `adoyoadvocate@gmail.com`

> This is a README implementation guide. It does not itself modify the website source, create a Resend account, verify a domain, configure DNS, or set hosting secrets.

## 1. Prerequisites

- A Next.js project using the App Router (`src/app` or `app`).
- A Resend account: <https://resend.com/>
- Access to DNS for a domain you control.
- A verified sending domain in Resend.
- The recipient inbox `adoyoadvocate@gmail.com`.

## 2. Verify a sending domain

1. Add a domain you control in Resend.
2. Publish the exact DNS records shown in Resend.
3. Wait for verification.
4. Use a sender address on that verified domain, e.g. `enquiries@YOUR-VERIFIED-DOMAIN`.
5. Do not invent DNS records or use an unverified sender in production.

The recipient can remain Gmail. Resend sends outbound email; it does not replace or host the recipient's mailbox.

## 3. Install the SDK

From the project root:

```bash
npm install resend
```

## 4. Configure environment variables

Add to `.env.local` for local development:

```dotenv
RESEND_API_KEY=re_your_actual_key
ENQUIRY_FROM=Adoyo Advocates <enquiries@YOUR-VERIFIED-DOMAIN>
```

Replace the sender with an address on the verified domain, then set the same values in your production hosting dashboard.

- Never prefix `RESEND_API_KEY` with `NEXT_PUBLIC_`.
- Never commit `.env.local` or API keys to Git.
- Ensure `.env.local` is in `.gitignore`.
- If a key is exposed, revoke it and issue a new one.

## 5. Create the API route

Create `src/app/api/enquiry/route.ts` (or `app/api/enquiry/route.ts` if there is no `src/` directory):

```typescript
import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = "adoyoadvocate@gmail.com";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_FROM) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Expected a JSON request." },
        { status: 415 },
      );
    }

    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const service = String(body.service ?? "General legal enquiry").trim();
    const message = String(body.message ?? "").trim();

    if (
      name.length < 2 || name.length > 100 ||
      phone.length < 7 || phone.length > 24 ||
      email.length > 160 || service.length > 100 ||
      message.length < 10 || message.length > 2000
    ) {
      return NextResponse.json(
        { error: "Please check your enquiry details." },
        { status: 400 },
      );
    }

    // Add server-side rate limiting and bot protection before public launch.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM,
      to: [EMAIL],
      replyTo: email || undefined,
      subject: `Website enquiry: ${service || "General legal enquiry"}`,
      text: [
        "New enquiry from the Adoyo Advocates website",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Area of assistance: ${service || "General enquiry"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Enquiry email provider error:", error);
      return NextResponse.json(
        { error: "We could not send your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been accepted for delivery.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
```

### Validation and abuse protection

This route has basic length validation, not complete schema validation. Before public launch:

- Validate the email format if supplied.
- Restrict `service` to the form's known options.
- Add server-side rate limiting (preferably at the edge or via a shared store).
- Add bot protection such as Cloudflare Turnstile and verify its token server-side.
- Enforce request-body size limits at the hosting layer.
- Avoid logging full enquiry contents, phone numbers or email addresses.

Do not deploy the public endpoint without rate limiting and bot protection.

## 6. Update `EnquiryForm.tsx`

Keep the existing inputs, labels and CSS classes. Remove the WhatsApp URL, `window.open`, and `mailto:` fallback. Change the handler to `async` and POST the fields to `/api/enquiry`.

Add state:

```tsx
const [sending, setSending] = useState(false);
```

Example core handler (adapt to the component's existing validation and state names):

```tsx
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError("");
  setReady(false);

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const payload = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    email: String(data.get("email") || "").trim(),
    service: String(data.get("service") || "General legal enquiry"),
    message: String(data.get("message") || "").trim(),
  };

  setSending(true);
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to send your enquiry. Please try again.");
      return;
    }

    setReady(true);
    form.reset();
  } catch {
    setError("Connection problem. Please try again.");
  } finally {
    setSending(false);
  }
}
```

Update the button:

```tsx
<button
  className="button button-gold form-submit"
  type="submit"
  disabled={sending}
>
  {sending ? "Sending..." : "Send enquiry"}
  {!sending && <ArrowUpRight size={17} />}
</button>
```

Replace the form note with wording such as:

> Your details are sent to the firm by email so it can respond to your enquiry. Please do not include confidential or time-critical details. Submitting this form does not by itself establish a lawyer-client relationship.

Show a success message only after the API responds successfully, e.g.:

> Your enquiry has been submitted. The firm will review it and respond if appropriate.

Provider acceptance does not guarantee inbox delivery; check delivery status in Resend during testing.

## 7. Test checklist

- [ ] `npm install` completes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] A valid enquiry arrives at `adoyoadvocate@gmail.com`.
- [ ] Replying targets the visitor's supplied email address.
- [ ] Invalid and oversized submissions are rejected.
- [ ] Rate limiting and bot protection are active.
- [ ] API key is absent from browser bundles and Git.
- [ ] Provider delivery status and spam folder are checked.
- [ ] Mobile and desktop loading, success, error and repeat-submit states work.

## Official references

- Resend: <https://resend.com/>
- Resend Next.js guide: <https://resend.com/nextjs>
- Next.js Route Handlers: <https://nextjs.org/docs/app/building-your-application/routing/route-handlers>
