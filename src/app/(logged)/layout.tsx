export default function loggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row flex-nowrap h-screen w-full">
      <div className="bg-secondary lg:w-full flex flex-col flex-nowrap items-center justify-center w-0">
        <div className="text-end">
          <h1 className="italic lg:text-3xl text-[0px]">
            Estamos logados
          </h1>
        </div>
      </div>
    </section>
  );
}
