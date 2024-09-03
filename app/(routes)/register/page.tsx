// app/(auth)/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/_actions/userActions";
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

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    if (result) {
      if ("error" in result) {
        setError(result.error || "Cosik nie siadlo");
      } else if ("success" in result) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } else {
      setError("An unexpected error occurred");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" type="text" name="name" />

          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@example.com"
            type="email"
            name="email"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="*************"
            type="password"
            name="password"
            className="mb-6"
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <Button type="submit">Register &rarr;</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
