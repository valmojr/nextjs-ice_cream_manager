'use client';

import { cn } from "@/lib/utils";
import { Product, ProductCategory, Store } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type ProductCount = {
  productId: number;
  count: number;
};


export default function StorageCountForm({ stores, products, categories }: { stores: Store[], products: Product[], categories: ProductCategory[] }) {
  const selectStoreSchema = z.object({
    selectedStore: z.string({ message: "Selecione uma loja para continuar" }),
  });
  const selectStoreForm = useForm<z.infer<typeof selectStoreSchema>>({
    resolver: zodResolver(selectStoreSchema),
  });
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  products = products.filter((product) => {
    return product.countable;
  })

  const [productCount, setProductCount] = useState<ProductCount[]>([]);

  function ProductFrame({ product }: { product: Product }) {
    const currentCount = productCount.find((count) => count.productId === product.id)?.count || 0;
    function addCount() {
      if (currentCount > 0) {
        setProductCount(productCount.map((count) => {
          if (count.productId === product.id) {
            return { ...count, count: count.count + 1 };
          }
          return count;
        }));
      } else {
        setProductCount([...productCount, { productId: product.id, count: 1 }]);
      }
    }

    function subtractCount() {
      if (currentCount > 0) {
        setProductCount(productCount.map((count) => {
          if (count.productId === product.id) {
            return { ...count, count: count.count - 1 };
          }
          return count;
        }));
      }
    }

    return <div className={cn(
      "flex flex-row flex-nowrap justify-between items-center",
      "w-full h-fit px-8 py-4",
      "border")}>
      <h1 className="lg:text-lg text-2xl">{product.name}</h1>
      <div className="flex flex-row gap-4">
        <div className={cn("lg:text-xl text-2xl lg:w-16 lg:h-10 w-20 h-14 bg-foreground text-background rounded-md", " flex flex-row flex-nowrap items-center justify-center")}>
          {currentCount}
        </div>
        <button onClick={addCount}><PlusCircle size={48} /></button>
        {currentCount > 0 ?
          <button onClick={subtractCount}><MinusCircle size={48} /></button> :
          <button disabled><MinusCircle size={48} className="stroke-zinc-500" /></button>
        }
      </div>
    </div>
  }

  function submitCount() {
    console.log(productCount);
  }

  function onSubmitStoreSelection(data: z.infer<typeof selectStoreSchema>) {
    const foundSelectedStore = stores.find((store) => store.id === data.selectedStore) as Store;

    setSelectedStore(foundSelectedStore);
  }
  return <div className={cn(
    "flex flex-col flex-nowrap justify-center items-center",
    "w-full h-full lg:max-w-[500px]",
    "border")}>
    {(selectedStore ? (<>
      <ScrollArea className="w-full h-full">
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => {
            return product.productCategoryId === category.id
          });

          return <>
            {
              categoryProducts.length > 0 &&
              <>
              <div className="flex flex-row flex-nowrap items-center justify-center bg-foreground py-1">
                <h1 className="text-2xl text-background">{category.name}</h1>
              </div>
              {categoryProducts.map((product) => {
                return <ProductFrame key={product.id} product={product} />
              })
              }</>
            }
          </>
        }
        )}
        {products.map((product) => (
          <ProductFrame key={product.id} product={product} />
        ))}
      </ScrollArea>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="text-xl h-14 w-40 my-4">Confirmar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar a contagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Produtos:
              <ul>
                {productCount.map((count) => (
                  <li key={count.productId}>{products.find((product) => product.id === count.productId)?.name} - {count.count}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>) : (<Form {...selectStoreForm}>
      <form onSubmit={selectStoreForm.handleSubmit(onSubmitStoreSelection)} className="w-2/3 space-y-6">
        <FormField
          control={selectStoreForm.control}
          name="selectedStore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loja</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma loja" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Selecionar</Button>
      </form>
    </Form>
    ))}</div>;
}