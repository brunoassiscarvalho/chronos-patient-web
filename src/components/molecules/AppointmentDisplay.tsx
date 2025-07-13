import { Stack, Typography, Box, Divider } from '@mui/material';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentDate from './AppointmentDate';
import DisplayProfessional from './DisplayProfessional';

interface IAppointmentDisplay {
  appointment: IAppointment;
}

export default function AppointmentDisplay({
  appointment,
}: IAppointmentDisplay) {
  return (
    <Stack spacing={3}>
      <Typography color="text.secondary">Profissional</Typography>
      <Box>
        <DisplayProfessional {...appointment.professional} />
      </Box>
      <Divider />
      <AppointmentDate appointment={appointment} />
    </Stack>
  );
}
