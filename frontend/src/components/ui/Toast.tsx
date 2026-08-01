import { useEffect } from "react";
import { useToastStore } from "../../store/toastStore";

function Toast() {
  const { toast, hideToast } = useToastStore();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => clearTimeout(timer);

  }, [toast, hideToast]);


  if (!toast) return null;


  const colors = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-600",
  };


  return (
    <div
      className={`
        fixed
        right-6
        top-6
        z-50
        rounded-xl
        px-5
        py-3
        text-white
        shadow-lg
        ${colors[toast.type]}
      `}
    >
      {toast.message}
    </div>
  );
}

export default Toast;