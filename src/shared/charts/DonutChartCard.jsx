import { useEffect, useMemo, useState } from "react";
import PageSection from "../ui/PageSection";
import FilterSelect from "../ui/FilterSelect";
import { formatCurrency } from "../lib/formatCurrency";

function hexToRgba(hex, alpha = 0.16) {
  const cleanHex = String(hex || "").replace("#", "");

  if (cleanHex.length !== 6) {
    return "rgba(228, 178, 178, 0.16)";
  }

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getSafeStats(stats = [], currency = "LYD") {
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

  return [primaryStat, secondaryStat];
}

export default function DonutChartCard({ title, overview }) {
  const [selectedPeriod, setSelectedPeriod] = useState(
    overview?.defaultPeriod ?? overview?.periods?.[0]?.value ?? ""
  );

  const [activeKey, setActiveKey] = useState("total");

  const currentPeriod = useMemo(() => {
    return (
      overview?.periods?.find((period) => period.value === selectedPeriod) ??
      overview?.periods?.[0] ??
      {}
    );
  }, [overview, selectedPeriod]);

  const stats = currentPeriod?.stats ?? [];
  const currency = currentPeriod?.currency ?? "LYD";
  const [primaryStat, secondaryStat] = getSafeStats(stats, currency);

  const totalAmount =
    Number(currentPeriod?.totalAmount ?? 0) ||
    stats.reduce((sum, item) => sum + Number(item.amount ?? 0), 0);

  const totalLabel = currentPeriod?.totalLabel ?? "Total Amount";

  const chart = useMemo(() => {
    const size = 220;
    const strokeWidth = 34;
    const radius = 74;
    const circumference = 2 * Math.PI * radius;

    const primaryAmount = Number(primaryStat.amount ?? 0);
    const secondaryAmount = Number(secondaryStat.amount ?? 0);
    const safeTotal = totalAmount || primaryAmount + secondaryAmount || 1;

    const primaryLength = (primaryAmount / safeTotal) * circumference;
    const secondaryLength = (secondaryAmount / safeTotal) * circumference;

    return {
      size,
      strokeWidth,
      radius,
      circumference,
      primaryLength,
      secondaryLength,
      primaryDasharray: `${primaryLength} ${circumference}`,
      secondaryDasharray: `${secondaryLength} ${circumference}`,
      secondaryDashoffset: -primaryLength,
    };
  }, [primaryStat.amount, secondaryStat.amount, totalAmount]);

  const activeDisplay = useMemo(() => {
    if (activeKey === primaryStat.key) {
      return {
        amount: primaryStat.amount,
        currency: primaryStat.currency ?? currency,
        label: primaryStat.label,
      };
    }

    if (activeKey === secondaryStat.key) {
      return {
        amount: secondaryStat.amount,
        currency: secondaryStat.currency ?? currency,
        label: secondaryStat.label,
      };
    }

    return {
      amount: totalAmount,
      currency,
      label: totalLabel,
    };
  }, [activeKey, primaryStat, secondaryStat, totalAmount, totalLabel, currency]);

  useEffect(() => {
    setActiveKey("total");
  }, [selectedPeriod]);

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
              viewBox={`0 0 ${chart.size} ${chart.size}`}
              className="h-full w-full"
              style={{ transform: "rotate(135deg)" }}
            >
              <circle
                cx={chart.size / 2}
                cy={chart.size / 2}
                r={chart.radius}
                fill="none"
                stroke="#F4EFEC"
                strokeWidth={chart.strokeWidth}
              />

              <circle
                cx={chart.size / 2}
                cy={chart.size / 2}
                r={chart.radius}
                fill="none"
                stroke={primaryStat.color || "#E3B1B1"}
                strokeWidth={chart.strokeWidth}
                strokeDasharray={chart.primaryDasharray}
                strokeDashoffset="0"
                strokeLinecap="butt"
                className="cursor-pointer transition-opacity hover:opacity-85"
                onMouseEnter={() => setActiveKey(primaryStat.key)}
                onFocus={() => setActiveKey(primaryStat.key)}
                onClick={() => setActiveKey(primaryStat.key)}
                tabIndex={0}
              />

              <circle
                cx={chart.size / 2}
                cy={chart.size / 2}
                r={chart.radius}
                fill="none"
                stroke={secondaryStat.color || "#F4EFEC"}
                strokeWidth={chart.strokeWidth}
                strokeDasharray={chart.secondaryDasharray}
                strokeDashoffset={chart.secondaryDashoffset}
                strokeLinecap="butt"
                className="cursor-pointer transition-opacity hover:opacity-85"
                onMouseEnter={() => setActiveKey(secondaryStat.key)}
                onFocus={() => setActiveKey(secondaryStat.key)}
                onClick={() => setActiveKey(secondaryStat.key)}
                tabIndex={0}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setActiveKey("total")}
                className="flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full bg-white text-center sm:h-[118px] sm:w-[118px] xl:h-[124px] xl:w-[124px]"
              >
                <div className="whitespace-nowrap text-[18px] font-semibold leading-none text-[#151210]">
                  {formatCurrency(activeDisplay.amount, activeDisplay.currency)}
                </div>

                <div className="mt-3 text-[13px] leading-none text-[#7E7671]">
                  {activeDisplay.label}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-5 xl:gap-6">
          {[primaryStat, secondaryStat].map((stat) => {
            const isActive = activeKey === stat.key;
            const color = stat.color || "#E3B1B1";

            return (
              <button
                key={stat.key}
                type="button"
                onMouseEnter={() => setActiveKey(stat.key)}
                onFocus={() => setActiveKey(stat.key)}
                onClick={() => setActiveKey(stat.key)}
                className="rounded-[12px] border px-3 py-3 text-left transition"
                style={{
                  backgroundColor: isActive ? hexToRgba(color, 0.2) : "#FFFFFF",
                  borderColor: isActive ? color : "transparent",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="whitespace-nowrap text-[18px] font-semibold leading-[1.2] text-[#151210]">
                      {formatCurrency(stat.amount, stat.currency)}
                    </div>

                    <div
                      className="mt-2 whitespace-nowrap text-[15px] leading-[1.45] sm:text-[16px]"
                      style={{
                        color:
                          stat.key === secondaryStat.key ? "#6F6965" : color,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>

                  <span
                    className="mt-1 h-3 w-3 shrink-0 rounded-full border border-[#E7E1DE]"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}