import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import "./inputDataTime.css";
import { InputLabel } from "@mui/material";

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function DateInput({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <InputLabel shrink>Data de nascimento</InputLabel>
      <input
        type="date"
        id={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
}
