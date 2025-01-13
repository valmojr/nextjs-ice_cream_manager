import { getMostRecentStorageCountByStoreId } from "@/app/api/storageCount/functions";
import { getAllStores } from "@/app/api/store/functions";
import ErrorCard from "@/components/reusables/error-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, getUserFromToken } from "@/lib/utils";
import { Store, User } from "@prisma/client";
import { cookies } from "next/headers";

async function StorageCountTable({ store }: { store: Store }) {
  const mostRecentStorageCount = await getMostRecentStorageCountByStoreId(store.id);

  if (!mostRecentStorageCount) {
    return <ErrorCard content="No storage count found" />
  }


  return <p>Storage Count Id: {mostRecentStorageCount?.id}</p>
}

export default async function StorageCount() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;
  const userStores = await getAllStores(user.id);

  return <ScrollArea className={cn(
    "w-full h-full",
    "flex flex-col flex-nowrap",
    "items-center justify-center",
  )}>
    {userStores.length > 1 ? <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione uma Loja" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lojas</SelectLabel>
            {
              userStores.map((store) =>
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>)
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </> :
      <StorageCountTable store={userStores[0]} />}
  </ScrollArea>
}