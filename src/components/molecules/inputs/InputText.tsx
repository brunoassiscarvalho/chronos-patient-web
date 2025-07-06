import { IMaskInput } from 'react-imask';
import { FormHelperText, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';
import React from 'react';

interface IInputText extends IFormItem {
  name: string;
  label: string;
  format?: any;
  error?: any;
  autoComplete?: any;
  autoFocus?:any
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  type: string;
}

const patternsMask: any = {
  tel: {
    mask: '(#0) 00000-0000',
    definitions: {
      '#': /[1-9]/,
    },
  },
  cep: {
    mask: '00000-000',
  },
};

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, type, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={patternsMask[type].mask}
        definitions={patternsMask[type].definitions}
        ref={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

export default function InputText({
  validations,
  label,
  error,
  format,
  ...props
}: IInputText) {
  return (
    <FormControl>
      <InputLabel
        required={validations?.required}        
        style={{backgroundColor:'white'}}
        error={error}       
      >
        {label}
      </InputLabel>
      {format && patternsMask[format]? (
        <OutlinedInput
          error={error}
          type={format}
          {...props}
          inputComponent={TextMaskCustom as any}
        />
      ) : (
        <OutlinedInput error={error} {...props} />
      )}
      {error && <FormHelperText error={error}>{error}</FormHelperText>}
    </FormControl>
  );
}
