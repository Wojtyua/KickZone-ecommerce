import { loginUser } from "@/app/_actions/userActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";

const Login = () => {
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <form className="my-8" action={loginUser}>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          name="email"
        />

        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          placeholder="*************"
          type="password"
          name="password"
          className="mb-6"
        />

        <Button className="w-full">Login &rarr;</Button>

        <p className="text-center text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Don&apos;t have account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
