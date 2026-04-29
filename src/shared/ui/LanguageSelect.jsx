import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import ukFlag from "../assets/icons/uk-flag.svg";

const LANGUAGE_OPTIONS = [
  {
    id: "en",
    label: "English",
    shortLabel: "EN",
    flag: ukFlag,
  },
  {
    id: "ar",
    label: "Arabic",
    shortLabel: "AR",
    flag: null,
  },
];

export default function LanguageSelect({ className = "" }) {
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[46px] shrink-0 items-center gap-3 bg-[#F8F6F4] px-4 text-[16px] font-medium text-[#1F1B1A] transition hover:bg-[#FBF1F1] sm:text-[18px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        {selectedLanguage.flag ? (
          <img
            src={selectedLanguage.flag}
            alt=""
            aria-hidden="true"
            className="h-5 w-7 shrink-0 object-cover"
          />
        ) : (
          <span className="grid h-5 w-7 shrink-0 place-items-center bg-white text-[11px] font-semibold">
            {selectedLanguage.shortLabel}
          </span>
        )}

        <span className="hidden sm:inline">{selectedLanguage.label}</span>

        <ChevronDown
          className={[
            "h-5 w-5 shrink-0 text-[#1F1B1A] transition-transform",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
          strokeWidth={2.4}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[180px] border border-[#E7E1DE] bg-white py-2 shadow-[0_16px_40px_rgba(31,27,26,0.08)]"
        >
          {LANGUAGE_OPTIONS.map((language) => {
            const isSelected = language.id === selectedLanguage.id;

            return (
              <button
                key={language.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(language)}
                className={[
                  "flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-medium transition",
                  isSelected
                    ? "bg-[#FBF1F1] text-[#1F1B1A]"
                    : "text-[#6F6A67] hover:bg-[#F8F6F4] hover:text-[#1F1B1A]",
                ].join(" ")}
              >
                {language.flag ? (
                  <img
                    src={language.flag}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-7 shrink-0 object-cover"
                  />
                ) : (
                  <span className="grid h-5 w-7 shrink-0 place-items-center bg-[#F8F6F4] text-[11px] font-semibold">
                    {language.shortLabel}
                  </span>
                )}

                <span className="min-w-0 flex-1 truncate">{language.label}</span>

                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-[#E8B0B2]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}