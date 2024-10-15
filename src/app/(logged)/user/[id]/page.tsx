import { getUserById } from "@/app/api/user/functions";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  return <h1>{user.displayname}</h1>
}