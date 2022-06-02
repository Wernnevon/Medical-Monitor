import { useField } from "@unform/core";
import React, { useEffect, useRef, useState } from "react";

import { Container, Placeholder } from "./styles";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
}

const Input = ({ name, placeholder, type }: InputProps) => {
  const ref = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: ref.current, path: "value" });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Placeholder>{placeholder}</Placeholder>
      <input defaultValue={defaultValue} ref={ref}type={type} />
      <span>{error}</span>
    </Container>
  );
};
export default Input;
