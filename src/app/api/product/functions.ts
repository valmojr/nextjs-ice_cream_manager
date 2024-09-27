import prisma from "@/lib/database";
import { Product } from "@prisma/client";

export async function createProduct(data: Product) {
  return await prisma.product.create({ data });
}

export async function getProduct(data: Product | number) {
  return await prisma.product.findUnique({
    where: {
      id: typeof data === "number" ? data : data.id,
    },
  });
}

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function updateProduct(data: Product) {
  return await prisma.product.update({
    where: {
      id: data.id,
    },
    data,
  });
}

export async function deleteProduct(data: Product | number) {
  return await prisma.product.delete({
    where: {
      id: typeof data === "number" ? data : data.id,
    },
  });
}
