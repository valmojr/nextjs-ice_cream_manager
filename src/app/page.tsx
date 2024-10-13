import { checkToken } from "@/lib/CheckToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  checkToken();

  const authentication = cookies().get("authToken")?.value;
  authentication ? redirect("/dashboard") : redirect("/login");
}
