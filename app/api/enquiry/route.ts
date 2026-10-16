
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SERVICES = [
  "Criminal law & defence",
  "Conveyancing & property",
  "Employment & labour",
  "Road traffic accident claims",
  "General legal enquiry",
] as const;

const MAX_REQUEST_BYTES = 12_000;

type EnquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
};

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return (
    value.length <= 160 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Please submit the form using the website." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: "Your submission is too large." },
      { status: 413 },
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { error: "Unable to read your submission." },
      { status: 400 },
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: "Your submission is too large." },
      { status: 413 },
    );
  }

  let body: EnquiryPayload;

  try {
    body = JSON.parse(rawBody) as EnquiryPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid submission format." },
      { status: 400 },
    );
  }

  const name = cleanText(body.name);
  const phone = cleanText(body.phone);
  const email = cleanText(body.email);
  const service = cleanText(body.service);
  const message = cleanText(body.message);

  if (
    name.length < 2 ||
    name.length > 100 ||
    phone.length < 7 ||
    phone.length > 24 ||
    message.length < 10 ||
    message.length > 2000
  ) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!SERVICES.includes(service as (typeof SERVICES)[number])) {
    return NextResponse.json(
      { error: "Please select a valid area of assistance." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email delivery is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from,
      to: ["info@adoyolaw.com"],
      ...(email ? { replyTo: email } : {}),
      subject: `Website enquiry: ${service}`,
      text: [
        "New enquiry submitted through the Adoyo Advocates website",
        "",
        `Full name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Area of assistance: ${service}`,
        "",
        "Enquiry:",
        message,
        "",
        "Please follow up with the enquirer as appropriate.",
      ].join("\n"),
    });

    if (result.error) {
      // Do not log the visitor's personal details or enquiry text.
      console.error("Resend rejected an enquiry email:", result.error.name);

      return NextResponse.json(
        { error: "We couldn't send your enquiry. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { ok: true },
      { status: 200 },
    );
  } catch {
    console.error("Unexpected error while sending an enquiry email.");

    return NextResponse.json(
      { error: "Email delivery is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }
}
