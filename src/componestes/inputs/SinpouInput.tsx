import { FormControl, InputLabel, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";

interface SinpouInputProps {
  name: string;
  tipo: string;
}

function SinpouInput({ name, tipo }: SinpouInputProps) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [Value, setValue] = useState(defaultValue || "");
  const [inputValue, setInputValue] = useState("");

  const CssTextField = styled(TextField)({
    // '& label.Mui-focused': {
    //   color: 'green',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: 'green',
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });

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

  console.log(Value);
  return (
    <div>
      <InputLabel shrink>{tipo}</InputLabel>
      <TextField
        id="validation-outlined-input"
        size="small"
        variant="outlined"
        value={Value}
        fullWidth
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SinpouInput;
