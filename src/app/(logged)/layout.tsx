import { cn, getUserFromToken } from "@/lib/utils";
import { $Enums, User } from "@prisma/client";
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

  const user = getUserFromToken(token) as User & { roles: { storeName: string, function: $Enums.Functions }[] };

  return (
    <>
      <LoggedLayoutTopMenu user={user} />
      <div className={cn(
        "flex lg:flex-row flex-col flex-nowrap",
        "h-fit w-full",
        "justify-center items-center"
      )}>
        {children}
      </div>
    </>
  );
}
