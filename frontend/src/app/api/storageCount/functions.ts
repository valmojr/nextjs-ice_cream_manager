import prisma from "@/lib/database";

export async function getAllStorageCount(userId: string) {
  return await prisma.storageCount.findMany({
    where: {
      store: {
        roles: {
          some: {
            userId
          }
        }
      }
    }
  })
}

export async function getAllStorageCountByStoreId(storeId: string) {
  return await prisma.storageCount.findMany({
    where: {
      storeId
    }
  })
}

export async function getMostRecentStorageCountByStoreId(storeId: string) {
  return await prisma.storageCount.findFirst({
    where: {
      storeId
    },
    orderBy: {
      date: 'desc'
    }
  })
}