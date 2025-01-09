import prisma from "@/lib/database";

export async function getAllUserRoles(userId: string) {
  return await prisma.role.findMany({
    where: {
      userId,
    },
  });
}

export async function getAllRolesFromStore(storeId: string) {
  return await prisma.role.findMany({
    where: {
      storeId,
    },
  });
}
