import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  required?: boolean;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  children,
  required,
}: InputProps) {
  return (
    <div className="flex items-center p-2 mb-3 border rounded-lg">
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 outline-none"
        value={value}
        onChange={onChange}
        required={required}
      />
      {children}
    </div>
  );
}
