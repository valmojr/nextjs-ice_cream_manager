import { getAllStorageCountByStoreId } from "@/app/api/storageCount/functions";
import { Card } from "@/components/ui/card";

export default async function StorageCount() {
  const mostRecentStorageCount = await getAllStorageCountByStoreId("1");
  return <Card className="lg:w-full w-[0px]">
    <h1 className="lg:text-2xl text-[0px]">{JSON.stringify(mostRecentStorageCount)}</h1>
  </Card>
  }