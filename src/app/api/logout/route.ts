import { cookies } from "next/headers";

export function GET(request: Request) {
  cookies().delete("authToken");

  return new Response(null, {
    status: 200,
  });
}