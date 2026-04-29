import LanguageSelect from "../../../shared/ui/LanguageSelect";

export default function AuthHeader() {
  return (
    <header className="flex h-[76px] w-full shrink-0 items-center justify-between bg-white px-6 sm:px-8 lg:px-10 xl:px-12">
      <div className="font-serif text-[30px] font-semibold leading-none tracking-[-0.03em] text-[#E8B0B2] sm:text-[34px]">
        Hareer+
      </div>

      <LanguageSelect />
    </header>
  );
}