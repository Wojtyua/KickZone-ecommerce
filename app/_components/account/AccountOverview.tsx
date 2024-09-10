import { auth } from "@/auth";

export default async function AccountOverview() {
  const session = await auth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
      <p>Welcome back, {session?.user?.name}!</p>
      {/* tu cosik przyfetchować */}
      wiecej informacji o koncie uzytkownika
    </div>
  );
}
