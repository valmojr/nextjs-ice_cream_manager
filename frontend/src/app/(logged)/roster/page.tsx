import { isComissioner } from "@/lib/authorization";
import { RoledUser as User } from "@/lib/types";
import { cn, getUserFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RosterTable, { TableRowSkeleton } from "./RosterTable";
import { Suspense } from "react";

export default async function RosterPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;

  if (!isComissioner(user)) {
    redirect('/unauthorized');
  }

  return <div className={cn("flex flex-col flex-nowrap h-full w-full items-center justify-center space-x-4 gap-3")}>
    <Suspense fallback={
      <>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </>
    }><RosterTable user={user} />
    </Suspense>
  </div>
}