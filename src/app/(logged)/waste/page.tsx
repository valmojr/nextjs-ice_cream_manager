import { cn } from "@/lib/utils";
import ParseWaste from "./parseWaste";
import WasteChart from "./wasteChart";
import prisma from "@/lib/database";
import { Separator } from "@/components/ui/separator";

export default async function WastePage() {
  const products = (await prisma.product.findMany()).map(product => {
    return {
      label: product.name,
      value: product.id.toString()
    }
  });

  return <>
      <ParseWaste products={products}/>
      <WasteChart/>
    </>
}