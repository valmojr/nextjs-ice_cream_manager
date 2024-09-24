'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

export default function RegisterPage() {
  const registerFormSchema = z.object({
    username: z.string().min(6).max(40),
    email: z.string().email(),
    displayname: z.string(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {},
  });

  function onSubmitRegister(values: z.infer<typeof registerFormSchema>) {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(values)
    })
  };

  return <Card className="w-full lg:w-[400px] mx-auto lg:h-fit h-full flex flex-col flex-nowrap justify-start">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Register</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="space-y-4">
          <FormField
            control={registerForm.control}
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
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Display name" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type={'password'} {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm password" type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">Register</Button>
          <Link href={'/login'}><p className="">login</p></Link>
        </form>
      </Form>
    </CardContent>
  </Card>
}