import prisma from "@/lib/database";

export function getAllStores(userId: string) {
  return prisma.store.findMany({
    where: {
      roles: {
        some: {
          userId,
        },
      }
    },
  });
}