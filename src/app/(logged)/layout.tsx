import { getUserFromToken } from "@/lib/utils";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import LoggedLayoutTopMenu from "./topmenu";
import { redirect } from "next/navigation";

export default function loggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('authToken')?.value as string;

  if (!token) {
    redirect('/login');
  }

  const user = getUserFromToken(token) as User;

  return (
    <>
      <LoggedLayoutTopMenu user={user} />
      {children}
    </>
  );
}
