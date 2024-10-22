'use client';

import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StorageCountForm({ stores }: { stores: Store[] }) {
  const selectStoreSchema = z.object({
    selectedStore: z.string({ message: "Selecione uma loja para continuar" }),
  });
  const selectStoreForm = useForm<z.infer<typeof selectStoreSchema>>({
    resolver: zodResolver(selectStoreSchema),
  })
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  function onSubmitStoreSelection(data: z.infer<typeof selectStoreSchema>) {
    const foundSelectedStore = stores.find((store) => store.id === data.selectedStore) as Store;

    setSelectedStore(foundSelectedStore);
  }
  return <div className={cn(
    "flex flex-col flex-nowrap justify-center items-center",
    "w-full h-full lg:max-w-[600px]",
    "border")}>
    {(selectedStore ? (<>
      <h1>Hello there</h1>
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