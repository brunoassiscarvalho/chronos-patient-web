import { Box, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayProfessional from '../../components/molecules/DisplayProfessional';
import FullCalendar from '../../components/molecules/FullCalendar';
import Content from '../../components/organisms/Content';
import DialogModal from '../../components/organisms/DialogModal';
import { IAppointmentEvent } from '../../interfaces/Appointment';
import HttpException from '../../services/HttpException';
import AppointmentBook from './AppointmentBook';
import AppointmentDetail from './AppointmentDetail';
import AppointmentService from './AppointmentService';

interface IAppointment {
  service?: AppointmentService;
}

export default function AppointmentCalendar({
  service = new AppointmentService(),
}: IAppointment): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { professionalId } = useParams<string>();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [professional, setProfessional] = useState<any>();

  const [appointments, setAppointments] = useState<any[]>();
  const [event, setEvent] = useState<IAppointmentEvent | null>();

  useEffect(() => {
    getProfessionalSchedule();
    getProfessional();
  }, [professionalId]);

  function getProfessionalSchedule() {
    setIsloading(true);
    if (!professionalId) {
      enqueueSnackbar('Profissional não informado', { variant: 'error' });
      setIsloading(false);
    } else {
      service
        .getAppointmentByProfessional(professionalId)
        .then((res: any) => {
          setAppointments(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }

  function getProfessional() {
    setIsloading(true);
    if (!professionalId) {
      enqueueSnackbar('Profissional não informado', { variant: 'error' });
      setIsloading(false);
    } else {
      service
        .getProfessional(professionalId)
        .then((res: any) => {
          setProfessional(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }

  function onSelectEvent({ extendedProps, start, end, id }: IAppointmentEvent) {
    setEvent({ extendedProps, start, end, id });
  }

  function onConfirmOrCancel() {
    setEvent(null);
    getProfessionalSchedule();
  }

  return (
    <Content title="Selecionar horário da Consulta" isLoading={isLoading}>
      {appointments && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width={400}>
                <DisplayProfessional {...professional} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FullCalendar
              onSelectEvent={onSelectEvent}
              events={appointments}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      )}

      <DialogModal
        title={
          event?.extendedProps?.patient
            ? 'Seu Agendamento'
            : 'Confirmação de agendamento'
        }
        open={!!event}
        onClose={() => setEvent(null)}
      >
        {!event?.extendedProps?.patient && event?.extendedProps && (
          <AppointmentBook
            appointment={{ ...event, ...event.extendedProps, _id: event.id }}
            onCancel={() => setEvent(null)}
            onConfirm={onConfirmOrCancel}
          />
        )}
        {event?.extendedProps?.patient && (
          <AppointmentDetail
            appointment={{ ...event, ...event.extendedProps, _id: event.id }}
            onCancel={() => setEvent(null)}
            onConfirm={onConfirmOrCancel}
          />
        )}
      </DialogModal>
    </Content>
  );
}
