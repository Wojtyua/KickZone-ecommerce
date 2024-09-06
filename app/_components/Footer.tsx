import Link from "next/link";

const links = [
  { href: "/shop", label: "discover" },
  { href: "/shop/mens", label: "mens" },
  { href: "/shop/womens", label: "womens" },
];

const Footer = () => {
  return (
    <footer className="max-w-screen-2xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
      <p className="text-xs text-muted-foreground">
        © 2024 KickZone. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="uppercase text-xs font-medium hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
