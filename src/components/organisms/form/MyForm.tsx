import { Box, Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { Prompt } from 'react-router-dom';
import { GroupFormItems } from './GroupFormItems';

interface IForm {
  children: any;
  onSubmit: SubmitHandler<any>;
  defaultValues?: any;
  isPrompt?: boolean;
  values?: any;
  fieldArrayName?: string;
  onChange?: (data: any) => void;
  name?: string;
  butonAddLabel?: string;
}

export default function SmartForm({
  children,
  onSubmit,
  isPrompt = true,
  values,
  defaultValues,
  onChange,
  butonAddLabel,
}: IForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    formState,
    setValue,
    watch,
  } = useForm<any>({ defaultValues });

  const data = watch();

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  useEffect(() => {
    if (onChange) onChange(data);
  }, [data, onChange]);

  const baseFormParams = {
    handleSubmit,
    control,
    errors,
    register,
    setValue,
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* {isPrompt && (
        <Prompt
          when={formState.isDirty && !formState.isSubmitting}
          message={() =>
            'Deseja mesmo sair da página? Os dados alterados não serão salvos!'
          }
        />
      )} */}
      <Grid container spacing={2}>
        <GroupFormItems
          butonAddLabel={butonAddLabel}
          baseFormParams={baseFormParams}
        >
          {children}
        </GroupFormItems>
      </Grid>
    </Box>
  );
}

