import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { className, children, isLoading, disabled, ...rest } = props;
  const newClassName = isLoading
    ? `${className} cursor-not-allowed opacity-80`
    : `${className} hover:bg-red-600`;
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
