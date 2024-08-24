import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-2 justify-center h-full">
      <h1 className="text-3xl">KickZone sneakers shoes</h1>
      <button className="px-4 py-2 bg-primary">
        <Link href="/shop">Shop now</Link>
      </button>
    </main>
  );
}
