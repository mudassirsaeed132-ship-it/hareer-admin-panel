import { useMemo, useState } from "react";
import PageSection from "../ui/PageSection";
import FilterSelect from "../ui/FilterSelect";
import ChartTooltip from "./ChartTooltip";

function getBarHeight(value, maxValue, maxBarHeight = 205) {
  if (!maxValue) return 16;
  return Math.max(16, (value / maxValue) * maxBarHeight);
}

export default function BarChartCard({
  title,
  overview,
  renderTooltip,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState(
    overview.defaultPeriod ?? overview.periods?.[0]?.value ?? ""
  );

  const currentPeriod = useMemo(() => {
    return (
      overview.periods.find((period) => period.value === selectedPeriod) ||
      overview.periods[0]
    );
  }, [overview.periods, selectedPeriod]);

  const [activeIndex, setActiveIndex] = useState(() => {
    const initialIndex = currentPeriod?.bars?.findIndex((item) => item.isActive);
    return initialIndex >= 0 ? initialIndex : 0;
  });

  const bars = currentPeriod?.bars ?? [];
  const maxValue = Math.max(...bars.map((item) => item.value), 1);

  const handlePeriodChange = (event) => {
    const nextValue = event.target.value;
    setSelectedPeriod(nextValue);

    const nextPeriod =
      overview.periods.find((period) => period.value === nextValue) ||
      overview.periods[0];

    const nextIndex = nextPeriod?.bars?.findIndex((item) => item.isActive);
    setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
  };

  return (
    <PageSection
      title={title}
      titleClassName="text-[18px] font-semibold leading-[1.3] text-[#151210]"
      headerClassName="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      action={
        <FilterSelect
          options={overview.periods}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          label={currentPeriod?.label ?? "Select"}
          className="min-w-[132px] self-start sm:self-auto"
        />
      }
      className="p-5 sm:p-6 xl:p-7"
    >
      <div className="relative mt-5 grid grid-cols-[42px_1fr] gap-3 sm:mt-6 sm:grid-cols-[46px_1fr] xl:grid-cols-[52px_1fr] xl:gap-4">
        <div className="flex h-[245px] flex-col justify-between pb-9 text-[12px] font-medium text-[#8B8581] sm:h-[260px] sm:text-[13px] xl:h-[295px] xl:pb-10 xl:text-[14px]">
          {overview.axisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="relative h-[245px] sm:h-[260px] xl:h-[295px]">
          <div className="absolute inset-0 flex flex-col justify-between pb-9 xl:pb-10">
            {overview.axisLabels.map((label, index) => (
              <div key={`${label}-${index}`} className="border-t border-[#EEE8E4]" />
            ))}
          </div>

          <div className="relative z-10 flex h-full items-end justify-between gap-3 pb-9 pt-4 sm:gap-3.5 xl:gap-4 xl:pb-10 xl:pt-5">
            {bars.map((item, index) => {
              const height = `${getBarHeight(item.value, maxValue)}px`;
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.day}
                  className="relative flex flex-1 flex-col items-center justify-end"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  {isActive && item.tooltip ? (
                    <ChartTooltip className="absolute bottom-[106px] left-1/2 hidden w-[144px] -translate-x-1/2 lg:block xl:bottom-[126px] xl:w-[156px]">
                      {renderTooltip ? renderTooltip(item) : null}
                    </ChartTooltip>
                  ) : null}

                  <button
                    type="button"
                    className={
                      isActive
                        ? "w-full max-w-[60px] min-w-[26px] bg-[#E4B2B2] outline-none sm:max-w-[64px] xl:max-w-[72px]"
                        : "w-full max-w-[60px] min-w-[26px] bg-[#F3E6E6] outline-none sm:max-w-[64px] xl:max-w-[72px]"
                    }
                    style={{ height }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-label={`${item.day} data`}
                  />

                  <span className="mt-7 text-[12px] font-medium tracking-[0.02em] text-[#7C7773] sm:mt-8 sm:text-[13px] xl:text-[15px]">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageSection>
  );
}