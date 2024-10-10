import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";

export function checkToken() {
  const authentication = cookies().get("authToken")?.value;
  if (authentication) {
    try {
      const decoded = jwt.verify(
        authentication,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;
      const now = Date.now() / 1000;
      if (typeof decoded.exp === "number" && decoded.exp < now) {
        cookies().delete("authToken");
        return redirect("login");
      }

      return redirect("/main");
    } catch (error) {
      fetch("/api/logout");
      return redirect("/login");
    }
  }
}