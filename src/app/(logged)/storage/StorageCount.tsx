import { getAllStorageCountByStoreId } from "@/app/api/storageCount/functions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default async function StorageCount() {
  const mostRecentStorageCount = await getAllStorageCountByStoreId("1");
  return <ScrollArea className={cn("lg:w-full w-[0px] lg:h-full h-[0px] border")}>
    <h1 className="lg:text-2xl text-[0px]">
      {JSON.stringify(mostRecentStorageCount)}
    </h1>
  </ScrollArea>
}