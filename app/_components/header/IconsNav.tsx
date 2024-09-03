import Link from "next/link";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import UserMenu from "@/app/_components/UserMenu";

const IconsNav = () => {
  return (
    <ul className="flex gap-8 capitalize text-sm items-center">
      <li>
        <Link href="/favorites">
          <LuHeart size={24} />
        </Link>
      </li>
      <li>
        <UserMenu />
      </li>
      <li>
        <Link href="/cart">
          <LuShoppingCart size={24} />
        </Link>
      </li>
    </ul>
  );
};

export default IconsNav;
