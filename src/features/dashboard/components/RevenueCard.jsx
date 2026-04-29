import { CircleDollarSign } from "lucide-react";
import StatCard from "../../../shared/ui/StatCard";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

export default function RevenueCard({
  amount,
  currency,
  label,
}) {
  return (
    <StatCard
      icon={CircleDollarSign}
      value={formatCurrency(amount, currency)}
      label={label}
    />
  );
}