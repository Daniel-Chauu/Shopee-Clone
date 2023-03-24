import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  hover?: string;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    isLoading,
    disabled,
    hover = "hover:bg-red-600",
    ...rest
  } = props;
  const newClassName = isLoading
    ? `${className} cursor-not-allowed opacity-80`
    : `${className} ${hover}`;
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
