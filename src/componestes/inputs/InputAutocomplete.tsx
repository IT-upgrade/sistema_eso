import { useField } from "@unform/core";
import {
  Autocomplete,
  Button,
  Card,
  CardHeader,
  InputLabel,
  StyledEngineProvider,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useEffect, useRef, useState } from "react";
import { options } from "../../utils/types";

type Props = TextFieldProps & {
  name?: string;
  placeholder?: string;
  reqired?: boolean;
  info?: string;
  valueInput?: string;
  tipo?: string;
  options: any;
  inputLabel?: any;
  datafromApi?: string;
};

function InputAutocomplete({
  name,
  tipo,
  info,
  options,
  inputLabel,
  datafromApi,
  ...rest
}: Props) {
  const { fieldName, defaultValue, registerField, error } = useField(
    name as string
  );

  const [Value, setValue] = useState<string | any>(options[0]);
  const [inputValue, setInputValue] = React.useState<string | any>("");

  useEffect(() => {
    registerField({
      name: fieldName,
      // ref: inputRef,
      getValue: () => Value?.label,
      setValue: (_, newValue) => {
        setValue(newValue?.label);
      },
      // clearValue: (ref) => {
      //   ref.current.value = "";
      // },
    });
  }, [fieldName, registerField, Value]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      // "& fieldset": {
      //   borderColor: "rgb(13, 13, 13)",
      // },
      // "&:hover fieldset": {
      //   borderColor: "rgb(13, 13, 13)",
      // },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });

  useEffect(() => {
    if (datafromApi) {
      setValue({ label: datafromApi });
    }
  }, [datafromApi]);

  return (
    <div>
      {/* <span className=" pb-1">Tipo do documento</span> */}
      <InputLabel shrink>{inputLabel}</InputLabel>
      <Autocomplete
        clearOnEscape
        value={Value}
        size="small"
        getOptionLabel={(option) => option.label}
        // id="combo-box-demo"
        id="clear-on-escape"
        inputValue={inputValue}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => (
          <CssTextField
            {...params}
            error={!!error}
            variant="standard"
            size="small"
          />
        )}
      />
      {error && (
        <InputLabel color="error" shrink>
          {error}
        </InputLabel>
      )}
    </div>
  );
}

export default InputAutocomplete;
