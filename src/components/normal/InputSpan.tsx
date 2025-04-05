import React from "react";

interface InputSpanProps {
  message: string;
}

export const InputSpan: React.FC<InputSpanProps> = ({ message }) => {
  return (
    <p className="text-base font-bold text-black md:text-lg"> {message}</p>
  );
};

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded bg-inputGray px-2 py-1 text-base focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange50"
    />
  );
};

export const TextareaField: React.FC<InputFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded bg-inputGray px-2 py-1 text-base focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange50"
      style={{ resize: "none" }}
    />
  );
};
