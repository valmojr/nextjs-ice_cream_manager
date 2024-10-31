'use client';

import { cn } from "@/lib/utils";
import { Product, Store } from "@prisma/client";
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

type ProductCount = {
  productId: number;
  count: number;
};


export default function StorageCountForm({ stores, products }: { stores: Store[], products: Product[] }) {
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
      <h1 className="text-2xl">{product.name}</h1>
      <div className="flex flex-row gap-4">
        <div className={cn("text-2xl w-20 h-14 bg-foreground text-background rounded-md", " flex flex-row flex-nowrap items-center justify-center")}>
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
    "w-full h-full lg:max-w-[600px]",
    "border")}>
    {(selectedStore ? (<>
      {products.map((product) => (
        <ProductFrame key={product.id} product={product} />
      ))}
      <Button
        onClick={submitCount}
        className={cn("h-12 w-48 mt-4", "bg-foreground text-background text-2xl")}
      >
        Confirmar
      </Button>
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