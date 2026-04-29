export default function AuthButton({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={[
        "flex h-[54px] w-full items-center justify-center bg-[#E8B0B2] text-[16px] font-medium text-[#1F1B1A] transition",
        "hover:bg-[#DFA1A3]",
        "disabled:cursor-not-allowed disabled:bg-[#FCF6F6] disabled:text-[#8F8F8F]",
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}