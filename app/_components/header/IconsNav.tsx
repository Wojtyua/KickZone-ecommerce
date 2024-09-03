import Link from "next/link";
import { LuHeart } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";

const userLinks = [
  {
    href: "/favorites",
    label: <LuHeart size={24} className="text-text-200 hover:text-text-100" />,
  },
  {
    href: "/account",
    label: <LuUser2 size={24} className="text-text-200 hover:text-text-100" />,
  },
  {
    href: "/cart",
    label: (
      <LuShoppingCart size={24} className="text-text-200 hover:text-text-100" />
    ),
  },
];

const IconsNav = () => {
  return (
    <ul className="flex gap-8 capitalize text-sm items-center">
      {userLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default IconsNav;
