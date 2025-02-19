import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_secret";
  const razorpaySignature = req.headers["x-razorpay-signature"] as string;

  // Verify Razorpay Signature (optional security step)
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { event, payload } = req.body as any;

  if (event === "payment.captured") {
    console.log("✅ Payment Captured:");
    console.log(JSON.stringify(payload.payment.entity, null, 2));
  }

  return res.status(200).json({ success: true });
}
