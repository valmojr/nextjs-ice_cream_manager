import { $Enums, User } from "@prisma/client";

export type RoledUser = User & { roles: { storeId: string, storeName: string, function: $Enums.Functions }[] }

export type Função = "Administrador" | "Proprietário" | "Gerente" | "Encarregado" | "Funcionário"