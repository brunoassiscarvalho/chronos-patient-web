import { Divider, Typography, Button, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import AppointmentDisplay from '../../components/molecules/AppointmentDisplay';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentService from './AppointmentService';

interface IAppointmentBook {
  appointment: IAppointment;
  service?: AppointmentService;
  onCancel: () => void;
  onConfirm: (appointment: IAppointment) => void;
}

export default function AppointmentBook({
  appointment,
  service = new AppointmentService(),
  onCancel,
  onConfirm,
}: IAppointmentBook): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsloading] = useState<boolean>(false);

  function saveEvent() {
    setIsloading(true);
    service
      .bookAppointment(appointment)
      .then(() => {
        enqueueSnackbar('Agendamento realizado!', { variant: 'success' });
        if (onConfirm) onConfirm(appointment);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  return (
    <Stack spacing={3}>
      <AppointmentDisplay appointment={appointment} />
      <Divider />
      <Typography>Deseja confirmar o agendamento?</Typography>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Box display="flex" justifyContent="space-between">
          <Button onClick={saveEvent}> Sim </Button>
          <Button onClick={onCancel} color="error">
            Não
          </Button>
        </Box>
      )}
    </Stack>
  );
}
