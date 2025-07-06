import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputSelect extends IFormItem {
  onChange?: (data: any) => void;
  name: string;
  label: string;
  list: any[];
}

export default function InputSelect({
  control,
  inputRef,
  onChange,
  errors,
  name,
  label,
  list,
  validations,
  errorMessage,
}: IInputSelect) {
  const handleChangeState = (event: SelectChangeEvent<any>)  => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl error={!!errorMessage}>
      <InputLabel required={validations?.required} error={!!errorMessage}>
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        rules={{ required: validations?.required }}
        // 
        // errors={errors}
        render={({ 
          field:{onChange, ref,  value, name },
          fieldState: { error },
        }) => (
          <Select
            fullWidth
            value={value ? value.value || value : ''}
            name={name}
            inputRef={ref}
            onChange={(e) => {
              onChange(e);
              handleChangeState(e); 
            }}
          >
            {list.map((item) => (
              <MenuItem key={item.value} value={item.value || item}>
                {item.label || item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {!!errorMessage && (
        <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}
