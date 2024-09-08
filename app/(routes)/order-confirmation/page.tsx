"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Efekt konfetti po załadowaniu strony
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="mb-6">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
    </div>
  );
}
