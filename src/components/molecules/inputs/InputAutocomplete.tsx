import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputAutocomplete extends IFormItem {
  options?: any;
  defaultValue?: string;
  freeSolo?: boolean;
}

export default function InputAutocomplete({
  options,
  label,
  name,
  defaultValue,
  freeSolo,
  error,
}: IInputAutocomplete) {
  const errorMessage = error && error[name];
  return (
    <Autocomplete
      freeSolo={freeSolo}
      fullWidth
      defaultValue={defaultValue}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          error={errorMessage}
          helperText={errorMessage}
        />
      )}
    />
  );
}
