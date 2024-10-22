import { getAllRolesFromStore } from "@/app/api/role/functions";
import { getAllStores } from "@/app/api/store/functions";
import { getUserById } from "@/app/api/user/functions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { functionTranslator } from "@/lib/authorization";
import { RoledUser } from "@/lib/types";
import { cn, getUserFromToken, parseAvatarFallbackName } from "@/lib/utils";
import { Store, User } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export function TableRowSkeleton() {
  return (
    <div className="flex flex-row flex-nowrap items-center space-x-4 w-fit">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export async function StoreSection({ store }: { store: Store }) {
  const requester = getUserFromToken(cookies().get('authToken')?.value as string) as RoledUser;
  const employees = await getAllRolesFromStore(store.id);

  return <Card className="m-2 border-none">
    <h1 className="text-xl font-bold text-center my-2">{store.name}</h1>
    {employees.map(async (employee) => {
      const user = await getUserById(employee.userId as string);

      const me = requester.id === user.id;

      return (
        <Link href={"user/" + employee.userId} key={employee.id}>
          <Card className="flex flex-row flex-nowrap items-center m-4 p-4 gap-4 bg-primary-foreground cursor-pointer">
            <Avatar>
              <AvatarFallback>{parseAvatarFallbackName(user)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <h1 className="text-xl">{user.displayname}</h1>
              <h2>{functionTranslator(employee.function)}</h2>
            </div>
            {me && <Avatar>
              <AvatarFallback>You</AvatarFallback>
            </Avatar>}
          </Card>
        </Link>
      )
    })}
  </Card>
}

export default async function RosterTable({ user }: { user: User }) {
  const stores = await getAllStores(user.id);

  return <ScrollArea className={cn("w-full h-full")}>
    {stores.map((store) => {
      return (
        <Suspense fallback={<TableRowSkeleton />} key={store.id}>
          <StoreSection store={store} />
        </Suspense>
      )
    })}
    <ScrollBar />
  </ScrollArea>
}