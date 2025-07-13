import { Grid, ButtonBase, Paper, Card, CardContent } from '@mui/material';
import Content from '../../components/organisms/Content';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconTextBelow from '../../components/atoms/IconTextBelow';
import { Symptom } from '../../interfaces/Symptom';
import SymptomService from './SymptomService';
import HttpException from '../../services/HttpException';
import { ReactComponent as Home } from '../../assets/home.svg';

interface ISymptomsGrid {
  service?: SymptomService;
}

export default function SymptomsGrid({
  service = new SymptomService(),
}: ISymptomsGrid): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [symptoms, setSymptoms] = useState<Symptom[]>();

  useEffect(() => {
    service
      .getSymptoms()
      .then((res: Symptom[]) => {
        setSymptoms(res);
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
      title="Sintômas"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={1500}
    >
      <Grid container spacing={3}>
        {symptoms?.map(({ _id, title, icon }: Symptom) => (
          <Grid item key={_id} xl={2} md={3} sm={6} xs={6}>
            <ButtonBase onClick={() => navigate(_id)} sx={{ width: '100%' }}>
              <Card sx={{ width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <IconTextBelow
                    title={title}
                    Icon={icon || Home}
                    color="black"
                  />
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Content>
  );
}
