import * as React from "react";
import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { useField } from "@unform/core";
import { string } from "yup";
import { OutlinedInput } from "@mui/material";

import { useEffect, useState } from "react";

interface InputNumberProps {
  name: string;
  tipo?: string;
  dataCep?: string;
  datafromApi?: string;
}

export default function InputString({
  name,
  tipo,
  dataCep,
  datafromApi,
}: InputNumberProps) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [values, setValues] = React.useState(defaultValue || "");

  const [valuesApiCeporBack, setvaluesApiCeporBack] = React.useState(
    defaultValue || ""
  );

  React.useEffect(() => {
    registerField({
      name: fieldName,
      // ref: inputRef,
      getValue: () => values,
      setValue: (_, newValue) => {
        setValues(newValue);
      },
      // clearValue: (ref) => {
      //   ref.current.value = "";
      // },
    });
  }, [fieldName, registerField, values]);

  useEffect(() => {
    if (dataCep) {
      setvaluesApiCeporBack(dataCep);
      setValues(dataCep);
    }
  }, [dataCep]);

  useEffect(() => {
    if (datafromApi) {
      setValues(datafromApi);
    }
  }, [datafromApi]);

  return (
    <div>
      <div>
        <InputLabel shrink>
          <h4>{tipo}</h4>
        </InputLabel>
        <Input
          defaultValue={defaultValue}
          style={{ width: "100%" }}
          value={values ? values : valuesApiCeporBack}
          size="small"
          error={!!error}
          onChange={(e) => setValues(e.target.value)}
        />
      </div>
      {error && (
        <InputLabel color="error" shrink>
          {error}
        </InputLabel>
      )}
    </div>
  );
}
