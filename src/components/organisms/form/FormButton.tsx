import { Grid, Button } from '@mui/material';

export function FormButton({ props, handleSubmit }: any) {
  return (
    <Grid item xs={props?.xs || 12} md={props?.md || 12} sm={props?.sm || 12}>
      <Button {...props} handleSubmit={handleSubmit} />
    </Grid>
  );
}