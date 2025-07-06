import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import LoginService from './LoginService';
import HttpException from '../../services/HttpException';
import { useSnackbar } from 'notistack';
import SmartForm from '../../components/organisms/form/SmartForm';  
import { logoUrl } from '../../utils/Constants';
import InputText from '../../components/molecules/inputs/InputText';
import { setSession } from '../../utils/Api';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/random?trees)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
}));

interface ILogin {
  loginService?: LoginService;
}

export default function Login({
  loginService = new LoginService(),
}: ILogin): JSX.Element {
  const classes = useStyles();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [isSending, setIsSending] = useState(false);

  const loginHandler = (data: any) => {
    setIsSending(true);
    loginService
      .login(data)
      .then((res) => {
        console.log({ loginHandler: res });
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
    <Box className={classes.root}>
      <Paper sx={{ minWidth: 300 }} elevation={6}>
        <Stack padding={10} spacing={3}>
          <Box component="img" src={logoUrl} />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {!isSending ? (
            <SmartForm onSubmit={loginHandler}>
              <InputText
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                validations={{ required: 'Obrigatório' }}
              />
              <InputText
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                validations={{ required: 'Obrigatório' }}
              />
              <Button type="submit">Entrar</Button>
              <Button
                color="secondary"
                onClick={() => navigate('/external/new-user')}
              >
                Novo
              </Button>
            </SmartForm>
          ) : (
            <Box display="flex" paddingTop={10} justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
