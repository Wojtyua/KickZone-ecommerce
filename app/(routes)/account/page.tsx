import { auth } from "@/auth";

export const metadata = {
  title: "Account",
};

const Page = () => {
  const session = auth();
  console.log(session);
  return <div>Account page</div>;
};

export default Page;
