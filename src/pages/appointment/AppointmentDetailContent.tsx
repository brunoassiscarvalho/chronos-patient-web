import { Button, Divider, Paper, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppointmentDisplay from '../../components/molecules/AppointmentDisplay';
import Content from '../../components/organisms/Content';
import ConfirmButton from '../../components/organisms/form/ConfirmButton';
import { IAppointment } from '../../interfaces/Appointment';
import HttpException from '../../services/HttpException';
import AppointmentAdvisor from './AppointmentAdvisor';
import AppointmentService from './AppointmentService';

interface IAppointmentBook {
  service?: AppointmentService;
}

export default function AppointmentDetailContent({
  service = new AppointmentService(),
}: IAppointmentBook): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { appointmentId } = useParams<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<IAppointment>();

  useEffect(() => {
    if (appointmentId)
      service
        .getAppointment(appointmentId)
        .then((res: any) => {
          setAppointment(res);
        })
        .catch((error: HttpException) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [appointmentId]);

  function cancelAppointment() {
    if (appointment) {
      setIsLoading(true);

      service
        .cancelAppointment(appointment)
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <Content title="Marcar Consulta" isLoading={isLoading} maxWidth={500}>
      {appointment && (
        <Stack spacing={3}>
          <AppointmentDisplay appointment={appointment} />
          <Paper sx={{ padding: 3 }}>
            <AppointmentAdvisor />
          </Paper>
          <Divider />

          {isLoading ? (
            <Skeleton />
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() =>
                  navigate(`/main/tele-atendimento/${appointment._id}/sala`)
                }
              >
                Iniciar consulta
              </Button>

              <ConfirmButton
                onClick={cancelAppointment}
                color="error"
                dialogMessage="Deseja Cancelar a consulta?"
                dialogTitle="Cancelamento de consulta"
              >
                Cancelar o agendamento
              </ConfirmButton>
            </Box>
          )}
        </Stack>
      )}
    </Content>
  );
}
