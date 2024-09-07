import Link from "next/link";
import dynamic from "next/dynamic";
import { Heart, UserRound, ShoppingCart, Menu } from "lucide-react";

const UserMenu = dynamic(() => import("@/app/_components/UserMenu"), {
  ssr: false,
  loading: () => <UserRound size={26} />, // placeholder
});
const CartDrawer = dynamic(() => import("@/app/_components/CartDrawer"), {
  ssr: false,
  loading: () => <ShoppingCart size={26} />, // placeholder
});
const MobileNav = dynamic(() => import("@/app/_components/header/MobileNav"), {
  ssr: false,
  loading: () => <Menu size={26} />, // placeholder
});

const IconsNav = () => {
  return (
    <ul className="flex gap-6 md:gap-8 capitalize text-sm items-center">
      <li className="hidden sm:block">
        <Link href="/favorites">
          <Heart size={26} />
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
