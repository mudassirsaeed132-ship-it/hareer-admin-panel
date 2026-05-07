import { Bolt, CircleDollarSign, Users } from "lucide-react";

import ordersIcon from "../../../shared/assets/icons/receipt-2.svg";
import vendorsIcon from "../../../shared/assets/icons/profile-2user.svg";

const ASSET_ICON_FILTER =
  "brightness(0) saturate(100%) invert(48%) sepia(1%) saturate(0%) hue-rotate(158deg) brightness(93%) contrast(88%)";

function getMetricType(metric = {}) {
  const value = `${metric.id || ""} ${metric.key || ""} ${metric.label || ""} ${
    metric.title || ""
  }`.toLowerCase();

  if (value.includes("revenue") || value.includes("payment")) return "revenue";
  if (value.includes("order")) return "orders";
  if (value.includes("vendor")) return "vendors";
  if (value.includes("categor")) return "categories";
  if (value.includes("visitor")) return "visitors";

  return "default";
}

function DashboardAssetIcon({ src }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="h-[22px] w-[22px] shrink-0 object-contain xl:h-[24px] xl:w-[24px]"
      style={{ filter: ASSET_ICON_FILTER }}
    />
  );
}

function DashboardMetricIcon({ metric }) {
  const type = getMetricType(metric);

  if (type === "orders") {
    return <DashboardAssetIcon src={ordersIcon} />;
  }

  if (type === "vendors") {
    return <DashboardAssetIcon src={vendorsIcon} />;
  }

  if (type === "visitors") {
    return (
      <Users
        className="h-[22px] w-[22px] shrink-0 text-[#7A7A7A] xl:h-[24px] xl:w-[24px]"
        strokeWidth={1.8}
      />
    );
  }

  if (type === "categories") {
    return (
      <Bolt
        className="h-[22px] w-[22px] shrink-0 text-[#7A7A7A] xl:h-[24px] xl:w-[24px]"
        strokeWidth={1.8}
      />
    );
  }

  return (
    <CircleDollarSign
      className="h-[22px] w-[22px] shrink-0 text-[#7A7A7A] xl:h-[24px] xl:w-[24px]"
      strokeWidth={1.8}
    />
  );
}

function formatMetricNumber(value) {
  if (typeof value === "number") {
    return value.toLocaleString("en-US");
  }

  return value;
}

function getMetricValue(metric = {}) {
  const value = metric.value ?? metric.amount ?? metric.total ?? metric.count ?? "—";

  if (metric.currency && value !== "—") {
    return `${formatMetricNumber(value)} ${metric.currency}`;
  }

  return formatMetricNumber(value);
}

function getMetricLabel(metric = {}) {
  return metric.label ?? metric.title ?? metric.name ?? "";
}

export default function DashboardMetrics({ metrics = [], items = [], stats = [] }) {
  const cards = metrics.length ? metrics : items.length ? items : stats;

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((metric) => (
        <article
          key={metric.id || metric.key || metric.label || metric.title}
          className="min-h-[126px] border border-[#E7E1DE] bg-white px-5 py-5"
        >
          <div className="mb-6 flex items-center">
            <DashboardMetricIcon metric={metric} />
          </div>

          <div className="space-y-2">
            <p className="text-[24px] font-semibold leading-none text-[#111111]">
              {getMetricValue(metric)}
            </p>

            <p className="text-[16px] font-normal leading-none text-[#6F6F6F]">
              {getMetricLabel(metric)}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}