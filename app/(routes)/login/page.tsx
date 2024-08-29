import { loginUser } from "@/app/_actions/userActions";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  // if (session) redirect("/");
  console.log(session?.user);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginUser}>
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

          <Button>Login &rarr;</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Don&apos;t have account? <Link href="/register">Register</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
