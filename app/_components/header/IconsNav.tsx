import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";

const userLinks = [
  { href: "/favorites", label: <GoHeart size={28} /> },
  { href: "/cart", label: <LuShoppingBag size={28} /> },
  { href: "/account", label: <MdOutlineAccountCircle size={28} /> },
];

const IconsNav = () => {
  return (
    <ul className="flex gap-6 capitalize text-sm items-center">
      {userLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default IconsNav;
