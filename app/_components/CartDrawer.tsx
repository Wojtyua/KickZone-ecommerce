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
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCartStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon">
            <ShoppingCart size={26} />

            {getTotalItems() > 0 && (
              <span className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </Button>
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
                className="grid grid-cols-[4fr_2fr_4fr] items-center mb-4 justify-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.model}
                    width={50}
                    height={50}
                    className="rounded-lg h-auto w-auto p-2"
                  />
                  <div>
                    <p className="font-semibold">{item.model}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <div className="mx-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex gap-2 items-center justify-end">
                  <p>${item.price * item.quantity}</p>
                  <Button
                    size="sm"
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
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
