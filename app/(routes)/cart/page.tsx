// app/(routes)/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/app/_store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to proceed to checkout.",
        variant: "destructive",
      });
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  const handleUpdateQuantity = (
    id: string,
    size: number,
    newQuantity: number
  ) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.model}
                  width={80}
                  height={80}
                  className="rounded-md mr-4"
                />
                <div>
                  <h2 className="font-semibold">{item.model}</h2>
                  <p>Size: {item.size}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  variant="ghost"
                  size="icon"
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity + 1)
                  }
                  variant="ghost"
                  size="icon"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => removeItem(item.id, item.size)}
                  variant="destructive"
                  size="icon"
                  className="ml-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <Button onClick={handleClearCart} variant="outline">
              Clear Cart
            </Button>
            <div className="text-right">
              <p className="text-lg font-bold">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <Button onClick={handleProceedToCheckout} className="mt-2">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
