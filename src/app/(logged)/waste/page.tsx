import { cn, getUserFromToken } from "@/lib/utils";
import WasteChart from "./wasteChart";
import prisma from "@/lib/database";
import { cookies } from "next/headers";
import { User } from "@prisma/client";
import WasteForm from "./wasteForm";

export default async function WastePage() {
  const products = (await prisma.product.findMany()).map(product => {
    return {
      label: product.name,
      value: product.id
    }
  });

  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;

  return <>
    <WasteForm products={products} user={user} />
    <WasteChart />
  </>
}