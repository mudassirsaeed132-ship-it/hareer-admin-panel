export default function AppShell({ sidebar, header, children }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F6F3F1] text-[#1F1B1A]">
      {sidebar}

      <div className="flex min-h-screen min-w-0 w-full flex-col lg:pl-[252px] xl:pl-[264px]">
        <div className="min-w-0 w-full shrink-0">
          {header}
        </div>

        <main className="min-w-0 w-full flex-1 overflow-x-hidden px-3 pb-6 pt-4 sm:px-4 md:px-5 lg:px-6 lg:pt-5 xl:px-8">
          <div className="mx-auto w-full max-w-[1600px] min-w-0 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}