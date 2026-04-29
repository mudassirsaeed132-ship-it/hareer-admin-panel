import PaymentStatusBadge from "./PaymentStatusBadge";
import { formatMoney } from "../utils/payments.helpers";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HEADER_CELL_CLASS =
  "border-b border-r border-[#EEE8E4] bg-white px-[16px] py-[16px] text-left text-[14px] font-normal leading-[20px] text-[#7B7672] last:border-r-0";

const BODY_CELL_CLASS =
  "border-b border-r border-[#EEE8E4] px-[16px] py-[14px] align-middle text-[16px] leading-[22px] text-[#151210] last:border-r-0";

function DownloadButton() {
  return (
    <button
      type="button"
      className="inline-flex h-[36px] min-w-[128px] items-center justify-center bg-[#F3F1F1] px-4 text-[14px] font-medium text-[#151210] transition hover:bg-[#ECE8E8]"
    >
      Download Invoice
    </button>
  );
}

export default function PaymentsTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1040px] border-collapse bg-white table-fixed">
        <colgroup>
          <col className="w-[80px]" />
          <col className="w-[160px]" />
          <col className="w-[220px]" />
          <col className="w-[130px]" />
          <col className="w-[190px]" />
          <col className="w-[130px]" />
          <col className="w-[170px]" />
        </colgroup>

        <thead>
          <tr>
            <th className={HEADER_CELL_CLASS}>Sr #</th>
            <th className={HEADER_CELL_CLASS}>Invoice ID</th>
            <th className={HEADER_CELL_CLASS}>Customer Name</th>
            <th className={HEADER_CELL_CLASS}>Amount</th>
            <th className={HEADER_CELL_CLASS}>Type</th>
            <th className={HEADER_CELL_CLASS}>Status</th>
            <th className={HEADER_CELL_CLASS}>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={cn(BODY_CELL_CLASS, "font-semibold")}>{row.serial}</td>
              <td className={BODY_CELL_CLASS}>{row.invoiceId}</td>
              <td className={BODY_CELL_CLASS}>{row.customerName}</td>
              <td className={BODY_CELL_CLASS}>
                {formatMoney(row.amount, row.currency)}
              </td>
              <td className={BODY_CELL_CLASS}>{row.type}</td>
              <td className={BODY_CELL_CLASS}>
                <div className="flex min-h-[36px] items-center">
                  <PaymentStatusBadge status={row.status} />
                </div>
              </td>
              <td className={BODY_CELL_CLASS}>
                <div className="flex min-h-[36px] items-center">
                  <DownloadButton />
                </div>
              </td>
            </tr>
          ))}

          {!rows.length ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-[15px] text-[#7B7672]"
              >
                No payments found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}