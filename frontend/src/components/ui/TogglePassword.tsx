import { Eye, EyeOff } from "lucide-react";

interface TogglePasswordProps {
  show: boolean;
  onClick: () => void;
}

export default function TogglePassword({ show, onClick }: TogglePasswordProps) {
  return (
    <button type="button" onClick={onClick}>
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
