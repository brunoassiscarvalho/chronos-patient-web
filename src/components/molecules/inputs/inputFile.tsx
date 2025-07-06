import { Box, Theme, Typography } from '@mui/material';
import ButtonUpload from '../buttons/ButtonUpload';
import { makeStyles } from '@mui/styles';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputFile extends IFormItem {
  id: string;
  label: string;
  text: string;
  onChange: (data: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: theme.spacing(3),
  },
  text: {
    padding: theme.spacing(1),
  },
}));

export default function InputFile({
  id,
  label,
  text,
  onChange,
  name,
}: IInputFile) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ButtonUpload
        label={label}
        id={id}
        onChange={onChange}
        className={classes.root}
        name={name}
      />
      <Typography className={classes.text}>{text}</Typography>
    </Box>
  );
}
