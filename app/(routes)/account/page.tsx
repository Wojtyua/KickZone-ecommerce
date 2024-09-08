import { Suspense } from "react";
import AccountOverview from "@/app/_components/account/AccountOverview";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Account Overview",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AccountOverview />
    </Suspense>
  );
}
