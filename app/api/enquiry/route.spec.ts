// Regression tests for: Next.js 16.4.0 security upgrade
import { afterEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

describe("POST /api/enquiry", () => {
  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.ENQUIRY_FROM;
  });

  it("rejects requests that are not JSON", async () => {
    const request = new NextRequest("http://localhost/api/enquiry", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "not json",
    });

    const response = await POST(request);

    expect(response.status).toBe(415);
    await expect(response.json()).resolves.toEqual({
      error: "Please submit the form using the website.",
    });
  });

  it("reports unavailable email delivery when credentials are not configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.ENQUIRY_FROM;

    const request = new NextRequest("http://localhost/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test Visitor",
        phone: "254701234567",
        email: "visitor@example.com",
        service: "General legal enquiry",
        message: "I would like to discuss a legal matter.",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Email delivery is temporarily unavailable. Please try again later.",
    });
  });
});
