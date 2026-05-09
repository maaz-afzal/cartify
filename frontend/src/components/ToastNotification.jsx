import { useEffect } from "react";

export default function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-100 flex items-center justify-between w-80 rounded bg-emerald-100 px-4 py-3 text-emerald-700 shadow-lg border border-emerald-200 animate-bounce-short">
      <p>{message}</p>

      <button onClick={onClose} className="ml-3 text-lg font-bold">
        ×
      </button>
    </div>
  );
}
