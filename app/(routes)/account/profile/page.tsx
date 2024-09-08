import { Suspense } from "react";
import ProfileForm from "@/app/_components/account/ProfileForm";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Edit Profile",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileForm />
    </Suspense>
  );
}
