import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ButtonBase,
  Stack,
  Box,
  Button,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentService from '../appointment/AppointmentService';
import { useSnackbar } from 'notistack';
import { converteDateBars, formatOnlyHours } from '../../utils/Dates';
import HttpException from '../../services/HttpException';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ScheduleIcon } from '../../assets/gray_schedule.svg';
import { literalPosition } from '../../utils/TypeEnums';
import DialogModal from '../../components/organisms/DialogModal';
import AppointmentBook from '../appointment/AppointmentBook';
import AppointmentDetail from '../appointment/AppointmentDetail';

interface ISchedule {
  service?: AppointmentService;
}

function NoSchedules() {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={5}
      height="100%"
    >
      <Stack justifyContent="center" alignItems="center" spacing={5}>
        <ScheduleIcon width={150} height={150} color="secondary" />
        <Typography variant="h5" color="secondary">
          Não existem agendamentos para você
        </Typography>
        <Button onClick={() => navigate('/main/consulta')}>
          Nova Consulta
        </Button>
      </Stack>
    </Box>
  );
}

export default function Schedule({
  service = new AppointmentService(),
}: ISchedule) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const [isLoading, setIsloading] = useState<boolean>(true);

  const [appointments, setAppointments] = useState<IAppointment[]>();

  useEffect(() => {
    service
      .getCustomerAppointment()
      .then((res: any) => {
        setAppointments(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <Content
      title="Agenda"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      {!appointments?.length ? (
        <NoSchedules />
      ) : (
        <List sx={{ width: '100%', maxWidth: 600 }}>
          {appointments?.map((appointment: IAppointment) => (
            <>
              <ButtonBase
                key={appointment._id}
                onClick={() =>
                  navigate(
                    `/main/tele-atendimento/${appointment._id}/ante-sala`,
                  )
                }
                sx={{ width: '100%', maxWidth: 600 }}
              >
                <ListItem alignItems="flex-start">
                  {!isVerySmall && (
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={converteDateBars(appointment.start)}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${formatOnlyHours(
                            appointment.start,
                          )} - ${formatOnlyHours(appointment.end)}`}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemText
                    primary="Teleconsulta"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {appointment.professional.name}
                        </Typography>
                        {` - ${literalPosition(
                          appointment.professional.position,
                        )}`}
                      </>
                    }
                  />
                </ListItem>
              </ButtonBase>
              <Divider />
            </>
          ))}
        </List>
      )}
    </Content>
  );
}
