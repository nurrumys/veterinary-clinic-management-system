import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        ${className}
      `}
    >

      {title && (
        <h2
          className="
            mb-4
            text-xl
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h2>
      )}

      {children}

    </div>
  );
}

export default Card;