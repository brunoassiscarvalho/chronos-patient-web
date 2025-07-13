import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IFormItem } from '../../organisms/form/FormItem';
import { useState } from 'react';

interface IInputAutocomplete extends IFormItem {
  options?: any;
  defaultValue?: any;
}

export default function InputValueAutocomplete({
  options,
  label,
  name,
  defaultValue,
  error,
}: IInputAutocomplete) {
  const defaultValueItem: any = options.find(
    (item: any) => item.key === defaultValue,
  );
  const [value, setValue] = useState<any | undefined>(defaultValueItem);
  const errorMessage = error && error[name];

  return (
    <>
      <Autocomplete
        fullWidth
        defaultValue={defaultValueItem}
        onChange={(_event: any, newValue: any | null) => {
          setValue(newValue);
        }}
        options={options}
        getOptionLabel={(optionItems: any) => optionItems.text}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={errorMessage}
            helperText={errorMessage}
          />
        )}
      />
      <input name={name} value={value?.key} style={{ display: 'none' }} />
    </>
  );
}
