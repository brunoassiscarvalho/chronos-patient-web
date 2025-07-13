import { PersonSearch } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Grid,
  Box,
  ButtonBase,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayProfessional from '../../components/molecules/DisplayProfessional';
import Content from '../../components/organisms/Content';
import { IProfessional } from '../../interfaces/Professional';
import HttpException from '../../services/HttpException';
import { literalPosition } from '../../utils/TypeEnums';
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
        professionals?.filter(
          (professional) =>
            professional.name.includes(text) ||
            literalPosition(professional.position).includes(text),
        ),
      );
    }
  }

  return (
    <Content
      title="Marcar Consulta"
      withoutGoBack
      isLoading={isLoading}
      maxWidth={1800}
    >
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <TextField
              onChange={searchProfessional}
              label="Profissional por nome ou especialidade"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearch />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: { xs: '90%', sm: '90%', md: 500 } }}
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
                    <DisplayProfessional name={name} position={position} />
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ),
        )}
      </Grid>
    </Content>
  );
}
