import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_secret";
  const razorpaySignature = req.headers["x-razorpay-signature"] as string;

  // Verify Razorpay Signature (optional security step)
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { event, payload } = req.body;

  if (event === "payment.captured") {
    console.log("The Payment Details are:");
    console.log("Payment Captured:", payload.payment.entity);
    console.log("Payment ID:", payload.payment.entity.id);
    console.log("Payment Amount:", payload.payment.entity.amount);
    console.log("Payment Currency:", payload.payment.entity.currency);
    console.log("Payment Method:", payload.payment.entity.method);
    console.log("Payment Email:", payload.payment.entity.email);
    console.log("Payment Contact:", payload.payment.entity.contact);
  }

  res.status(200).json({ success: true });
}
