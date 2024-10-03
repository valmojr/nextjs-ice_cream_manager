import { isManager } from "@/lib/authorization";
import { RoledUser as User } from "@/lib/types";
import { getUserFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RosterPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;

  if (!isManager(user)) {
    redirect('/unauthorized');
  }

  return <h1>Roster Page</h1>
}