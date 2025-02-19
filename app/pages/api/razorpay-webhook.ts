import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

// Define expected Razorpay webhook structure
interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment: {
      entity: {
        id: string;
        amount: number;
        currency: string;
        method: string;
        email?: string;
        contact?: string;
      };
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_secret";
  const razorpaySignature = req.headers["x-razorpay-signature"] as string;

  // Verify Razorpay Signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  // Ensure req.body matches Razorpay's structure
  const body = req.body as RazorpayWebhookPayload;

  if (body.event === "payment.captured") {
    console.log("✅ Payment Captured:");
    console.log(JSON.stringify(body.payload.payment.entity, null, 2));
  }

  return res.status(200).json({ success: true });
}
