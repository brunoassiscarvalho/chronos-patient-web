import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputDateTime extends IFormItem {
  defaultDate?: Date;
}

export default function InputDateTime({
  defaultDate,
  label,
  name,
  error,
}: IInputDateTime) {
  const [value, setValue] = useState<Date | null>(
    defaultDate ? new Date(defaultDate) : null,
  );
  const errorMessage = error && error[name];
  return (
    <>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            {...props}
            error={errorMessage}
            helperText={errorMessage}
          />
        )}
        label={label}
        value={value}
        onChange={(newValue: Date | null) => {
          if (newValue) setValue(newValue);
        }}
      />
      <input
        name={name}
        value={value?.toUTCString()}
        style={{ display: 'none' }}
      />
    </>
  );
}
