import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Modal from "../../../shared/ui/Modal";
import { PAYMENT_TERMS_OPTIONS } from "../constants/vendors.constants";

function FieldCard({ label, children }) {
  return (
    <div className="rounded-[10px] bg-[#FAF8F7] p-2.5 sm:p-3">
      <label className="block text-[11px] leading-none text-[#7E7671] sm:text-[12px]">
        {label}
      </label>

      <div className="mt-2 min-w-0">
        {children}
      </div>
    </div>
  );
}

export default function AssignDeliveryAgentModal({
  open,
  onClose,
  request,
  onSubmit,
  submitting = false,
}) {
  const [deliveryAgent, setDeliveryAgent] = useState("");
  const [autoSelect, setAutoSelect] = useState(true);
  const [serviceFee, setServiceFee] = useState("50");
  const [paymentTerms, setPaymentTerms] = useState("Paid by Vendor");
  const [notes, setNotes] = useState("Lorem ipsum dolor aist");

  useEffect(() => {
    if (!open || !request) return;

    setDeliveryAgent("");
    setAutoSelect(true);
    setServiceFee(String(request.serviceFee ?? 50));
    setPaymentTerms(request.paymentTerms ?? "Paid by Vendor");
    setNotes(request.notes ?? "Lorem ipsum dolor aist");
  }, [open, request]);

  const ridersNeeded = Number(request?.ridersNeeded ?? 0);

  const totalCost = useMemo(() => {
    return ridersNeeded * Number(serviceFee || 0);
  }, [ridersNeeded, serviceFee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit?.({
      deliveryAgent: autoSelect ? "" : deliveryAgent,
      autoSelect,
      serviceFee: Number(serviceFee),
      paymentTerms,
      notes,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Assign Delivery Agent"
      description="Assign riders and define the delivery cost for the vendor."
      contentClassName="sm:max-w-[380px]"
      bodyClassName="space-y-2.5"
      showClose
    >
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <FieldCard label="Delivery Agents">
          <div className="flex min-w-0 items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              value={deliveryAgent}
              onChange={(event) => setDeliveryAgent(event.target.value)}
              disabled={autoSelect}
              className="min-w-0 flex-1 border-none bg-transparent p-0 text-[14px] text-[#151210] outline-none placeholder:text-[#6F6965] disabled:opacity-60 sm:text-[15px]"
            />

            <Search
              className="h-4 w-4 shrink-0 text-[#151210]"
              strokeWidth={1.8}
            />
          </div>
        </FieldCard>

        <label className="flex items-center gap-3 rounded-[10px] bg-[#FAF8F7] px-2.5 py-3 sm:px-3">
          <input
            type="checkbox"
            checked={autoSelect}
            onChange={(event) => setAutoSelect(event.target.checked)}
            className="h-4 w-4 shrink-0 accent-[#E4B2B2]"
          />

          <span className="min-w-0 text-[14px] text-[#151210] sm:text-[15px]">
            Auto Select
          </span>
        </label>

        <FieldCard label="Service Fee (Per Agent)">
          <input
            type="number"
            value={serviceFee}
            onChange={(event) => setServiceFee(event.target.value)}
            className="w-full min-w-0 border-none bg-transparent p-0 text-[14px] text-[#151210] outline-none sm:text-[15px]"
          />
        </FieldCard>

        <FieldCard label="Payment Terms">
          <div className="relative min-w-0">
            <select
              value={paymentTerms}
              onChange={(event) => setPaymentTerms(event.target.value)}
              className="w-full min-w-0 appearance-none border-none bg-transparent p-0 pr-7 text-[14px] text-[#151210] outline-none sm:text-[15px]"
            >
              {PAYMENT_TERMS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151210]"
              strokeWidth={1.8}
            />
          </div>
        </FieldCard>

        <FieldCard label="Additional Notes (Optional)">
          <textarea
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full min-w-0 resize-none border-none bg-transparent p-0 text-[14px] text-[#151210] outline-none sm:text-[15px]"
          />
        </FieldCard>

        <div className="border-t border-[#E7E1DE] pt-3">
          <div className="flex items-center justify-between gap-4 py-1 text-[14px] text-[#6F6965] sm:text-[15px]">
            <span>Delivery Riders</span>
            <span className="font-medium text-[#151210]">
              {ridersNeeded}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-1 text-[14px] text-[#6F6965] sm:text-[15px]">
            <span>Total Cost</span>
            <span className="font-medium text-[#151210]">
              {totalCost} LYD
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1 min-[420px]:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[42px] w-full items-center justify-center rounded-[10px] border border-[#E7E1DE] bg-white px-3 text-[14px] font-medium text-[#151210] transition hover:bg-[#F8F5F3] sm:text-[15px]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-[42px] w-full items-center justify-center rounded-[10px] bg-[#E4B2B2] px-3 text-[14px] font-medium text-[#151210] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:text-[15px]"
          >
            {submitting ? "Saving..." : "Assign"}
          </button>
        </div>
      </form>
    </Modal>
  );
}