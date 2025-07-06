import { Input, FormHelperText, FormControl, InputLabel } from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputText extends IFormItem {
  name: string,
  label: string,
  format?: any,
  onBlur?: any,
  id?: string,
  style?: any,
  shrink?: boolean
  rows?: number
}

export default function InputTextArea({ errors, name, style, shrink, label, onBlur, format, type, id, defaultValue, validations, inputRef, rows = 2, errorMessage }: IInputText) {

  return (

    <FormControl style={{ ...style, width: "100%" }}>
      <InputLabel required={validations?.required} shrink={shrink} error={!!errorMessage} htmlFor="formatted-text-mask-input">{label}</InputLabel>
      <Input
        onBlur={onBlur}
        error={!!errorMessage}
        name={name}
        multiline
        rows={rows}
        inputRef={inputRef}
        defaultValue={defaultValue}
        type={format || type}
        id={id || name}

      />
      {!!errorMessage && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

