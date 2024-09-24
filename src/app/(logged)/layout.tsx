import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserFromToken } from "@/lib/utils";
import { User } from "@prisma/client";
import { Key, LayoutDashboard, Package2, SeparatorHorizontal, Users } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoggedLayoutTopMenu from "./topmenu";

export default function loggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('authToken')?.value as string;
  const user = getUserFromToken(token) as User;

  return (
    <>
      <LoggedLayoutTopMenu user={user}/>
      {children}
    </>
  );
}
