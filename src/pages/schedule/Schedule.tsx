import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Skeleton,
  Grid,
  ButtonBase,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentService from '../appointment/AppointmentService';
import { useSnackbar } from 'notistack';
import { formatHoursUTC, formatDateUTC } from '../../utils/Dates';
import HttpException from '../../services/HttpException';
import { useNavigate } from 'react-router-dom';

interface ISchedule {
  service?: AppointmentService;
}

export default function Schedule({
  service = new AppointmentService(),
}: ISchedule) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
    <Content title="Agenda" withoutGoBack>
      {isLoading ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
          </Grid>
        </>
      ) : (
        <List sx={{ width: '100%', maxWidth: 600 }}>
          {appointments?.map((appointment: IAppointment) => (
            <>
              <ButtonBase
                key={appointment._id}
                onClick={() => navigate(`/main/tele-atendimento/${appointment._id}`)}
                sx={{ width: '100%', maxWidth: 600 }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatDateUTC(appointment.start)}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${formatHoursUTC(
                            appointment.start,
                          )} - ${formatHoursUTC(appointment.end)}`}
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
                        {` - ${appointment.professional.position}`}
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
