import { Activity, CircleDollarSign, ReceiptText, Users } from "lucide-react";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

const iconMap = {
  users: Users,
  activity: Activity,
  dollar: CircleDollarSign,
  receipt: ReceiptText,
};

function MetricCard({ metric }) {
  const Icon = iconMap[metric.icon];

  return (
    <div className="border border-[#EEE8E4] bg-white px-4 py-5">
      {Icon ? <Icon className="h-6 w-6 text-[#7C7671]" strokeWidth={1.8} /> : null}

      <div className="mt-6 text-[20px] font-semibold leading-none text-[#151210]">
        {metric.suffix
          ? formatCurrency(metric.value, metric.suffix)
          : metric.value}
      </div>

      <div className="mt-3 text-[16px] text-[#7B7672]">{metric.label}</div>
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