import React, { ButtonHTMLAttributes, ReactNode } from "react";

import { Container } from "./styles";
interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button" | undefined;
}
interface PropBtn {
  typeBtn?: ButtonType;
  typeStyle: string;
  children?: ReactNode;
  handle?: any;
}

const Button: React.FC<PropBtn> = ({
  children,
  handle,
  typeBtn,
  typeStyle,
}: PropBtn) => {
  return (
    <Container type={typeBtn?.type} typeButton={typeStyle} onClick={handle}>
      {children}
    </Container>
  );
};

export default Button;
