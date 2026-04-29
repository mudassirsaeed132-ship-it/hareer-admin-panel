import LanguageSelect from "../../../shared/ui/LanguageSelect";
import hareerLogo from "../../../shared/assets/logo/Hareer-logo.svg";

export default function AuthHeader() {
  return (
    <header className="flex h-[76px] w-full shrink-0 items-center justify-between bg-white px-6 sm:px-8 lg:px-10 xl:px-12">
      <img
        src={hareerLogo}
        alt="Hareer"
        className="w-[138px] shrink-0 object-contain sm:w-[150px]"
      />

      <LanguageSelect />
    </header>
  );
}
