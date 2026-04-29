export default function AuthCard({ children, className = "" }) {
  return (
    <section
      className={[
        "w-full max-w-[540px] bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-[72px]",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}