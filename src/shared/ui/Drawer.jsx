import { useEffect } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { X } from "lucide-react";

const DEFAULT_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

export default function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  widthClassName = "sm:max-w-[430px] lg:max-w-[450px]",
  titleClassName = "font-serif text-[24px] leading-none text-[#151210]",
  bodyClassName = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeButtonLabel = "Close drawer",
  overlayClassName = "bg-black/20",
  contentClassName = "bg-white",
  transition = DEFAULT_TRANSITION,
}) {
  const MotionButton = m.button;
  const MotionAside = m.aside;

  useEffect(() => {
    if (!open || !closeOnEscape) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <>
            <MotionButton
              type="button"
              aria-label="Close overlay"
              onClick={closeOnOverlayClick ? onClose : undefined}
              className={`fixed inset-0 z-40 ${overlayClassName}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            />

            <MotionAside
              role="dialog"
              aria-modal="true"
              aria-label={typeof title === "string" ? title : "Drawer"}
              className={`fixed right-0 top-0 z-50 h-screen w-full overflow-y-auto shadow-[0_12px_48px_rgba(22,18,16,0.12)] ${widthClassName} ${contentClassName}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={transition}
            >
              <div className={`min-h-full p-4 sm:p-5 ${bodyClassName}`}>
                {(title || showCloseButton) && (
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {typeof title === "string" ? (
                        <h2 className={titleClassName}>{title}</h2>
                      ) : (
                        title
                      )}
                    </div>

                    {showCloseButton ? (
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label={closeButtonLabel}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E7E1DE] text-[16px] text-[#151210] transition hover:bg-[#F8F5F3]"
                      >
                        <X className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    ) : null}
                  </div>
                )}

                <div className="mt-5 space-y-3">{children}</div>

                {footer ? <div className="mt-4">{footer}</div> : null}
              </div>
            </MotionAside>
          </>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
