import { $Enums, User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserFromToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || "", {
    complete: false,
  });
}

export function parseAvatarFallbackName(user: User) {
  if (user.displayname) {
    if (user.displayname.split(" ").length > 1) {
      return (
        user.displayname.split(" ")[0][0] + user.displayname.split(" ")[1][0]
      );
    } else {
      return (
        user.displayname[0].toUpperCase() +
        user.displayname[user.displayname.length - 1].toUpperCase()
      );
    }
  } else {
    return user.username[0].toUpperCase();
  }
}
