import { PersonSearch } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  ButtonBase,
  TextField,
  Skeleton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/organisms/Content';
import { IProfessional } from '../../interfaces/Professional';
import HttpException from '../../services/HttpException';
import AppointmentService from './AppointmentService';

interface IAppointment {
  service?: AppointmentService;
}

export default function Appointment({
  service = new AppointmentService(),
}: IAppointment) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [professionals, setProfessionals] = useState<IProfessional[]>();
  const [filteredProfessionals, setFilteredProfessionals] =
    useState<IProfessional[]>();

  useEffect(() => {
    service
      .getProfessionals()
      .then((res) => {
        setProfessionals(res);
        setFilteredProfessionals(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, []);

  function searchProfessional(event: ChangeEvent<HTMLInputElement>) {
    const text = event.currentTarget.value;
    if (!text) {
      setFilteredProfessionals(professionals);
    } else {
      setFilteredProfessionals(
        filteredProfessionals?.filter(
          (professional) =>
            professional.name.includes(text) ||
            professional.position.includes(text),
        ),
      );
    }
  }

  return (
    <Content title="Marcar Consulta" withoutGoBack>
      {isLoading ? (
        <>
          {' '}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={500} height={50} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width="100%" height={118} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <PersonSearch />
              <TextField
                onChange={searchProfessional}
                label="Profissional por nome ou especialidade"
                variant="standard"
                sx={{ minWidth: { xs:'90%', sm: '90%', md: 500 } }}
              />
            </Box>
          </Grid>
          {filteredProfessionals?.map(
            ({ _id, name, position }: IProfessional) => (
              <Grid item key={_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <ButtonBase
                  sx={{ width: '100%' }}
                  onClick={() => navigate(`seleciona/${_id}`)}
                >
                  <Card sx={{ width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          xs={12}
                          sm={2}
                          md={4}
                          lg={4}
                          xl={3}
                        >
                          <Avatar
                            aria-label=""
                            sx={{ width: 56, height: 56 }}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" sx={{ textAlign: 'left' }}>
                            {name}
                          </Typography>

                          <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ textAlign: 'left' }}
                          >
                            {position}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid>
            ),
          )}
        </Grid>
      )}
    </Content>
  );
}
