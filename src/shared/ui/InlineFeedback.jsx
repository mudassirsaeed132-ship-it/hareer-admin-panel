export default function InlineFeedback({ type = "success", message, onClose }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      role="status"
      className={`flex items-center justify-between gap-3 border px-4 py-3 text-[14px] ${
        isError
          ? "border-[#F04444]/30 bg-[#FFF5F5] text-[#F04444]"
          : "border-[#22A447]/25 bg-[#F3FBF5] text-[#16833A]"
      }`}
    >
      <span>{message}</span>

      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-[13px] font-medium underline"
        >
          Close
        </button>
      ) : null}
    </div>
  );
}