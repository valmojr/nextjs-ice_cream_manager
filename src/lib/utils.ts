import { $Enums, User } from "@prisma/client";
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

type Função = "Administrador" | "Proprietário" | "Gerente" | "Encarregado" | "Funcionário";

export function functionTranslator(functionEnum: $Enums.Functions): Função {
  switch (functionEnum) {
    case $Enums.Functions.Administrator:
      return "Administrador";
    case $Enums.Functions.Owner:
      return "Proprietário";
    case $Enums.Functions.Manager:
      return "Gerente";
    case $Enums.Functions.Comissioner:
      return "Encarregado";
    case $Enums.Functions.Employee:
      return "Funcionário";
  }
}

export function getHighestRole({
  roles,
}: User & { roles: { storeName: string; function: $Enums.Functions }[] }): Função {
  const func = roles.sort((a, b) => {
    if (a.function > b.function) {
      return -1;
    }
    if (a.function < b.function) {
      return 1;
    }
    return 0;
  })[0].function;

  return functionTranslator(func);
}