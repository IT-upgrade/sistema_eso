import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import "./inputDataTime.css";
import { InputLabel } from "@mui/material";

interface Props {
  name: string;
  label?: string;
  datafromApi?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function DateInput({
  name,
  label,
  datafromApi,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

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
        defaultValue={datafromApi ? datafromApi : defaultValue}
        {...rest}
      />
      {error && (
        <InputLabel color="error" shrink>
          {error}
        </InputLabel>
      )}
    </div>
  );
}
