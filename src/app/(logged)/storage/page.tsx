import { getUserFromToken } from "@/lib/utils";
import ProductList from "./ProductList"
import StorageCount from "./StorageCount"
import { RoledUser as User } from "@/lib/types";
import { cookies } from "next/headers";

export default function StorageHistoryPage() {
  const user = getUserFromToken(cookies().get('authToken')?.value as string) as User;
  return <>
    <ProductList/>
    <StorageCount/>
  </>
}