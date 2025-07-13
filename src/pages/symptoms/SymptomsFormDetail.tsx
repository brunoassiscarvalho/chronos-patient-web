import Content from '../../components/organisms/Content';
import * as Yup from 'yup';
import SmartForm from '../../components/organisms/form/SmartForm';
import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import InputDateTime from '../../components/molecules/inputs/InputDateTime';
import InputText from '../../components/molecules/inputs/InputText';
import { Symptom, SymptomLevel } from '../../interfaces/Symptom';
import HttpException from '../../services/HttpException';
import SymptomService from './SymptomService';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import RadioButton from '../../components/molecules/radio/RadioButton';
import { IPatientSymptom } from '../../interfaces/PatientSymptom';

interface ISymptomsFormDetail {
  service?: SymptomService;
}

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  level: Yup.string().required('Campo obrigatório'),
  dateTime: Yup.date().required('Campo obrigatório'),
});

export default function SymptomsFormDetail({
  service = new SymptomService(),
}: ISymptomsFormDetail): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<any>();
  const { symptomId } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [advisement, setAdvisement] = useState<string>();

  const [symptom, setSymptom] = useState<Symptom>();

  function submitForm(success: IPatientSymptom, error: any) {
    setErrors(error);
    insertSymptomRegister(success);
  }

  const insertSymptomRegister = (patientSymptom: IPatientSymptom) => {
    service
      .insertSymptomRegister(patientSymptom)
      .then((res) => {
        const teste = symptom?.levels?.find((item) => {
          return Number(item.level) === Number(patientSymptom.level);
        });
        if (teste) setAdvisement(teste.advisement);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  useEffect(() => {
    if (symptomId) {
      service
        .getSymptom(symptomId)
        .then((res: Symptom) => {
          setSymptom(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    } else {
      setIsloading(false);
    }
  }, [symptomId]);

  return (
    <Content title="Sintômas" maxWidth={500} isLoading={isLoading}>
      {advisement && <>{advisement}</>}
      {symptom?.levels?.length && !advisement && (
        <SmartForm onSubmit={submitForm} validationSchema={validationSchema}>
          <Stack width={500} spacing={3}>
            <Typography variant="h6">{symptom.title}</Typography>
            <Typography>{symptom.description}</Typography>
            <RadioButton
              options={symptom.levels.map((item: SymptomLevel) => ({
                text: item.resume,
                value: Number(item.level),
              }))}
              name="level"
              label="Grau"
              error={errors}
            />

            <InputDateTime
              label="Data e horário aproximado"
              name="dateTime"
              error={errors}
            />
            <InputText
              rows={5}
              label="Observação"
              name="note"
              fullWidth
              error={errors}
            />
            <Button type="submit">Enviar</Button>
          </Stack>
        </SmartForm>
      )}
    </Content>
  );
}
