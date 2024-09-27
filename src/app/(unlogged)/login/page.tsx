'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const loginFormSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(100)
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        router.push('/dashboard')
      } else {
        const errorData = await response.json();
        console.error("Login failed", errorData);
        alert(errorData.error);
      }
    })
      .catch((error) => {
        console.error("Error during login", error);
      });
  }

  return (
    <Card className="bg-zinc-900 w-full lg:w-[350px] mx-auto lg:h-fit h-full flex flex-col flex-nowrap justify-start">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent className={cn("flex flex-col flex-nowrap gap-4")}>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" variant={'default'}>Login</Button>
          </form>
        </Form>
        <Link href="/register">
          <Button className="w-full" variant={'outline'}>Registrar</Button>
        </Link>
      </CardContent>
    </Card>
  )
}