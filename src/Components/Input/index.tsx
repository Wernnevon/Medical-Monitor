import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

import { Container, Placeholder } from "./styles";
import formatValue from "../../Utils/masks";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number | Date;
  title?: string;
}

const Input = ({
  name,
  placeholder,
  type,
  value,
  title,
  ...rest
}: InputProps) => {
  const ref = useRef<any>(null);

  const {
    fieldName,
    defaultValue = value,
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

  const handleMask = () => {
    const keyIndex = Object.keys(formatValue).indexOf(name.toUpperCase());
    if (keyIndex !== -1) {
      const formated = Object.values(formatValue)[keyIndex](ref.current.value);
      ref.current.value = formated;
    }
  };

  return (
    <Container title={title}>
      <Placeholder>{placeholder}</Placeholder>
      <input
        onChange={handleMask}
        {...rest}
        defaultValue={defaultValue}
        ref={ref}
        type={type}
      />
      <span>{error}</span>
    </Container>
  );
};
export default Input;
