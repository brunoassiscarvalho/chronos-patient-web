import { Divider, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import AppointmentDisplay from '../../components/molecules/AppointmentDisplay';
import ConfirmButton from '../../components/organisms/form/ConfirmButton';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentService from './AppointmentService';

interface IAppointmentBook {
  appointment: IAppointment;
  service?: AppointmentService;
  onCancel: () => void;
  onConfirm: (appointment: IAppointment) => void;
}

export default function AppointmentDetail({
  appointment,
  service = new AppointmentService(),
  onCancel,
  onConfirm,
}: IAppointmentBook): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsloading] = useState<boolean>(false);

  function cancelAppointment() {
    setIsloading(true);
    service
      .cancelAppointment(appointment)
      .then(() => {
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

      {isLoading ? (
        <Skeleton />
      ) : (
        <Box display="flex" justifyContent="space-between">
          <ConfirmButton
            onClick={cancelAppointment}
            onCancel={onCancel}
            color="error"
            dialogMessage="Deseja Cancelar a consulta?"
            dialogTitle="Cancelamento de consulta"
          >
            Cancelar o agendamento
          </ConfirmButton>
        </Box>
      )}
    </Stack>
  );
}
