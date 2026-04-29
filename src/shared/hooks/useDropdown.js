import { useEffect, useRef, useState } from "react";

export function useDropdown() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((current) => !current);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        closeDropdown();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return {
    dropdownRef,
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}