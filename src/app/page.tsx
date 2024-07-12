import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  
  if (!user) return redirect('/login');

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-6">
      <h1>Home</h1>
      <h1>Hi, {user.username}!</h1>
      <p>Your userID is: {user.id}</p>
    </main>
  );
}
