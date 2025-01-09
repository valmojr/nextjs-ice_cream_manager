import { cn, getUserFromToken } from "@/lib/utils";
import { $Enums, User } from "@prisma/client";
import { cookies } from "next/headers";
import LoggedLayoutTopMenu from "./topmenu";
import { redirect } from "next/navigation";
import { RoledUser } from "@/lib/types";

export default function loggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('authToken')?.value as string;

  if (!token) {
    redirect('/login');
  }

  const user = getUserFromToken(token) as RoledUser;

  return (
    <>
      <LoggedLayoutTopMenu user={user} />
      <div className={cn(
        "flex lg:flex-row flex-col flex-nowrap",
        "h-screen w-full",
        "justify-center items-start",
        "pt-[61px]"
      )}>
        {children}
      </div>
    </>
  );
}
