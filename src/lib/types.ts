import { $Enums, User } from "@prisma/client";

export type RoledUser = User & { roles: { storeName: string, function: $Enums.Functions }[] }

export type Função = "Administrador" | "Proprietário" | "Gerente" | "Encarregado" | "Funcionário"