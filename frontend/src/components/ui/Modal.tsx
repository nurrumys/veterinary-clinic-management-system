import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  maxWidth?: ModalSize;
};

function Modal({
  open,
  title,
  children,
  onClose,
  footer,
  maxWidth = "md",
}: ModalProps) {
  if (!open) {
    return null;
  }

  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
    "2xl": "max-w-6xl",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className={`
          flex
          w-full
          ${widthClasses[maxWidth]}
          max-h-[90vh]
          flex-col
          rounded-2xl
          bg-white
          shadow-2xl
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-5
          "
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="
              flex
              shrink-0
              justify-end
              gap-3
              border-t
              border-slate-200
              px-6
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;