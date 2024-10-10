'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn, parseAvatarFallbackName } from "@/lib/utils";
import { $Enums, User } from "@prisma/client";
import { Coins, LayoutDashboard, LogOut, Package2, Settings, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppLogo from "../../../public/svg/AppLogo";
import { functionTranslator, getHighestRole } from "@/lib/authorization";

export default function LoggedLayoutTopMenu({ user }: { user: User & { roles: { storeName: string, function: $Enums.Functions }[] } }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin", icon: Settings, label: "Administração" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/financial", icon: Coins, label: "Financeiro" },
    { href: "/roster", icon: Users, label: "Pessoal" },
    { href: "/waste", icon: Trash2, label: "Desperdício" },
    { href: "/storage", icon: Package2, label: "Estoque" },
  ];

  const highestRole = getHighestRole(user);

  switch (highestRole) {
    case "Funcionário":
      navItems.shift();
      navItems.shift();
      navItems.shift();
      navItems.shift();
      break;
    case "Encarregado":
      navItems.shift();
      navItems.shift();
      navItems.shift();
      break;
    case "Gerente":
      navItems.shift();
      navItems.shift();
      navItems.shift();
      break;
    case "Proprietário":
      navItems.shift();
      break;
    case "Administrador":
      break;
  }

  function onLogout() {
    fetch("/api/logout");
    router.push("/login");
  }

  return (
    <div className={cn("absolute flex flex-row flex-nowrap w-full h-fit rounded-none p-2 gap-2 justify-between items-center border shadow-xl")}>
      <div className="flex flex-row flex-nowrap items-center w-full h-full md:gap-4 gap-2">
        <Link href={"/main"}>
          <div className={cn("flex flex-rol flex-nowrap items-center justify-center rounded-lg", "bg-primary p-2")}>
            <AppLogo className="stroke-background" />
          </div>
        </Link>
        {
          user.roles.length > 0 ? navItems.map(item => {
            return <Link href={item.href} key={item.label}>
              <div className={cn(
                "flex flex-row flex-nowrap w-fit p-2 rounded-md lg:gap-2 xl:px-4",
                "cursor-pointer",
                "items-center justify-center",
                pathname === item.href ?
                  "bg-primary text-primary-foreground hover:bg-primary/90" :
                  "hover:bg-accent hover:text-accent-foreground"
              )}>
                <item.icon />
                <h1 className="lg:text-lg text-[0px]">{item.label}</h1>
              </div>
            </Link>
          }) :
            <div className={cn("flex flex-row flex-nowrap", "items-center justify-center", "bg-red-500 w-full h-10 rounded-lg")}>
              <h1 className="text-xl text-white">
                Usuário não autorizado
              </h1>
              <h1 className="lg:text-xl text-[0px] text-white">{", contate um administrador"}</h1>
            </div>
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
              {
                user.roles.length === 0 ? <h2 className="text-md">Não autorizado em nenhuma loja</h2> :
                  user.roles.map(role => {
                    return <h2 key={role.storeName} className="text-md">{functionTranslator(role.function)} | {role.storeName}</h2>
                  })
              }
            </div>
            <SheetFooter className="flex flex-col sm:flex-col">
              <Button className="w-full flex items-center gap-2" onClick={() => onLogout()}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
