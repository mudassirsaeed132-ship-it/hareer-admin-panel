import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

const SIZE_MAP = {
  xs: "sm:max-w-[380px]",
  sm: "sm:max-w-[420px]",
  md: "sm:max-w-[500px]",
  lg: "sm:max-w-[620px]",
  xl: "sm:max-w-[760px]",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  subtitle,
  children,
  size = "sm",
  showClose = true,
  showCloseButton,
  titleClassName = "font-serif text-[22px] leading-tight text-[#151210] sm:text-[24px]",
  descriptionClassName = "mt-2 text-[13px] leading-5 text-[#7B7672] sm:text-[14px] sm:leading-6",
  subtitleClassName,
  contentClassName = "",
  panelClassName = "",
  maxWidthClassName = "",
  bodyClassName = "",
  closeOnOverlayClick = true,
}) {
  const MotionDiv = motion.div;
  const resolvedDescription = description ?? subtitle;
  const resolvedShowClose =
    typeof showCloseButton === "boolean" ? showCloseButton : showClose;
  const resolvedDescriptionClassName =
    subtitleClassName || descriptionClassName;

  const resolvedContentClassName = [
    SIZE_MAP[size] || SIZE_MAP.sm,
    maxWidthClassName,
    panelClassName,
    contentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[rgba(21,18,16,0.28)] px-3 py-3 sm:px-4 sm:py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnOverlayClick ? onClose : undefined}
        >
          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-label={title || "Modal"}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className={[
              "relative flex w-full flex-col rounded-[14px] bg-white shadow-[0_18px_48px_rgba(15,12,10,0.12)]",
              "max-h-[calc(100dvh-24px)] overflow-hidden sm:max-h-[calc(100dvh-40px)]",
              resolvedContentClassName,
            ].join(" ")}
          >
            {(title || resolvedDescription || resolvedShowClose) && (
              <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-2 pt-4 sm:px-5 sm:pt-5">
                <div className="min-w-0">
                  {title ? (
                    <h2 className={titleClassName}>{title}</h2>
                  ) : null}

                  {resolvedDescription ? (
                    <p className={resolvedDescriptionClassName}>
                      {resolvedDescription}
                    </p>
                  ) : null}
                </div>

                {resolvedShowClose ? (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E9DFDA] text-[#151210] transition hover:bg-[#FAF7F5] focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </div>
            )}

            <div
              className={[
                "min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-2 sm:px-5 sm:pb-5",
                bodyClassName,
              ].join(" ")}
            >
              {children}
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}