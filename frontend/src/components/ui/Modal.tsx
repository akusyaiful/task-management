import { X } from "lucide-react";
import { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-99">
      <div className="bg-white rounded-lg p-4 w-[400px] relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
