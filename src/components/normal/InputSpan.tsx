import React from "react";

interface InputSpanProps {
    message: string;
}

export const InputSpan: React.FC<InputSpanProps> = ({message}) => {
    return <p className="text-black font-bold text-base md:text-lg" > {message}</p>;
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
            className="bg-inputGray  rounded px-2 py-1 text-base w-full mt-2 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange50"
        />
    );
};

export const TextareaField: React.FC<InputFieldProps> = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-inputGray  rounded px-2 py-1 text-base w-full mt-2 focus:outline-none focus:border-orange  focus:ring-2 focus:ring-orange50"
            style={{ resize: "none" }} 
        />
    );
};



