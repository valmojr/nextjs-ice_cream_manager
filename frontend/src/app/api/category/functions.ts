import prisma from "@/lib/database";
import { ProductCategory } from "@prisma/client";

export async function createProductCategory(data: ProductCategory) {
  return await prisma.productCategory.create({ data });
}

export async function getProductCategory(data: ProductCategory | number) {
  return await prisma.productCategory.findUnique({
    where: {
      id: typeof data === "number" ? data : data.id,
    },
  });
}

export async function getAllProductCategories() {
  return await prisma.productCategory.findMany();
}

export async function updateProductCategory(data: ProductCategory) {
  return await prisma.productCategory.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteProductCategory(data: ProductCategory | number) {
  return await prisma.productCategory.delete({
    where: {
      id: typeof data === "number" ? data : data.id,
    },
  });
}
