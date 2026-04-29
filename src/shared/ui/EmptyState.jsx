export default function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="rounded-[24px] border border-[#E9E3DF] bg-white px-6 py-10 text-center sm:px-8">
      <h2 className="text-[24px] font-semibold text-[#151210]">{title}</h2>
      <p className="mx-auto mt-3 max-w-[560px] text-[18px] text-[#7B7672]">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}