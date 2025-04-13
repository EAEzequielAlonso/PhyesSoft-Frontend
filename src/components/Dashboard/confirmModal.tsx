"use client"

interface ConfirmModalProps {
  show: boolean;
  label: string;
  message: string;
  labelConfirm?: string;
  labelCancel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  show,
  label,
  message,
  labelConfirm = "Confirmar",
  labelCancel = "Cancelar",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
        <h2 className="text-lg font-semibold mb-4 text-center">{label}</h2>
        <p className="text-sm text-gray-700 mb-6 text-center">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md transition-transform hover:scale-105 active:scale-95 hover:bg-gray-100"
          >
            {labelCancel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md transition-transform hover:scale-105 active:scale-95 hover:bg-red-600"
          >
            {labelConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
