import DonutChartCard from "../../../shared/charts/DonutChartCard";

export default function PaymentsOverviewChart({ overview }) {
  return <DonutChartCard title="Payments Overview" overview={overview} />;
}