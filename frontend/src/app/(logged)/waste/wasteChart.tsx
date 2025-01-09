import { getAllProductCategories } from "@/app/api/category/functions";
import { getAllWastes } from "@/app/api/waste/functions";
import { ProductWaste as Waste } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllProducts } from "@/app/api/product/functions";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function WasteChart() {
  const categories = await getAllProductCategories();
  const products = await getAllProducts();
  const wastesInDatabase = await getAllWastes();

  const joinByDatesAndProductIds = (data: Waste[]): Waste[] => {
    const joinedData: Waste[] = [];
    for (const item of data) {
      const found = joinedData.find(
        (joinedItem) =>
          joinedItem.date.getTime() == item.date.getTime() &&
          joinedItem.productId === item.productId
      );
      if (found) {
        found.amount += item.amount;
      } else {
        joinedData.push({ ...item });
      }
    }
    return joinedData;
  };

  const filteredWastes = joinByDatesAndProductIds(wastesInDatabase);

  function formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}`;
  }

  function transformData(data: Waste[]): any[] {
    const result: any[] = [];

    for (const item of data) {
      const { date, productId, amount } = item;

      let dateObject: any;
      dateObject = result.find((obj) => obj.date.getTime() === date.getTime());
      if (!dateObject) {
        dateObject = { date };
        result.push(dateObject);
      }

      dateObject[productId] = amount;
    }

    return result.sort((a, b) => b.date.getTime() - a.date.getTime());;
  }

  const tableData = transformData(filteredWastes);

  return (
    <ScrollArea className="lg:h-full lg:w-full h-[0px] w-[0px] border">
      <Table className={cn("w-full")}>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-primary text-secondary text-center font-bold">Data</TableHead>
            {products.map((product) => {
              const category = categories.filter(
                (category) => category.id === product.productCategoryId
              )[0];
              return (
                <TableHead
                  key={product.id || ""} className={cn("bg-primary text-secondary text-center font-bold")}
                >{`${product.name}`}</TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((waste) => {
            return (
              <TableRow key={waste.date.getTime()}>
                <TableCell>{formatDate(waste.date)}</TableCell>
                {products.map((product) => {
                  return (
                    <TableCell key={product.id} className="text-center">{waste[product.id]}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}