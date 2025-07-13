import Content from '../../components/organisms/Content';
import { Box, Button, Stack, Typography } from '@mui/material';
import SmartForm from '../../components/organisms/form/SmartForm';
import InputText from '../../components/molecules/inputs/InputText';
import { logoUrl } from '../../utils/Constants';
import PatientService from './PatientService';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import { IUserMailConfirmationForm } from '../../interfaces/Patient';

interface IUserUpdateMailConfirmation {
  service?: PatientService;
}

export default function UpdateMailConfirmation({
  service = new PatientService(),
}: IUserUpdateMailConfirmation) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('t');

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (data: IUserMailConfirmationForm) => {
    if (token) {
      setIsLoading(true);
      service
        .sendUpdateMailConfirmation({ ...data, token })
        .then(() => {
          enqueueSnackbar(
            'Foi enviado um email para confirmação da alteração!',
            { variant: 'success' },
          );
        })
        .catch((error: HttpException) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Content
      title="Cadastro"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <Stack spacing={5}>
        <Box component="img" src={logoUrl} />
        <SmartForm onSubmit={onSubmit}>
          <Stack spacing={3}>
            <Typography>Deseja confirmar a alteração do seu email?</Typography>
            <Typography>
              Para confirmar digite o novo email abaixo e a senha
            </Typography>
            <InputText name="newEmail" type="email" label="Novo Email" />
            <InputText name="email" type="email" label="Email Anterior" />
            <InputText name="password" type="password" label="Senha" />
            <Button type="submit">Alterar Email</Button>
          </Stack>
        </SmartForm>
      </Stack>
    </Content>
  );
}
