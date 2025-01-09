"use server";

import { ProductWaste as Waste } from "@prisma/client";
import prisma from "@/lib/database";

export async function createWaste(data: Waste) {
  return await prisma.productWaste.create({ data });
}

export async function getWaste(wasteOrWasteId: Waste | number) {
  return await prisma.productWaste.findUnique({
    where: {
      id:
        typeof wasteOrWasteId === "number" ? wasteOrWasteId : wasteOrWasteId.id,
    },
  });
}

export async function getAllWastes() {
  return await prisma.productWaste.findMany();
}

export async function updateWaste(data: Waste) {
  return await prisma.productWaste.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteWaste(wasteOrWasteId: Waste | number) {
  return await prisma.productWaste.delete({
    where: {
      id:
        typeof wasteOrWasteId === "number" ? wasteOrWasteId : wasteOrWasteId.id,
    },
  });
}
