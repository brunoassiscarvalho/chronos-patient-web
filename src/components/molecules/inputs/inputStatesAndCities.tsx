
import { Grid } from '@mui/material';
import { useState } from 'react';
import { statesString } from '../../../utils/BrasilianStates';
import InputCities, { IInputCities } from './inputCities';
import InputSelect from './InputSelect';


interface IInputStatesAndCities {
  cityParams: Omit<IInputCities, 'state'>
  stateParams: { name: string, inputRef?: any, errors?: any, control?: any, label: string, validations?: any }
}

export default function InputStatesAndCities({ cityParams, stateParams }: IInputStatesAndCities) {

  const [state, setState] = useState('');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <InputSelect {...stateParams} list={statesString} onChange={(value: string) => setState(value)} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputCities {...cityParams} state={state} />
      </Grid></Grid>
  );
}