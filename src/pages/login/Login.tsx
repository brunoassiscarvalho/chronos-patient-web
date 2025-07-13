import { useState } from 'react';
import {
  Box,
  Stack,
  CircularProgress,
  Button,
  Paper,
  useMediaQuery,
  Theme,
  Grid,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import LoginService from './LoginService';
import HttpException from '../../services/HttpException';
import { useSnackbar } from 'notistack';
import SmartForm from '../../components/organisms/form/SmartForm';
import { logoUrl } from '../../utils/Constants';
import InputText from '../../components/molecules/inputs/InputText';
import { setSession } from '../../utils/Api';
import * as Yup from 'yup';

interface ILogin {
  loginService?: LoginService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
});

export default function Login({
  loginService = new LoginService(),
}: ILogin): JSX.Element {
  const isLarge: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('lg'),
  );

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<any>();

  const [isSending, setIsSending] = useState(false);

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) signIn(success);
  };

  const signIn = (data: any) => {
    setIsSending(true);
    loginService
      .login(data)
      .then((res) => {
        setSession(res);
        navigate('/main');
      })
      .catch((e: HttpException) => {
        if (e.internalCode === 'LOGIN002')
          navigate('external/resend-mail-avalidation');
        enqueueSnackbar(e.message, { variant: 'error' });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack padding={isLarge ? 8 : 4} spacing={isLarge ? 3 : 2}>
        <Box component="img" src={logoUrl} />
        {!isSending ? (
          <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
            <Stack spacing={1}>
              <InputText
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors}
              />
              <InputText
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                error={errors}
              />
              <Button type="submit">Entrar</Button>
              <Button color="secondary" onClick={() => navigate('/new-user')}>
                Novo
              </Button>
              <Button color="secondary" onClick={() => navigate('/reset-pass')}>
                Esqueci minha senha
              </Button>
            </Stack>
          </SmartForm>
        ) : (
          <Box display="flex" paddingTop={10} justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Stack>
    </Grid>
  );
}
