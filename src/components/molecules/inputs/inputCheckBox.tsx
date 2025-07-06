import { FormControlLabel, Checkbox } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputCheckBox extends IFormItem {
  name: string;
  label: string;
  inputRef?: any;
  onChange?: (data: any) => void;
  defaultValue: boolean;
}

export default function InputCheckBox({
  name,
  label,
  onChange,
  inputRef,
  defaultValue,
}: IInputCheckBox) {
  const [value, setValue] = useState<boolean>(defaultValue);

  function handleChangeChecked(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.checked);
    if (onChange) onChange(event.target.checked);
  }

  return (
    <FormControlLabel
      name={name}
      label={label}
      inputRef={inputRef}
      control={
        <Checkbox
          checked={value}
          onChange={handleChangeChecked}
          color="primary"
        />
      }
    />
  );
}
