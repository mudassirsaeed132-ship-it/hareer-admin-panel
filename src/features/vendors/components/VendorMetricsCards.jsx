import { CircleDollarSign } from "lucide-react";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

import peopleIcon from "../../../shared/assets/icons/people.svg";
import ratingIcon from "../../../shared/assets/icons/rating.svg";
import receiptIcon from "../../../shared/assets/icons/receipt-2.svg";

const ASSET_ICON_FILTER =
  "brightness(0) saturate(100%) invert(48%) sepia(1%) saturate(0%) hue-rotate(158deg) brightness(93%) contrast(88%)";

const assetIconMap = {
  users: peopleIcon,
  activity: ratingIcon,
  receipt: receiptIcon,
};

function AssetMetricIcon({ src }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="h-[24px] w-[24px] shrink-0 object-contain"
      style={{ filter: ASSET_ICON_FILTER }}
    />
  );
}

function MetricIcon({ metric }) {
  const assetIcon = assetIconMap[metric.icon];

  if (assetIcon) {
    return <AssetMetricIcon src={assetIcon} />;
  }

  if (metric.icon === "dollar") {
    return (
      <CircleDollarSign
        className="h-[24px] w-[24px] shrink-0 text-[#7C7671]"
        strokeWidth={1.8}
      />
    );
  }

  return null;
}

function getMetricValue(metric) {
  if (!metric?.suffix) {
    return metric?.value ?? "—";
  }

  if (typeof metric.value === "number") {
    return formatCurrency(metric.value, metric.suffix);
  }

  return `${metric.value} ${metric.suffix}`;
}

function MetricCard({ metric }) {
  return (
    <div className="min-h-[126px] border border-[#EEE8E4] bg-white px-4 py-5">
      <MetricIcon metric={metric} />

      <div className="mt-7 text-[20px] font-semibold leading-none text-[#151210]">
        {getMetricValue(metric)}
      </div>

      <div className="mt-3 text-[16px] text-[#7B7672]">
        {metric.label}
      </div>
    </div>
  );
}

export default function VendorMetricsCards({ metrics = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.key} metric={metric} />
      ))}
    </div>
  );
}