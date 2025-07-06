import { Button, Divider, Grid } from '@mui/material';
import { Children } from 'react';
import InputFile from '../../molecules/inputs/inputFile';
import FormArrayField from './FormArrayField';
import { FormButton } from './FormButton';
import { FormItem } from './FormItem';

export function GroupFormItems({
  children,
  baseFormParams,
  butonAddLabel,
  baseArrayFormParams,
}: any) {

  return Children.map(children, (child) => {
    return child?.props?.name ? (
      <FormItem {...child} {...child.props} {...baseFormParams} />
    ) : child?.type === FormArrayField ? (
      <FormArrayField
        butonAddLabel={butonAddLabel}
        baseArrayFormParams={baseArrayFormParams}
        baseFormParams={baseFormParams}
        {...child.props}
      >
        {child.props.children}
      </FormArrayField>
    ) : child?.type === GroupFormItems ? (
      <GroupFormItems
        {...child.props}
        butonAddLabel={butonAddLabel}
        baseFormParams={baseFormParams}
        baseArrayFormParams={baseArrayFormParams}
        formGroup={child.props.formGroup}
      />
    ) : child?.type === Button ? (
      <FormButton
        props={child.props}
        handleSubmit={baseFormParams.handleSubmit}
      />
    ) : child?.type === Divider ? (
      <Grid item xs={12} md={12} sm={12}>
        <Divider />
      </Grid>
    ) : child?.type === InputFile ? (
      <Grid
        item
        xs={child?.props?.xs || 12}
        md={child?.props?.md || 12}
        sm={child?.props?.sm || 12}
       
      >
        {child}
      </Grid>
    ) : (
      child
    );
  });
}
