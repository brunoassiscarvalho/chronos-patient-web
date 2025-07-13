import { Avatar, Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputAutocomplete from '../../components/molecules/inputs/InputAutocomplete';
import InputDate from '../../components/molecules/inputs/InputDate';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import {
  IPatient,
  IPatientBase,
  IPatientLogged,
} from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import { getUser } from '../../utils/Api';
import { genders } from '../../utils/Lists';
import PatientService from './PatientService';
import * as Yup from 'yup';

interface IProfile {
  service?: PatientService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  name: Yup.string().required('Obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Obrigatório'),
  phone: Yup.string().required('Obrigatório'),
  birthDate: Yup.string().required('Obrigatório'),
  gender: Yup.string().required('Obrigatório'),
  zipCode: Yup.string().required('Obrigatório'),
});

export default function Profile({ service = new PatientService() }: IProfile) {
  const { userId }: IPatientLogged = getUser();

  const navigate = useNavigate();
  const [patient, setPatient] = useState<IPatient>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    service
      .getPatient()
      .then((res: IPatient) => {
        setPatient(res);
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) updateUser(success);
  };

  const updateUser = (data: IPatientBase) => {
    setPatient(data);
    setIsLoading(true);
    service
      .updatePatientBase(data)
      .then(() => {
        enqueueSnackbar('Dados atualizados!', { variant: 'success' });
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Content
      title="Seu Perfil"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <Stack spacing={3}>
          <Avatar sx={{ width: 100, height: 100 }} />
          <Button onClick={() => navigate('imagem')}> Alterar imagem</Button>
          <InputText
            name="name"
            label="Nome"
            defaultValue={patient?.name}
            error={errors}
          />
          <InputDate
            name="birthDate"
            label="Data de nascimento"
            defaultDate={patient?.birthDate}
            error={errors}
          />
          <InputText
            name="phone"
            format="phone"
            label="Telefone"
            defaultValue={patient?.phone}
            error={errors}
          />
          <InputText
            name="zipCode"
            format="cep"
            label="CEP"
            defaultValue={patient?.zipCode}
            error={errors}
          />
          <InputAutocomplete
            name="gender"
            options={genders}
            label="Gênero"
            freeSolo
            defaultValue={patient?.gender}
            error={errors}
          />
          <Button type="submit">Salvar alteraçao</Button>
          <Button
            color="secondary"
            onClick={() => navigate('dados-complementar')}
          >
            Dados Complementares
          </Button>
          <Button color="secondary" onClick={() => navigate('mudar-senha')}>
            Alterar senha
          </Button>
          <Button color="secondary" onClick={() => navigate('mudar-email')}>
            Alterar email
          </Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
