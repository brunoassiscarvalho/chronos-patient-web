// import DateFnsUtils from '@date-io/date-fns';
// import { ptBR } from 'date-fns/locale';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import { Controller } from 'react-hook-form';
// import { IFormItem } from '../../organisms/form/FormItem';
// import { useState, useEffect } from 'react';
// import { FormHelperText } from '@mui/material';

// interface IDatePicker extends IFormItem {
//   label: string;
//   name: string;
//   format: string;
//   views?: any;
//   disableFuture?: boolean;
//   defaultValue?: Date;
//   labelWithFormat?: boolean;
//   onChange?: (data: any) => void;
// }

// export default function InputDatePicker({
//   label,
//   labelWithFormat = true,
//   name,
//   control,
//   inputRef,
//   format,
//   views,
//   disableFuture = false,
//   defaultValue,
//   errors,
//   validations,
//   onChange,
// }: IDatePicker) {
//   const [errorMessage, setErrorMessage] = useState<string>(
//     !!errors && errors[name],
//   );

//   const tratedName = name.split('.')[1] || name;

//   useEffect(() => {
//     if (errors) setErrorMessage(errors[tratedName]?.message);
//   }, [errors]);

//   const handleChange = (date: any, value?: string | null) => {
//     if (onChange) onChange(value);
//   };

//   const labelPlusFormat = `${label}(${format
//     .replaceAll('M', 'm')
//     .replaceAll('y', 'a')})`;

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
//       <Controller
//         name={name}
//         rules={{ required: validations?.required }}
//         control={control}
//         inputRef={inputRef}
//         defaultValue={defaultValue || null}
//         onChange={onChange}
//         render={({ ref, onChange, ...rest }) => (
//           <KeyboardDatePicker
//             onChange={(e, value) => {
//               onChange(e);
//               handleChange(e, value);
//             }}
//             error={!!errorMessage}
//             disableFuture={disableFuture}
//             views={views}
//             label={
//               labelWithFormat
//                 ? `${labelPlusFormat} ${validations?.required ? '*' : ''}`
//                 : `${label} ${validations?.required ? '*' : ''}`
//             }
//             format={format}
//             invalidLabel="Data Inválida"
//             invalidDateMessage="Data Inválida"
//             maxDateMessage="Data maior que o permitido"
//             minDateMessage="Data menor que o permitido"
//             cancelLabel="Cancelar"
//             clearLabel="Limpar"
//             todayLabel="Hoje"
//             KeyboardButtonProps={{
//               'aria-label': 'change date',
//             }}
//             {...rest}
//           />
//         )}
//       />
//       {!!errorMessage && (
//         <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
//       )}
//     </MuiPickersUtilsProvider>
//   );
// }


import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InputDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="month"
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
