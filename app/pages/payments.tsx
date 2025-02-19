"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  email: string;
  contact: string;
  created_at: number;
}

export default function Payments() {
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    // Fetch payment info (replace with real API call)
    setTimeout(() => {
      setPayment({
        id: "pay_ABC123",
        amount: 50000,
        currency: "INR",
        status: "captured",
        method: "UPI",
        email: "customer@example.com",
        contact: "+919876543210",
        created_at: Date.now() / 1000,
      });
    }, 1000);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Payment Details</h2>
        {payment ? (
          <div className="space-y-4">
            <p>
              <strong>Transaction ID:</strong> {payment.id}
            </p>
            <p>
              <strong>Amount:</strong> ₹{(payment.amount / 100).toFixed(2)}{" "}
              {payment.currency}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  payment.status === "captured" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {payment.status}
              </span>
            </p>
            <p>
              <strong>Method:</strong> {payment.method}
            </p>
            <p>
              <strong>Email:</strong> {payment.email}
            </p>
            <p>
              <strong>Contact:</strong> {payment.contact}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(payment.created_at * 1000).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}
