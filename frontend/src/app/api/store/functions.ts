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

export async function getStoreFromId(id: string) {
  return await prisma.store.findUnique({
    where: {
      id,
    }
  })
}