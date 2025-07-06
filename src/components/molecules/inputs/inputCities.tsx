import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ExternalService from '../../../utils/ExternalServices';
import { IFormItem } from '../../organisms/form/FormItem';

export interface IInputCities extends IFormItem {
  label: string;
  name: string;
  state: string;
}

export default function InputCities({
  state,
  errors,
  inputRef,
  control,
  name,
  label,
  validations,
  errorMessage,
}: IInputCities) {
  const externalService = new ExternalService();

  const [cities, setCities] = useState(['']);

  useEffect(() => {
    getCities(state);
  }, [state]);

  const getCities = (state: string, callBack?:()=>void) => {
    externalService.getCities(state).then((res:any) => {
      const citiesNames = res.map((city: any) => city.nome);
      setCities(citiesNames);
      if (callBack) callBack();
    });
  };

  return (
    <Controller
      render={({ field:{onChange}, ...props }) => (
        <Autocomplete
          style={{ width: '100%' }}
          options={cities}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                required: validations?.required,
                error: !!errorMessage,
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
              label={label}
              name={name}
              error={!!errorMessage}
              helperText={errorMessage}
              inputRef={inputRef}
            />
          )}
          onChange={(_, data) => {
            onChange(data);
          }}
          {...props}
        />
      )}
      name={name}
      control={control}
      // onChange={([, data]: any): any => data}
    />
  );
}
