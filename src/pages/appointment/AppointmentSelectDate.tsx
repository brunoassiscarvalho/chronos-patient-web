import Content from '../../components/organisms/Content';
import DialogModal from '../../components/organisms/DialogModal';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import AppointmentService from './AppointmentService';
import { useSnackbar } from 'notistack';
import { formatDateUTC, formatHoursUTC } from '../../utils/Dates';
import HttpException from '../../services/HttpException';
import FullCalendar from '../../components/molecules/FullCalendar';
import { useParams } from 'react-router-dom';

interface IAppointment {
  service?: AppointmentService;
}

export default function AppointmentSelectDate({
  service = new AppointmentService(),
}: IAppointment): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { professionalId } = useParams<string>();

  const [isLoading, setIsloading] = useState<boolean>(true);

  const [appointments, setAppointments] = useState<any[]>();

  const [open, setOpen] = useState<any>();
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    getProfessionalSchedule();
  }, []);

  function getProfessionalSchedule() {
    setIsloading(true);
    if (!professionalId) {
      enqueueSnackbar('Profissional não informado', { variant: 'error' });
      setIsloading(false);
    } else {
      service
        .getAppointmentByProfessional(professionalId)
        .then((res: any) => {
          const tratedEvents: any[] | undefined = res?.map((event: any) => {
            if (event.start && event.end) {
              return {
                ...event,
                backgroundColor: event.patient ? 'red' : 'gray',
                id: event._id,
              };
            }
            return event;
          });
          if (tratedEvents)
            setAppointments(tratedEvents);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }

  useEffect(() => {

    console.log(appointments);
  }, [appointments]);

  function onSelectEvent(event: any) {
    setEvent(event.extendedProps);
    console.log(event.extendedProps);
    setOpen(true);
  }

  function saveEvent(event: any) {

    service
      .saveAppointment(event)
      .then((res) => {
        setEvent(null);
        setOpen(false);
        getProfessionalSchedule();
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  }

  return (
    <Content title="Selecionar horário da Consulta">

      {isLoading ?
        <>Loading</> :

        appointments && (
          <FullCalendar onSelectEvent={onSelectEvent} events={appointments} isLoading={isLoading} />
        )}

      <DialogModal
        title="Confirmação de agendamento"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          event && (
            <>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancelar
              </Button>
              <Button onClick={() => saveEvent(event)}>Confirmar</Button>
            </>
          )
        }
      >
        {event && (
          <>
            <Typography>{event?.resource?.professional?.name}</Typography>
            <Typography>{formatDateUTC(event?.start || new Date())}</Typography>
            <Typography>
              {formatHoursUTC(event?.start || new Date())}
            </Typography>
            <Typography>{formatHoursUTC(event?.end || new Date())}</Typography>
          </>
        )}
      </DialogModal>
    </Content>
  );
}
