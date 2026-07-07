import LanguageSelect from "../../../shared/ui/LanguageSelect";
import hareerLogo from "../../../shared/assets/logo/Hareer-logo.svg";
import hareerMark from "../../../shared/assets/logo/Hareer-mark.svg";

export default function AuthHeader() {
  return (
    <header className="flex h-[76px] w-full shrink-0 items-center justify-between bg-white px-6 sm:px-8 lg:px-10 xl:px-12">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={hareerMark}
          alt=""
          aria-hidden="true"
          className="h-10 w-10 shrink-0 rounded-full border border-[#EDE4E0] object-contain sm:h-11 sm:w-11"
        />

        <img
          src={hareerLogo}
          alt="Hareer"
          className="w-[138px] shrink-0 object-contain sm:w-[150px]"
        />
      </div>

      <LanguageSelect />
    </header>
  );
}
