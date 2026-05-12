import { useEffect } from "react";

export default function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center justify-between w-80 rounded-lg bg-emerald-100 dark:bg-emerald-900 px-4 py-3 text-emerald-700 dark:text-emerald-200 shadow-lg border border-emerald-200 dark:border-emerald-800 animate-bounce-short">
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-3 text-lg font-bold hover:text-emerald-900 dark:hover:text-emerald-100 transition"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
