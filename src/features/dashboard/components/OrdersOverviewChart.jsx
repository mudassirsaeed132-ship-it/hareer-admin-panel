import BarChartCard from "../../../shared/charts/BarChartCard";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

export default function OrdersOverviewChart({ overview }) {
  return (
    <BarChartCard
      title="Order Overview"
      overview={overview}
      renderTooltip={(item) => (
        <>
          <div className="text-[15px] font-semibold text-[#1F1B1A] xl:text-[16px]">
            {item.tooltip.orders}
            <span className="ml-1 text-[12px] font-normal text-[#9A9591] xl:text-[13px]">
              orders
            </span>
          </div>

          <div className="mt-2 text-[15px] font-semibold text-[#1F1B1A] xl:text-[16px]">
            {formatCurrency(item.tooltip.revenue, item.tooltip.currency)}
            <span className="ml-1 text-[12px] font-normal text-[#9A9591] xl:text-[13px]">
              revenue
            </span>
          </div>
        </>
      )}
    />
  );
}