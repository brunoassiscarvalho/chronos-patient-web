import { Stack, Typography } from '@mui/material';

export default function AppointmentAdvisor() {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Três passos para um melhor atendimento
      </Typography>
      <Typography>1 - Busque um lugar silencioso</Typography>
      <Typography>2 - Com uma boa iluminação</Typography>
      <Typography>
        3 - Entre na plataforma com pelo menos 5 minutos de antecedência
      </Typography>
    </Stack>
  );
}
