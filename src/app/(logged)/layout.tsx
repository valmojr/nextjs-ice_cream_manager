import { getUserFromToken } from "@/lib/utils";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import LoggedLayoutTopMenu from "./topmenu";

export default function loggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('authToken')?.value as string;
  const user = getUserFromToken(token) as User;

  return (
    <>
      <LoggedLayoutTopMenu user={user}/>
      {children}
    </>
  );
}
