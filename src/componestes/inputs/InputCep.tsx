import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import UseTextMaskInput from "../../hooks/UseTextMaskInput";

interface InputCepProps {
  name: string;
  tipo: string;
  setStateCep: (type: any) => any;
  datafromApi?: string;
}

function InputCep({ name, tipo, setStateCep, datafromApi }: InputCepProps) {
  const { TextMaskCustomCep } = UseTextMaskInput();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [Value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      // ref: inputRef,
      getValue: () => Value,
      setValue: (_, newValue) => {
        setValue(newValue);
      },
      clearValue: (ref) => {
        setValue("");
      },
    });
  }, [fieldName, registerField, Value]);

  function chekCep(e: any) {
    setValue(e.target.value);
    const cep = e.target.value.replace(/\D/g, "");

    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
       

        setStateCep(data);
      });
  }

  useEffect(() => {
    if (datafromApi) {
      setValue(datafromApi);
    }
  }, [datafromApi]);
  return (
    <div>
      <InputLabel shrink>{tipo}</InputLabel>

      <Input
        // inputMode="numeric"
        style={{ width: "100%" }}
        value={Value}
        error={!!error}
        //   onChange={handleChange}
        name="textmask"
        size="small"
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustomCep as any}
        placeholder={" _____-___"}
        onBlur={chekCep}
      />

      {error && (
        <InputLabel color="error" shrink>
          {error}
        </InputLabel>
      )}

      {/* {error && <span className=" text-sm text-[red]" color="danger">{error}</span>} */}
    </div>
  );
}

export default InputCep;
