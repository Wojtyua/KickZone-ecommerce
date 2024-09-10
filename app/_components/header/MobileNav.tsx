"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu size={26} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through the shop</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Discover
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/shop/mens" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Mens
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/shop/womens" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Womens
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="pt-4">
            {status === "authenticated" && session?.user ? (
              <div className="space-y-4">
                <p>Hi, {session.user.name}</p>
                <Button onClick={handleSignOut} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Sign up or log in to explore our exclusive collection</p>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/account" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <UserRound className="mr-2 h-4 w-4" /> Account
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/cart" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
