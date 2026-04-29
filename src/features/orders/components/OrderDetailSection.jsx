export default function OrderDetailSection({ title, children }) {
  return (
    <section className="border border-[#EEE8E4] bg-white p-4 sm:p-4.5">
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9B938D]">
        {title}
      </h3>

      <div className="mt-3">{children}</div>
    </section>
  );
}