import {
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputRadio extends IFormItem {
  label: string;
  name: string;
  children?: any;
  list?: IInputRadioItem[];
}

interface IInputRadioItem {
  value: number | string | boolean;
  label: number | string;
}

export default function InputRadio({
  label,
  name,
  control,
  children,
  list,
  validations,
  inputRef,
  defaultValue,
  errorMessage,
}: IInputRadio) {
  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        {validations?.required ? label : label + ' *'}
      </Typography>
      <Controller
        rules={{ required: validations?.required }}
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <RadioGroup name={name}>
            {children ? (
              <>{children}</>
            ) : (
              !!list &&
              list.map((item: IInputRadioItem, index: number) => (
                <FormControlLabel
                  inputRef={ref}
                  key={`${index}-${item.value}`}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))
            )}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
