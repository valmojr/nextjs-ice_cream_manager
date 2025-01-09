"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, ClipboardPenLine, Scale } from "lucide-react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductWaste as Waste } from "@prisma/client";
import { RoledUser as User } from "@/lib/types";

const FormSchema = z.object({
  amount: z
    .number({
      invalid_type_error: "Apenas numeros",
      required_error: "Preciso do valor do peso",
    })
    .min(0, { message: "valor inválido" }),
  date: z.date({
    invalid_type_error: "Precisa ser uma data válida",
    required_error: "Preciso da data",
  }),
  plate: z.boolean().default(true),
  productId: z
    .number({
      required_error: "Selecione o produto",
    }),
  storeId: z.string()
});

export default function WasteForm({
  products,
  user,
}: {
  products: { label: string; value: number }[];
  user: User;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plate: true,
    },
  });

  const { toast } = useToast();

  const { isSubmitting, isSubmitted } = useFormState({ control: form.control });

  async function onSubmit({ plate, ...data }: z.infer<typeof FormSchema>) {
    const dataWaste = {
      ...data,
      amount: plate ? data.amount - 159 : data.amount,
      userId: user.id,
    };

    const response = await fetch("/api/waste", {
      method: "POST",
      body: JSON.stringify({ waste: dataWaste }),
    });

    const { waste } = (await response.json()) as { waste: Waste };

    const product = products.find((item) => item.value === waste.productId);
    toast({
      title: "Desperdício Anotado",
      description: `${product?.label} - ${waste.amount}g`,
      action: (
        <ToastAction
          altText="Try again"
          onClick={() =>
            fetch("/api/waste", {
              method: "DELETE",
              body: JSON.stringify({ waste }),
            })
          }
        >
          Desfazer
        </ToastAction>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={
          cn(
            "flex flex-col flex-nowrap",
            "items-center justify-start",
            "space-y-4 px-8 py-8",
            "lg:max-w-[450px] w-full",
            "h-full",
            "shadow-2xl"
          )
        }>
          <FormLabel className="lg:text-3xl text-2xl">Registrar Desperdícios</FormLabel>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Peso (g)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="000"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription className="text-[0px] lg:text-sm w-full">
                  Peso em gramas medidos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"plate"}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Medido em cuba</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Produto</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? products.find(
                            (product) => product.value === field.value
                          )?.label
                          : "Selecionar Produto"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <Command>
                      <CommandInput placeholder="Procurar produto..." />
                      <CommandList>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              value={product.label}
                              key={product.value}
                              onSelect={() => {
                                form.setValue("productId", product.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  product.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {product.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            user.roles.length > 1 ? (
              <FormField
                control={form.control}
                name="storeId"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Loja</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {
                              field.value
                                ? user.roles.find(
                                  (store) => store.storeId === field.value
                                )?.storeName
                                : "Selecionar Produto"
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="">
                        <Command>
                          <CommandInput placeholder="Procurar produto..." />
                          <CommandList>
                            <CommandEmpty>No store found.</CommandEmpty>
                            <CommandGroup>
                              {user.roles.map((store) => (
                                <CommandItem
                                  value={store.storeName}
                                  key={store.storeId}
                                  onSelect={() => {
                                    form.setValue("storeId", store.storeId);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      store.storeId === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {store.storeName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                {
                  form.setValue("storeId", user.roles[0].storeId)
                }
              </>
            )
          }
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a Data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2 cursor-pointer h-14">
            <ClipboardPenLine />
            Anotar
          </Button>
        </form>
      </Form>
    </>
  );
}