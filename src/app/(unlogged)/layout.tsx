import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect  } from "next/navigation";

export default function UnloggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authToken = cookies().get('authToken')?.value;

  if (authToken) {
    redirect('/dashboard');
  }

  return (
    <section className="flex flex-row flex-nowrap h-full w-full">
      <div className="lg:w-full flex flex-col flex-nowrap items-center justify-center w-0 bg-secondary">
        <div className="text-end">
          <h1 className="italic lg:text-3xl text-[0px]">
            &quot;O Sucesso não aceita preguiça&quot;
          </h1>
          <h1 className="italic lg:text-xl text-[0px] mr-8">João Adibe</h1>
        </div>
      </div>
      <div className={cn(
        "flex flex-col flex-nowrap",
        "items-center justify-end",
        "border",
        "lg:max-w-[400px] w-full py-8 px-4")}>
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
        {children}
      </div>
    </section>
  );
}
