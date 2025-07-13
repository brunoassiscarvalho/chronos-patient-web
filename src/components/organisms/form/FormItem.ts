import { GridSize, Grid } from '@mui/material';

export interface IVisualFormItem {
  xs?: GridSize;
  md?: GridSize;
  sm?: GridSize;
}

export interface IFormItem extends IVisualFormItem {
  label: string;
  error?: any;
  name: string;
  validations?: any;
}
