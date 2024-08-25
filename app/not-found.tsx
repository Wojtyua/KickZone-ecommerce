import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid items-center justify-center">
      <div>
        <h1>404 - Page Not Found</h1>
        <Link href="/">Go back home</Link>
      </div>
    </div>
  );
};

export default NotFound;
