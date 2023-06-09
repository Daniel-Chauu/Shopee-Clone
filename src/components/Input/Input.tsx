import React, { InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

const Input = ({
  type,
  errorMessage,
  name,
  placeholder,
  classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
  classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  register,
}: InputProps) => {
  const registerResult = register && name ? register(name) : {};
  return (
    <>
      <div className="mt-3">
        <label htmlFor="">{placeholder}</label>
        <input
          type={type}
          className={classNameInput}
          placeholder={placeholder}
          {...registerResult}
        />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    </>
  );
};

export default Input;
