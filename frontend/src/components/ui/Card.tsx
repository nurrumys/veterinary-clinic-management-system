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
        p-6
        shadow-sm
        transition-shadow
        duration-200
        hover:shadow-md
        ${className}
      `}
    >
      {title && (
        <h2
          className="
            mb-5
            text-xl
            font-semibold
            tracking-tight
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