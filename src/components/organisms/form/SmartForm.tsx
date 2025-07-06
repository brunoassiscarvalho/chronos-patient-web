import { FormControl, Stack } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {AnyObjectSchema} from 'yup';


interface ISmartForm {
  defaultValues?: any;
  children: JSX.Element[] | JSX.Element;
  resolver?: AnyObjectSchema;
  onSubmit: (data: string) => void;
}

export default function SmartForm({
  defaultValues,
  children,
  resolver,
  onSubmit,
}: ISmartForm) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    ...(resolver && {resolver: yupResolver(resolver)}),
    criteriaMode: 'all',
  });
  console.log({ errors });
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {React.Children.map(children, (child) => {
          return child.props.name ? (
            <Controller
              render={({ field, fieldState }) => (
                <FormControl>
                  {React.createElement(child.type, {
                    ...field,
                    ...fieldState,
                    ...child.props,
                    error: fieldState?.error?.message,
                  })}
                </FormControl>
              )}
              name={child.props.name}
              control={control}
              rules={child.props.validations}
              defaultValue={
                defaultValues ? defaultValues[child.props.name] : undefined
              }
            />
          ) : (
            child
          );
        })}
      </Stack>
    </form>
  );
}
