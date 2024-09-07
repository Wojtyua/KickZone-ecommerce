"use client";

import { useCartStore } from "@/app/_store";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCartStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative">
          <ShoppingCart size={26} />

          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex gap-3 items-center">
                <ShoppingCart /> Your shopping cart
              </div>
            </DrawerTitle>
            <DrawerDescription>
              You have {getTotalItems()} items in your cart.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center justify-between mb-4"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.model}
                  width={50}
                  height={50}
                />
                <div>
                  <p>{item.model}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
                <p>${item.price * item.quantity}</p>
                <Button
                  variant="destructive"
                  onClick={() => removeItem(item.id, item.size)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Link href="/cart">
                <Button className="w-full">Go to cart</Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
