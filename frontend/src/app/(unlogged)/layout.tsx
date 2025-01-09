import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import AppLogo from "../../../public/svg/AppLogo";

export default function UnloggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row flex-nowrap h-full w-full">
      <div className="lg:w-full flex flex-col flex-nowrap items-center justify-center w-0 bg-secondary">
        <div className="text-end">
          <h1 className="italic lg:text-3xl text-[0px] font-bold">
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
        <div className={cn("flex flex-row flex-nowrap h-full my-auto items-center justify-center")}>
          <div className={cn("flex flex-row flex-nowrap items-center justify-center",
            "w-fit h-fit",
            "bg-primary p-10 rounded-full",
          )}>
            <AppLogo className="stroke-background" size={80} />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
