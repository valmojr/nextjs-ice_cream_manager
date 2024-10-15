import { getUserById } from "@/app/api/user/functions";

export default async function UserPage({ params }: { params: { id: string } }) {
  try {
    const user = await getUserById(params.id);

    return <h1>{user.displayname}</h1>
  } catch (error) {
    return <p>Failed to retrieve User {params.id} information</p>
  }
}