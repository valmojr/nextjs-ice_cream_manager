'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { LayoutDashboard, Package2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoggedLayoutTopMenu({ user }: { user: User }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/waste", icon: Trash2, label: "Waste" },
    { href: "/storage", icon: Package2, label: "Storage" },
    { href: "/roster", icon: Users, label: "Roster" },
  ];

  return (
    <Card className={cn("flex flex-row flex-nowrap w-full h-fit rounded-none px-2 py-2 gap-2 justify-between items-center")}>
      <div className="flex flex-row flex-nowrap items-center w-full h-full gap-3">
        <Link href={"/main"}><div className="w-8 h-8 bg-foreground rounded-full" /></Link>
        {
          navItems.map(item => {
            return <div key={item.label} className={cn(
              "flex flex-row flex-nowrap w-fit py-2 px-2 rounded-md gap-2",
              "cursor-pointer",
              pathname === item.href ?
                "bg-primary text-primary-foreground hover:bg-primary/90" :
                "hover:bg-accent hover:text-accent-foreground"
            )}>
              <item.icon />
              <Link href={item.href}>{item.label}</Link>
            </div>
          })
        }
      </div>
      <div className="flex flex-row flex-nowrap items-center gap-3">
        <ModeToggle />
        <Avatar>
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
}
