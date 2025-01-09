import { getUserFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { RoledUser as User } from "@/lib/types";
import { isOwner } from "@/lib/authorization";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;

  if (!isOwner(user)) {
    redirect('/unauthorized');
  }

  return <h1>Dashboard page</h1>
}