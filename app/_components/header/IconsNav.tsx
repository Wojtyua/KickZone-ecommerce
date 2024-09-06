import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import UserMenu from "@/app/_components/UserMenu";
import MobileNav from "@/app/_components/header/MobileNav";

const IconsNav = () => {
  return (
    <ul className="flex gap-8 capitalize text-sm items-center">
      <li>
        <Link href="/favorites">
          <Heart size={24} />
        </Link>
      </li>
      <li>
        <UserMenu />
      </li>
      <li>
        <Link href="/cart">
          <ShoppingCart size={24} />
        </Link>
      </li>
      <li className="md:hidden">
        <MobileNav />
      </li>
    </ul>
  );
};

export default IconsNav;
