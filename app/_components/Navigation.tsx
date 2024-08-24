import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex justify-between w-full">
      <ul className="flex gap-3 capitalize text-sm items-center">
        <li>
          <Link href="/shop">home</Link>
        </li>
        <li>
          <Link href="/shop">mens</Link>
        </li>
        <li>
          <Link href="/account">womens</Link>
        </li>
      </ul>
      <ul className="flex gap-3">
        <li>
          <Link href="/favorites">favorites</Link>
        </li>
        <li>
          <Link href="/cart">cart</Link>
        </li>
        <li>
          <Link href="/account">account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
