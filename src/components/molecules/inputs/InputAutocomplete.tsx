
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';

export interface IInputAutocomplete extends IFormItem {
	label: string,
	name: string,
	options: any[]
	onChange?: (data: any) => void;
	value?: any | any[],
	freeSolo?: boolean
}

export default function InputAutocomplete({ errors, onChange, inputRef, control, name, label, validations, options, defaultValue, setValue, freeSolo = false, errorMessage }: IInputAutocomplete) {

  return (
    <Controller
		
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field:{onChange}, ...props }) => (
        <Autocomplete
          {...props}
          freeSolo={freeSolo}
          style={{ width: '100%' }}
          options={options}
          getOptionLabel={option => option?.label ? option.label : option}
          onInputChange={(event, newInputValue) => {
            if (freeSolo) setValue(name, newInputValue);
          }}
          renderInput={params => {
            return <TextField
              {...params}
              id={`autocomplete-text-field-${name}`}
              InputLabelProps={{ required: validations?.required, error: !!errorMessage, id:`autocomplete-input-label-${name}`, }}
              inputProps={{
                ...params.inputProps,
                id:`autocomplete-input-field-${name}`,
                autoComplete: 'new-password',
              }}
              label={label} error={!!errorMessage} helperText={errorMessage} inputRef={inputRef} />;
          }
          }
          onChange={(event: any, data: any) => { setValue(name, data?.value ? data.value : data); onChange(data); }}
          id={`autocomplete-${name}`}
        />
      )
      }
    />
  );
}