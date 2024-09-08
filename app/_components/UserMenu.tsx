"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    toggleMenu();
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserRound size={26} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === "authenticated" && session?.user ? (
          <>
            <div className="p-3 flex flex-col space-y-3">
              <div className="space-y-1">
                <h3>
                  Hi,{" "}
                  <span className="font-semibold">{session?.user?.name}</span>
                </h3>
                <p>Great to see you!</p>
              </div>
              <Separator />
              <Link href="/account">
                <div className="flex gap-2 p-2 rounded-lg transition-colors hover:bg-muted">
                  <UserRound /> My account
                </div>
              </Link>
              <Separator />
              <Button size="sm" onClick={handleSignOut}>
                <LogOut className="size-4 mr-2" /> Log out
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 flex flex-col space-y-3">
              <h3>Log in or Sign up</h3>
              <div className="flex gap-2">
                <Link href="/login">
                  <Button onClick={toggleMenu} size="sm" variant="outline">
                    Log in
                  </Button>
                </Link>
                <Link onClick={toggleMenu} href="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
