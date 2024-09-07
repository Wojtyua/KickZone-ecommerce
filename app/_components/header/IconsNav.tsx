import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import UserMenu from "@/app/_components/UserMenu";
import MobileNav from "@/app/_components/header/MobileNav";

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
        <Link href="/cart">
          <ShoppingCart size={26} />
        </Link>
      </li>
      <li className="md:hidden">
        <MobileNav />
      </li>
    </ul>
  );
};

export default IconsNav;
