import React from "react";

interface InputSpanProps {
    text: string;
}

export const InputSpan: React.FC<InputSpanProps> = ({text}) => {
    return <p className="text-black font-bold text-base" > {text}입니다람쥐</p>;
};
