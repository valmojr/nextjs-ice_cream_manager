'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();

  const registerFormSchema = z.object({
    username: z.string().min(6, { message: "Usuário muito curto" }).max(40, { message: "Usuário muito grande" }),
    email: z.string().email({ message: "Email inválido" }),
    displayname: z.string(),
    password: z.string().min(8, { message: "Senha muito curta" }).max(100, { message: "Senha muito grande" }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {},
  });

  async function onSubmitRegister(values: z.infer<typeof registerFormSchema>) {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (data) {
      toast({
        description: "Registrado com sucesso",
      });
      router.push('/login')
    } else {
      const errorData = await response.json();
      toast({
        description: "Falha ao registrar",
      })
      alert(errorData.error);
    }
  };

  return <>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className={cn(
          "flex flex-col flex-nowrap",
          "w-full h-fit",
          "space-y-4"
          )}>
          <FormField
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="displayname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome Sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="********" type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input placeholder="********" type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Registrar-se</Button>
          <Link href={'/login'}><Button variant={'secondary'} className="w-full">Voltar</Button></Link>
          </form>
      </Form>
    </>
}