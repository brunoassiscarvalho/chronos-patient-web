
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';

export interface IInputAutocompleteMultiple extends IFormItem {
	label: string,
	name: string,
	options: any[]
	onChange?: (data: any) => void;
	value?: any | any[],
	freeSolo?: boolean
}

export default function InputAutocompleteMultiple({ errors, onChange, inputRef, control, name, label, validations, options, defaultValue, setValue, freeSolo = false, errorMessage }: IInputAutocompleteMultiple) {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field:{onChange}, ...props }) => (
        <Autocomplete
          {...props}
          freeSolo={freeSolo}
          multiple
          style={{ width: '100%' }}
          options={options}
          getOptionLabel={option => option?.label ? option.label : option}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{ required: validations?.required, error: !!errorMessage }}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }} 
              label={label} error={!!errorMessage} name={name} helperText={errorMessage} inputRef={inputRef} />
          )}
          onChange={(_, data: any) => { setValue(name, data.value ? data.value : data); onChange(data); }}
        />
      )
      }
    />
  );
}