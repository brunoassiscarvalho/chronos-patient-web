import { Stack, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import { IPatientLogged } from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import { getUser } from '../../utils/Api';
import PatientService from './PatientService';
import * as Yup from 'yup';

interface IUserPassword {
  service?: PatientService;
  external?: boolean;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  userEmail: Yup.string()
    .email('Formato de email inválido')
    .required('Obrigatório'),
});

export default function UserPassword({
  service = new PatientService(),
  external,
}: IUserPassword) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();
  const [success, setSuccess] = useState<boolean>();

  const user = getUser();

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) changePassEmail(success);
  };

  const changePassEmail = (data: any) => {
    setIsLoading(true);
    service
      .resetPass({ userEmail: data.userEmail })
      .then(() => {
        setSuccess(true);
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Content
      title="Alterar senha"
      isLoading={isLoading}
      maxWidth={500}
      isCircularLoading
    >
      {success ? (
        <Stack spacing={3}>
          <Typography>Enviamos um email para troca da senha</Typography>
          <Typography>
            Realize o acesso ao seu email e faça a alteração.
          </Typography>
        </Stack>
      ) : (
        <SmartForm
          onSubmit={onSubmit}
          validationSchema={external && validationSchema}
        >
          <Stack spacing={3}>
            <Typography>Deseja confirmar a alteração da senha?</Typography>
            <Typography>
              Um email com um link para trocar a senha sera enviado para:
            </Typography>
            <InputText
              name="userEmail"
              type="email"
              label="Email"
              defaultValue={user?.email}
              error={errors}
              readOnly={!external}
            />
            <Button type="submit">Alterar senha</Button>
          </Stack>
        </SmartForm>
      )}
    </Content>
  );
}
