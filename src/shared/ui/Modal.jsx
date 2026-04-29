import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

const SIZE_MAP = {
  xs: "max-w-[380px]",
  sm: "max-w-[420px]",
  md: "max-w-[500px]",
  lg: "max-w-[620px]",
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
  titleClassName = "font-serif text-[24px] leading-none text-[#151210]",
  descriptionClassName = "mt-2 text-[14px] leading-6 text-[#7B7672]",
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

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(21,18,16,0.28)] px-3 py-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnOverlayClick ? onClose : undefined}
        >
          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className={[
              "relative w-full rounded-[14px] bg-white shadow-[0_18px_48px_rgba(15,12,10,0.12)]",
              "max-h-[88vh] overflow-hidden",
              resolvedContentClassName,
            ].join(" ")}
          >
            {(title || resolvedDescription || resolvedShowClose) && (
              <div className="flex items-start justify-between gap-3 px-4 pb-0 pt-4">
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
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E9DFDA] text-[#151210] transition hover:bg-[#FAF7F5]"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </div>
            )}

            <div
              className={[
                "overflow-y-auto px-4 pb-4 pt-3",
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
