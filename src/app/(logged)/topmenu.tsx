'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn, parseAvatarFallbackName } from "@/lib/utils";
import { User } from "@prisma/client";
import { Coins, LayoutDashboard, LogOut, Package2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppLogo from "../../../public/svg/AppLogo";

export default function LoggedLayoutTopMenu({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/financial", icon: Coins, label: "Financeiro" },
    { href: "/waste", icon: Trash2, label: "Desperdício" },
    { href: "/storage", icon: Package2, label: "Estoque" },
    { href: "/roster", icon: Users, label: "Pessoal" },
  ];

  function onLogout() {
    fetch("/api/logout");
    router.push("/login");
  }

  return (
    <Card className={cn("absolute flex flex-row flex-nowrap w-full h-fit rounded-none px-2 py-2 gap-2 justify-between items-center")}>
      <div className="flex flex-row flex-nowrap items-center w-full h-full gap-3">
        <Link href={"/main"}>
          <div className={cn("flex flex-rol flex-nowrap items-center justify-center rounded-lg","bg-primary p-2")}>
            <AppLogo size={28} className="stroke-background" />
          </div>
        </Link>
        {
          navItems.map(item => {
            return <div key={item.label} className={cn(
              "flex flex-row flex-nowrap w-fit p-2 rounded-md gap-2",
              "cursor-pointer",
              "items-center justify-center",
              pathname === item.href ?
                "bg-primary text-primary-foreground hover:bg-primary/90" :
                "hover:bg-accent hover:text-accent-foreground"
            )}>
              <item.icon />
              <Link href={item.href} className="lg:text-lg text-[0px]">{item.label}</Link>
            </div>
          })
        }
      </div>
      <div className="flex flex-row flex-nowrap items-center gap-3">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>{parseAvatarFallbackName(user)}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col items-center py-4 gap-4">
              <Avatar className="h-36 w-36">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@johndoe" />
                <AvatarFallback className="text-5xl">{parseAvatarFallbackName(user)}</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl">{user.displayname}</h1>
              <h2 className="text-md">{user.username}</h2>
            </div>
            <SheetFooter className="flex flex-col sm:flex-col">
              <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => onLogout()}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}
