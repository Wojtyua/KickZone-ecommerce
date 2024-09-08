"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const accountLinks = [
  { href: "/account", label: "Account Overview" },
  { href: "/account/favorites", label: "Favorites" },
  { href: "/account/orders", label: "Order History" },
  { href: "/account/profile", label: "Profile" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="w-full md:w-64">
          <ul className="space-y-2">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block p-2 rounded-md ${
                    pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
