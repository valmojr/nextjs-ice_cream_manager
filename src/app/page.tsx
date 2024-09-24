import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const authentication = cookies().get('authToken')?.value;

  return authentication ? redirect('/main') : redirect('login');
}
