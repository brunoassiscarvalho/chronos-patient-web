import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Content from '../../components/organisms/Content';
import HttpException from '../../services/HttpException';
import TeleAttendanceService from './TeleAttendanceService';
import { urlVideo } from '../../utils/Constants';
import AppointmentAdvisor from '../appointment/AppointmentAdvisor';

const TeleAttendance = ({ service = new TeleAttendanceService() }: any) => {
  const { appointmentId } = useParams<string>();
  const [appointment, setAppointment] = useState<any>(null);
  const [error, setError] = useState<HttpException>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    service
      .getAttendance(appointmentId)
      .then((res: any) => {
        setAppointment(res);
      })
      .catch((error: HttpException) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appointmentId]);

  return (
    <Content title="Tele atendimento" isLoading={isLoading} maxWidth={1000}>
      <Box display="flex" justifyContent="center" width="100%" height="70vh">
        {appointment && (
          <Box
            component="iframe"
            src={`${urlVideo}/room/${appointment.token}`}
            width="100%"
            height="100%"
            border="none"
            allow="camera;microphone;display-capture"
          ></Box>
        )}
        {error && (
          <TeleAttendanceFeedbacks internalCode={error?.internalCode} />
        )}
      </Box>
    </Content>
  );
};

function TeleAttendanceFeedbacks(props: any) {
  const { internalCode, appointment } = props;
  switch (internalCode) {
    case 'CHECK_APPOINTMENT_VIDEO_ANTECIPATION':
      return (
        <Stack spacing={3}>
          <Typography variant="h4"> Você chegou cedo!</Typography>
          <Typography variant="h6">
            {' '}
            Sua consulta sera liberada somente 15 minutos antes do tempo
            previsto
          </Typography>

          <AppointmentAdvisor />
        </Stack>
      );
    case 'CHECK_APPOINTMENT_VIDEO_LATE':
      return <>Sua consulta não esta mais disponível</>;
    default:
      return <>Ocorreu algum problema ao abrir sala de consulta </>;
  }
}

export default TeleAttendance;
