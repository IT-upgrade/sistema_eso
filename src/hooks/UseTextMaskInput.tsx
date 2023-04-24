import { forwardRef } from "react";
import { CustomProps } from "../utils/types";
import { IMaskInput } from "react-imask";

function UseTextMaskInput() {

  const TextMaskCustomcpf = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="000.000.000-00"
          definitions={{
            "#": /[1-9]/,
          }}
          // inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  const TextMaskCustomRG = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="00000000000000"
          definitions={{
            "#": /[1-9]/,
          }}
          // inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  const TextMaskCustomTel = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="(00)00000-0000"
          definitions={{
            "#": /[1-9]/,
          }}
          // inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );
  const TextMaskCustomCep = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="00000-000"
          definitions={{
            "#": /[1-9]/,
          }}
          // inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  const TextMaskCustomcnpj = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="00.000.000/0000-00"
          definitions={{
            "#": /[1-9]/,
          }}
          // inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  return {
    TextMaskCustomcpf,
    TextMaskCustomRG,
    TextMaskCustomTel,
    TextMaskCustomCep,
    TextMaskCustomcnpj
  };
}

export default UseTextMaskInput;
