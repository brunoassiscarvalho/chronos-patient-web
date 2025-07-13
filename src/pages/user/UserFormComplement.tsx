import { Stack, Button } from '@mui/material';
import InputValueAutocomplete from '../../components/molecules/inputs/InputValueAutocomplete';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import { cancerStages, cancerTypes } from '../../utils/Lists';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { IPatientComplement } from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import PatientService from './PatientService';
import * as Yup from 'yup';

interface IUserFormComplement {
  service?: PatientService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  cancerType: Yup.string().required('Obrigatório'),
  cancerStage: Yup.string().required('Obrigatório'),
  religion: Yup.string().required('Obrigatório'),
  maritalStatus: Yup.string().required('Obrigatório'),
  occupation: Yup.string().required('Obrigatório'),
  treatmentSite: Yup.string().required('Obrigatório'),
  allergy: Yup.string().required('Obrigatório'),
  ocologistName: Yup.string().required('Obrigatório'),
});

export default function UserFormComplement({
  service = new PatientService(),
}: IUserFormComplement) {
  const [patient, setPatient] = useState<IPatientComplement>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    service
      .getPatient()
      .then((res: IPatientComplement) => {
        setPatient(res);
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateUserComplement = (data: IPatientComplement) => {
    setPatient(data);
    setIsLoading(true);

    service
      .updatePatientComplement(data)
      .then(() => {
        enqueueSnackbar('Dados complementares atualizados!', {
          variant: 'success',
        });
      })
      .catch((error: HttpException) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) updateUserComplement(success);
  };

  return (
    <Content
      title="Dados Complementares"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <Stack spacing={3}>
          {/* <InputText
            name="tratamentName"
            label="Olá! Como você gostaria de ser chamado?"
            defaultValue={patient?.religion}
            error={errors}
          />

          <InputText
            name="tratamentName"
            label="Genero?"
            defaultValue={patient?.religion}
            error={errors}
          /> */}

          <InputText
            name="religion"
            label="Qual a sua religião?"
            defaultValue={patient?.religion}
            error={errors}
          />

          <InputText
            name="maritalStatus"
            label="Qual o Estado Civil?"
            defaultValue={patient?.maritalStatus}
            error={errors}
          />

          <InputText
            name="occupation"
            label="Qual sua profissão?"
            defaultValue={patient?.occupation}
            error={errors}
          />

          <InputValueAutocomplete
            name="cancerType"
            label="Qual a localização que foi ou está tratando o câncer? "
            options={cancerTypes}
            defaultValue={patient?.cancerType}
            error={errors}
          />
          <InputValueAutocomplete
            name="cancerStage"
            label="Qual fase da jornada oncológica você se encontra?"
            options={cancerStages}
            defaultValue={patient?.cancerStage}
            error={errors}
          />

          {/* <InputText
            name="treatmentSite"
            label="Como realizou ou está realizando o seu tratamento oncológico?"
            defaultValue={patient?.treatmentSite}
            error={errors}
          /> */}

          <InputText
            name="treatmentSite"
            label="Onde realiza o tratamento ou está em investigação do câncer?"
            defaultValue={patient?.treatmentSite}
            error={errors}
          />

          <InputText
            name="allergy"
            label="Você tem alguma alergia à medicamentos?"
            defaultValue={patient?.allergy}
            error={errors}
          />
          <InputText
            name="ocologistName"
            label=" Você tem algum médico oncologista de referência?"
            defaultValue={patient?.ocologistName}
            error={errors}
          />
          <Button type="submit">Salvar alteraçao</Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
