import Link from "next/link";

const links = [
  { href: "/shop", label: "discover" },
  { href: "/shop/mens", label: "mens" },
  { href: "/shop/womens", label: "womens" },
];

const Navigation = () => {
  return (
    <nav className="hidden md:flex">
      <ul className="flex gap-12 font-medium text-lg uppercase items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
