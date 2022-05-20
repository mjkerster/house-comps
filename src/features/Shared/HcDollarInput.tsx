import * as React from 'react';
import NumberFormat from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface CustomProps {
  onChange: (event: {
    target: { name: string; value: string; format: string };
  }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<any>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
              format: values.formattedValue,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  },
);

export default function HcDollarInput(
  props: Omit<TextFieldProps, 'InputProps'>,
) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
    />
  );
}
