import React, { ButtonHTMLAttributes, ReactNode } from "react";

import { Container } from "./styles";
interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button" | undefined;
}
interface PropBtn {
  typeBtn?: ButtonType;
  typeStyle: string;
  children?: ReactNode;
  handle?(): any;
  disabled?: boolean;
}

const Button: React.FC<PropBtn> = ({
  children,
  handle,
  typeBtn,
  typeStyle,
  disabled,
}: PropBtn) => {
  function handleClick() {
    if (handle && !disabled) handle();
  }

  return (
    <Container
      disabled={disabled}
      type={typeBtn?.type}
      typeButton={typeStyle}
      onClick={handleClick}
    >
      {children}
    </Container>
  );
};

export default Button;
