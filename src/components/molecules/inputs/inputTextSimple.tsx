import { TextField } from '@mui/material';
import { memo } from 'react';

export default memo(function InputTextSimple({ validations, ...props }: any) { 
  return (
    <TextField
      {...props}
      InputLabelProps={{ required: validations?.required }}
    ></TextField>
  );
});
