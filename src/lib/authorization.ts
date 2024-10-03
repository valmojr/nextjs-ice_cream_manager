import { $Enums, User } from "@prisma/client";

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

export function isAdmin(user: User & { roles: { storeName: string, function: $Enums.Functions }[] }) {
  return getHighestRole(user) === "Administrador";
}

export function isOwner(user: User & { roles: { storeName: string, function: $Enums.Functions }[] }) {
  return getHighestRole(user) === "Proprietário" || getHighestRole(user) === "Administrador";
}

export function isManager(user: User & { roles: { storeName: string, function: $Enums.Functions }[] }) {
  return getHighestRole(user) === "Gerente";
}

export function isComissioner(user: User & { roles: { storeName: string, function: $Enums.Functions }[] }) {
  return getHighestRole(user) === "Encarregado";
}