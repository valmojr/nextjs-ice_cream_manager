import { getUserFromToken } from "@/lib/utils";
import StorageCountForm from "./StorageCountForm"
import StorageCount from "./StorageCount"
import { RoledUser as User } from "@/lib/types";
import { cookies } from "next/headers";
import { getAllStores } from "@/app/api/store/functions";
import { getAllProducts } from "@/app/api/product/functions";

export default async function StorageHistoryPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;
  const userStores = await getAllStores(user.id);
  const products = await getAllProducts();

  return <>
    <StorageCountForm stores={userStores} products={products} />
    <StorageCount/>
  </>
}