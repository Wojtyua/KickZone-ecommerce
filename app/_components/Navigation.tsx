"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
// import { GoHeartFill } from "react-icons/go";

const links = [
  { href: "/shop", label: "discover" },
  { href: "/shop/mens", label: "mens" },
  { href: "/shop/womens", label: "womens" },
];
const userLinks = [
  { href: "/favorites", label: <GoHeart size={24} /> },
  { href: "/cart", label: <LuShoppingBag size={24} /> },
  { href: "/account", label: <MdOutlineAccountCircle size={24} /> },
];

// na pozniej pelne serce
// <GoHeartFill />

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between w-full">
      <ul className="flex gap-3 capitalize text-sm items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span
                className={`${
                  pathname === link.href ? "text-red-600" : "text-text"
                }`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-3 capitalize text-sm items-center">
        {userLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
