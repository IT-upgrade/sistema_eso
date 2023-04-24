import * as React from "react";
import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { CustomProps, State, pessoasLintResponsApi } from "../../utils/types";
import { useField } from "@unform/core";
import { string } from "yup";
import { OutlinedInput } from "@mui/material";
import UseTextMaskInput from "../../hooks/UseTextMaskInput";
import { useEffect, useState } from "react";

interface InputNumberProps {
  name: string;
  tipo?: string;
  place_holder?: string;
  datafromApi?: string;
}

export default function InputNumber({
  name,
  tipo,
  datafromApi,
}: InputNumberProps) {
  const {
    TextMaskCustomcpf,
    TextMaskCustomRG,
    TextMaskCustomTel,
    TextMaskCustomCep,
    TextMaskCustomcnpj,
  } = UseTextMaskInput();

  const [first, setfirst] = useState<any>({
    textMask: TextMaskCustomcpf,
    place: "",
  });

  useEffect(() => {
    switch (tipo) {
      case "CPF":
        setfirst({
          textMask: TextMaskCustomcpf,
          place: " ___.___.___-__",
        });
        break;
      case "RG":
        setfirst({
          textMask: TextMaskCustomRG,
          place: " ______________",
        });
        break;
      case "Telefone":
        setfirst({
          textMask: TextMaskCustomTel,
          place: " (__) ____-____",
        });
        break;
      case "Telefone secundário":
        setfirst({
          textMask: TextMaskCustomTel,
          place: " (__) ____-____",
        });
        break;
      case "CNPJ":
        setfirst({
          textMask: TextMaskCustomcnpj,
          place: " __.___.___/____-__",
        });
        break;

      default:
        break;
    }
  }, [tipo]);

  const [values, setValues] = React.useState<any>({
    textmask: "",
    // numberformat: "1320",
  });
  const [valuesString, setValuesString] = React.useState<any>();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (datafromApi) {
      setValues({
        textmask: datafromApi,
      });
    }
  }, [datafromApi]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      // ref: inputRef,
      getValue: () => values.textmask,
      setValue: (_, newValue) => {
        setValues(newValue?.textmask);
      },
      // clearValue: (ref) => {
      //   ref.current.value = "";
      // },
    });
  }, [fieldName, registerField, values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <InputLabel shrink>{tipo}</InputLabel>
        <Input
          // inputMode="numeric"
          style={{ width: "100%" }}
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          size="small"
          error={!!error}
          id="formatted-text-mask-input"
          inputComponent={first.textMask as any}
          placeholder={first.place}
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
