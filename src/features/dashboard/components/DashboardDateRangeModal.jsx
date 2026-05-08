import { useEffect, useState } from "react";
import Modal from "../../../shared/ui/Modal";

function FieldCard({ id, label, error, children }) {
  return (
    <div>
      <div className="rounded-lg bg-[#FAF8F7] px-3 py-3">
        <label
          htmlFor={id}
          className="block text-[12px] leading-none text-[#7E7671]"
        >
          {label}
        </label>
        <div className="mt-2">{children}</div>
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-[#F04444]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return "Select both a start date and an end date.";
  }

  if (endDate < startDate) {
    return "End date cannot be before start date.";
  }

  return "";
}

export default function DashboardDateRangeModal({
  open,
  dateRange,
  onClose,
  onApply,
}) {
  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setDraftStartDate(dateRange?.startDate ?? "");
    setDraftEndDate(dateRange?.endDate ?? "");
    setError("");
  }, [dateRange?.endDate, dateRange?.startDate, open]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextError = validateDateRange(draftStartDate, draftEndDate);
    setError(nextError);

    if (nextError) {
      return;
    }

    onApply?.({
      startDate: draftStartDate,
      endDate: draftEndDate,
    });
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    setError("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select date range"
      subtitle="Choose a custom period for the dashboard summary."
      maxWidthClassName="max-w-[430px]"
      panelClassName="bg-white"
      bodyClassName="bg-white"
      titleClassName="font-serif text-[24px] leading-none text-[#151210]"
      subtitleClassName="text-[15px] leading-[1.55] text-[#7B7672]"
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldCard id="dashboard-start-date" label="Start Date">
            <input
              id="dashboard-start-date"
              type="date"
              value={draftStartDate}
              onChange={handleChange(setDraftStartDate)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "dashboard-date-range-error" : undefined}
              className="h-7 w-full border-none bg-transparent p-0 text-[15px] text-[#151210] outline-none scheme-light"
            />
          </FieldCard>

          <FieldCard id="dashboard-end-date" label="End Date">
            <input
              id="dashboard-end-date"
              type="date"
              value={draftEndDate}
              onChange={handleChange(setDraftEndDate)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "dashboard-date-range-error" : undefined}
              className="h-7 w-full border-none bg-transparent p-0 text-[15px] text-[#151210] outline-none scheme-light"
            />
          </FieldCard>
        </div>

        {error ? (
          <p id="dashboard-date-range-error" className="text-[13px] text-[#F04444]">
            {error}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12.5 items-center justify-center rounded-lg border border-[#E7E1DE] bg-white px-4 text-[16px] font-medium text-[#151210] transition hover:bg-[#FCFAF9]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex h-12.5 items-center justify-center rounded-lg bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </form>
    </Modal>
  );
}
