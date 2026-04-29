import SurfaceCard from "./SurfaceCard";

export default function PlaceholderPage({
  title,
  description = "This module will be built next.",
}) {
  return (
    <SurfaceCard className="p-8">
      <h1 className="font-serif text-[40px] leading-none text-[#151210]">
        {title}
      </h1>
      <p className="mt-4 text-[18px] text-[#7B7672]">{description}</p>
    </SurfaceCard>
  );
}