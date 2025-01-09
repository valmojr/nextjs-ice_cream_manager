import { isAdmin } from "@/lib/authorization";
import { getUserFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { RoledUser as User } from "@/lib/types";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;

  if (!isAdmin(user)) {
    redirect('/unauthorized');
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Only authorized users can see this page.</p>
    </div>
  );
};