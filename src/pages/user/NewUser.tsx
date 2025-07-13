import Content from '../../components/organisms/Content';
import { Box, Button, Stack, Typography } from '@mui/material';
import SmartForm from '../../components/organisms/form/SmartForm';
import InputText from '../../components/molecules/inputs/InputText';
import { logoUrl } from '../../utils/Constants';
import UserService from './PatientService';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';
import HttpException from '../../services/HttpException';
import InputDate from '../../components/molecules/inputs/InputDate';
import InputAutocomplete from '../../components/molecules/inputs/InputAutocomplete';
import { genders } from '../../utils/Lists';
import { isAfter } from 'date-fns';
import { IPatient } from '../../interfaces/Patient';

interface INewUser {
  service?: UserService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  name: Yup.string()
    .required('Obrigatório')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      'Formato de nome inválido.',
    ),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Obrigatório'),
  phone: Yup.string().required('Obrigatório'),
  birthDate: Yup.date()
    .required('Obrigatório')
    .test('DDN', 'Data de nascimento inválida', (value) => {
      return !isAfter(value!, new Date());
    })
    .typeError('Data inválida'),
  gender: Yup.string().required('Obrigatório'),
  zipCode: Yup.string().required('Obrigatório'),
  password: Yup.string()
    .required('Obrigatório')
    .matches(/^(?=.{6,})/, 'Senha precisa de pelo menos de 6 caracteres!'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Obrigatório'),
});

export default function NewUser({ service = new UserService() }: INewUser) {
  const [result, setResult] = useState<boolean>();
  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [patient, setPatient] = useState<
    IPatient & { password: string; passwordConfirmation: string }
  >();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    setPatient(success);
    if (success) createNewUser(success);
  };

  const createNewUser = (newUser: any) => {
    setIsLoading(true);
    service
      .createPatient(newUser)
      .then(() => {
        setResult(true);
      })
      .catch((e: HttpException) => {
        enqueueSnackbar(e.message, { variant: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Content title="Cadastro" isLoading={isLoading}>
      <Stack spacing={5}>
        <Box component="img" src={logoUrl} />
        {result ? (
          <Typography variant="h5">
            Enviamos o email para confirmação!
          </Typography>
        ) : (
          <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
            <Stack spacing={2}>
              <InputText
                name="name"
                label="Nome"
                error={errors}
                defaultValue={patient?.name}
              />
              <InputDate
                name="birthDate"
                label="Data de nascimento"
                error={errors}
                defaultDate={patient?.birthDate}
              />
              <InputAutocomplete
                name="gender"
                options={genders}
                label="Gênero"
                error={errors}
                defaultValue={patient?.gender}
              />
              <InputText
                name="email"
                type="email"
                label="Email"
                error={errors}
                defaultValue={patient?.email}
              />
              <InputText
                name="phone"
                format="phone"
                label="Telefone"
                error={errors}
                defaultValue={patient?.phone}
              />
              <InputText
                name="zipCode"
                format="cep"
                label="CEP"
                error={errors}
                defaultValue={patient?.zipCode}
              />
              <InputText
                name="password"
                type="password"
                label="Senha"
                error={errors}
                defaultValue={patient?.password}
              />
              <InputText
                name="passwordConfirmation"
                type="password"
                label="Confirme a senha"
                error={errors}
                defaultValue={patient?.passwordConfirmation}
              />
              <Button type="submit">Cadastrar</Button>
            </Stack>
          </SmartForm>
        )}
      </Stack>
    </Content>
  );
}
