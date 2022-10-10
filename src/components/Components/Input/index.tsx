import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";
import formatValue from "../Utils/masks";

import { Container, Placeholder } from "./styles";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number | Date;
}

const Input = ({ name, placeholder, type, value }: InputProps) => {
  const ref = useRef(null);
  function format() {
    if (name === "rg" || name === "cpf" || name === "phone") {
      if (typeof value === "string") {
        return formatValue(name, value);
      }
    }
    return value;
  }
  const {
    fieldName,
    defaultValue = format(),
    error,
    registerField,
  } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Placeholder>{placeholder}</Placeholder>
      <input defaultValue={defaultValue} ref={ref} type={type} />
      <span>{error}</span>
    </Container>
  );
};
export default Input;
