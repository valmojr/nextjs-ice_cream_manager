import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "../../../public/svg/AppLogo";

export default function UnloggedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row flex-nowrap h-screen w-full">
      <div className="bg-secondary w-full flex flex-col flex-nowrap items-center justify-center">
        <div className="text-end">
          <h1 className="italic text-3xl">
            &quot;O Sucesso não aceita preguiça&quot;
          </h1>
          <h1 className="italic text-xl mr-8">João Adibe</h1>
        </div>
      </div>
      <div className="w-96 flex flex-col flex-nowrap items-center justify-start py-8">
        <AppLogo />
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
        {children}
      </div>
    </section>
  );
}
