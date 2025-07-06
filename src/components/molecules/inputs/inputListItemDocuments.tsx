import {
  Avatar,
  ListItemText,
  Button,
  Divider,
  Grid,
  Box,
  Theme,
  
  FormHelperText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete, Edit, ImageSearch, Image, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ButtonUpload from '../buttons/ButtonUpload';
import { IFormItem } from '../../organisms/form/FormItem';
import DialogModal from '../../organisms/DialogModal';

const useStyles = makeStyles((theme: Theme) => ({
  buttonsBar: {
    marginRight: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  avatar: {
    height: 150,
    width: 150,
    marginRight: 50,
  },
  image: {
    height: 120,
    width: 120,
  },
  imageView: {
    width: '100%',
  },
}));

interface IInputListItemDocuments extends IFormItem {
  name: string;
  label: string;
  onChange?: (data:any)=>void;
  resumeId?: string;
}

export default function InputListItemDocuments({
  name,
  label,
  onChange,
  setValue,
  inputRef,
  defaultValue,
  errors,
}: IInputListItemDocuments) {
  const tratedName = name.split('.')[1] || name;
  const classes = useStyles();

  const [image, setImage] = useState<any>(defaultValue);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    !!errors && errors[tratedName],
  );

  useEffect(() => {
    if (errors) setErrorMessage(errors[tratedName]?.message);
  }, [errors, tratedName]);

  const handleChange = (image: any) => {
    setValue(name, image);
    setImage(image);
    if (onChange) onChange(image);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={10}>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar} variant="rounded">
              {!image?.base64 ? (
                <Image className={classes.image} />
              ) : (
                <img
                  src={image?.base64}
                  className={classes.image}
                  alt="imagem"
                />
              )}
            </Avatar>
            <Box>
              <ListItemText
                style={errorMessage ? { color: 'red' } : undefined}
                primary={label}
                secondary={image?.name}
              />
              {errorMessage && (
                <FormHelperText error>{errorMessage}</FormHelperText>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} direction="column">
          <Box className={classes.buttonsBar}>
            {!!image && (
              <Button
                fullWidth
                aria-label="ver imagem"
                onClick={() => setOpenImage(true)}
              >
                <ImageSearch /> Visualizar
              </Button>
            )}
            <ButtonUpload
              fullWidth={true}
              label={image ? 'editar' : 'imagem'}
              name={name}
              onChange={handleChange}
              startIcon={image ? <Edit /> : <Add />}
              inputRef={inputRef}
            />
            {!!image && (
              <Button
                fullWidth
                variant="outlined"
                aria-label="excluir imagem"
                onClick={() => handleChange(null)}
              >
                <Delete /> Excluir
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
      </Grid>
      <DialogModal
        title={label}
        open={openImage}
        onClose={() => setOpenImage(false)}
      >
        <img src={image?.base64} className={classes.imageView} />
      </DialogModal>
    </Box>
  );
}
