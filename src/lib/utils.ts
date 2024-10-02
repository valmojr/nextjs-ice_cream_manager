import { type ClassValue, clsx } from "clsx";
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserFromToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || "", {
    complete: false,
  });
}