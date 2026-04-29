import { useMemo, useState } from "react";
import PageSection from "../ui/PageSection";
import FilterSelect from "../ui/FilterSelect";
import { formatCurrency } from "../lib/formatCurrency";

export default function DonutChartCard({ title, overview }) {
  const [selectedPeriod, setSelectedPeriod] = useState(
    overview?.defaultPeriod ?? overview?.periods?.[0]?.value ?? ""
  );

  const currentPeriod = useMemo(() => {
    return (
      overview?.periods?.find((period) => period.value === selectedPeriod) ??
      overview?.periods?.[0] ??
      {}
    );
  }, [overview, selectedPeriod]);

  const stats = currentPeriod?.stats ?? [];
  const totalAmount =
    Number(currentPeriod?.totalAmount ?? 0) ||
    stats.reduce((sum, item) => sum + Number(item.amount ?? 0), 0);

  const totalLabel = currentPeriod?.totalLabel ?? "Total Amount";
  const currency = currentPeriod?.currency ?? "LYD";

  const primaryStat = stats[0] ?? {
    key: "paid",
    label: "Paid Payments",
    amount: 0,
    currency,
    color: "#E3B1B1",
  };

  const secondaryStat = stats[1] ?? {
    key: "pending",
    label: "Pending Payments",
    amount: 0,
    currency,
    color: "#F4EFEC",
  };

  const [activeKey, setActiveKey] = useState(primaryStat.key);

  const size = 220;
  const strokeWidth = 34;
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const progressRatio =
    totalAmount > 0 ? Number(primaryStat.amount ?? 0) / totalAmount : 0;
  const dashLength = circumference * progressRatio;
  const dashGap = circumference - dashLength;

  return (
    <PageSection
      title={title}
      titleClassName="text-[18px] font-semibold leading-[1.35] text-[#151210]"
      headerClassName="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      action={
        <FilterSelect
          options={overview?.periods ?? []}
          value={selectedPeriod}
          onChange={(event) => setSelectedPeriod(event.target.value)}
          label={currentPeriod?.label ?? "Select"}
          className="min-w-[126px] self-start sm:self-auto"
        />
      }
      className="h-full p-5 sm:p-6 xl:p-7"
    >
      <div className="mt-4 grid gap-6 lg:grid-cols-[220px_minmax(220px,1fr)] lg:items-center xl:grid-cols-[235px_minmax(240px,1fr)] xl:gap-7">
        <div className="flex items-center justify-center">
          <div className="relative h-[190px] w-[190px] sm:h-[205px] sm:w-[205px] xl:h-[225px] xl:w-[225px]">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="h-full w-full"
              style={{ transform: "rotate(135deg)" }}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#F4EFEC"
                strokeWidth={strokeWidth}
              />

              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={primaryStat.color || "#E3B1B1"}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${dashGap}`}
                strokeLinecap="butt"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full bg-white text-center sm:h-[118px] sm:w-[118px] xl:h-[124px] xl:w-[124px]">
                <div className="whitespace-nowrap text-[18px] font-semibold leading-none text-[#151210]">
                  {formatCurrency(totalAmount, currency)}
                </div>
                <div className="mt-3 text-[13px] leading-none text-[#7E7671]">
                  {totalLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-5 xl:gap-6">
          {[primaryStat, secondaryStat].map((stat) => {
            const isActive = activeKey === stat.key;

            return (
              <button
                key={stat.key}
                type="button"
                onMouseEnter={() => setActiveKey(stat.key)}
                onFocus={() => setActiveKey(stat.key)}
                className={`rounded-[12px] px-3 py-2 text-left transition ${
                  isActive ? "bg-[#FCFAF9]" : "bg-transparent"
                }`}
              >
                <div className="whitespace-nowrap text-[18px] font-semibold leading-[1.2] text-[#151210]">
                  {formatCurrency(stat.amount, stat.currency)}
                </div>

                <div className="mt-2 whitespace-nowrap text-[15px] leading-[1.45] text-[#6F6965] sm:text-[16px]">
                  {stat.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}