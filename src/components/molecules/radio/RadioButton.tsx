import { ChangeEvent, useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from '@mui/material';

interface IRadioButton extends IFormItem {
  defaultValue?: number | string;
  label: string;
  name: string;
  error?: any;
  options: IOptionRadio[];
}

interface IOptionRadio {
  text: string;
  description?: string;
  value: number | string;
}

export default function RadioButton({
  options,
  defaultValue,
  label,
  name,
  error,
}: IRadioButton): JSX.Element {
  const errorMessage = error && error[name];
  const [valueItem, setValueItem] = useState(defaultValue);
  const handleChange = (event: any) => {
    setValueItem((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <FormControl error={errorMessage}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup defaultValue={defaultValue} name={name} value={valueItem}>
          {options.map(({ text, description, value }: IOptionRadio) => (
            <FormControlLabel
              key={value}
              value={value}
              onChange={handleChange}
              control={<Radio />}
              label={text}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
      <input name={name} value={valueItem} style={{ display: 'none' }} />
    </>
  );
}
