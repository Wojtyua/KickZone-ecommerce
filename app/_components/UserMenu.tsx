// app/_components/UserMenu.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <UserRound size={26} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === "authenticated" && session?.user ? (
          <>
            <DropdownMenuItem>
              Welcome, {session.user.name || session.user.email}!
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => router.push("/login")}>
              Sign in
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/register")}>
              Register
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
