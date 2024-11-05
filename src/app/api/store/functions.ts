import prisma from "@/lib/database";

export async function getAllStores(userId: string) {
  return await prisma.store.findMany({
    where: {
      roles: {
        some: {
          userId,
        },
      }
    },
  });
}