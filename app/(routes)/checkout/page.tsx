// app/(routes)/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/app/_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/app/_actions/orderActions";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(5, "Postal code is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      form.setValue("fullName", session.user?.name || "");
      form.setValue("email", session.user?.email || "");
    }
  }, [session, router, form]);

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    const orderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }));

    const result = await createOrder({
      ...data,
      items: orderItems,
      totalAmount: getTotalPrice(),
    });

    if (result.success) {
      clearCart();
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!",
      });
      router.push("/order-confirmation");
    } else {
      toast({
        title: "Error",
        description: result.message || "There was an error placing your order.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...form.register("fullName")}
            placeholder="Full Name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...form.register("email")}
            placeholder="Email"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...form.register("address")}
            placeholder="Address"
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...form.register("city")} placeholder="City" />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            {...form.register("postalCode")}
            placeholder="Postal Code"
          />
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between mb-2"
            >
              <span>
                {item.model} (Size: {item.size}) x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold text-lg mt-2">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
}
