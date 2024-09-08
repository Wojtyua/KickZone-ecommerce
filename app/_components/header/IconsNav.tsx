import Link from "next/link";
import dynamic from "next/dynamic";
import { Heart, UserRound, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserMenu = dynamic(() => import("@/app/_components/UserMenu"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon">
      <UserRound size={26} />
    </Button>
  ),
});
const CartDrawer = dynamic(() => import("@/app/_components/CartDrawer"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon">
      <ShoppingCart size={26} />
    </Button>
  ),
});
const MobileNav = dynamic(() => import("@/app/_components/header/MobileNav"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon">
      <Menu size={26} />
    </Button>
  ),
});

const IconsNav = () => {
  return (
    <ul className="flex gap-4 md:gap-6 capitalize text-sm items-center">
      <li className="hidden sm:block">
        <Link href="/favorites">
          <Button variant="ghost" size="icon">
            <Heart size={26} />
          </Button>
        </Link>
      </li>
      <li className="hidden sm:block">
        <UserMenu />
      </li>
      <li className="hidden sm:block">
        <CartDrawer />
      </li>
      <li className="md:hidden">
        <MobileNav />
      </li>
    </ul>
  );
};

export default IconsNav;
