"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/shop", label: "discover" },
  { href: "/shop/mens", label: "mens" },
  { href: "/shop/womens", label: "womens" },
];

// na pozniej pelne serce
// <GoHeartFill />

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex">
      <ul className="flex gap-12 font-medium text-lg uppercase items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span
                className={`${
                  pathname === link.href ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
