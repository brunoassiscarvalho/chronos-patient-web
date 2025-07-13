import { Stack, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import { IUserMailConfirmationForm } from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import PatientService from './PatientService';
import * as Yup from 'yup';

interface IUserEmail {
  service?: PatientService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  newEmail: Yup.string().required('Obrigatório'),
  emailConfirm: Yup.string()
    .oneOf([Yup.ref('newEmail'), null], 'Os emails devem ser iguais')
    .required('Obrigatório'),
});

export default function UserEmail({
  service = new PatientService(),
}: IUserEmail) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();

  const onSubmit = (success: IUserMailConfirmationForm, error: any) => {
    setErrors(error);
    if (success) updateEmail(success);
  };

  const updateEmail = (data: IUserMailConfirmationForm) => {
    setIsLoading(true);
    service
      .requestUpdateMail(data)
      .then(() => {
        enqueueSnackbar('Email atualizado!', { variant: 'success' });
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Content
      title="Alterar Email"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <Stack spacing={3}>
          <InputText
            name="newEmail"
            type="email"
            label="Email"
            error={errors}
          />
          <InputText
            name="emailConfirm"
            type="email"
            label="Confirme o email"
            error={errors}
          />
          <Button type="submit">Alterar email</Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
