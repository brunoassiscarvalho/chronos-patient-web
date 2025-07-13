import { Grid, Avatar, Typography, Skeleton, Stack, Box } from '@mui/material';
import { literalPosition, Positions } from '../../utils/TypeEnums';

interface IDisplayProfessional {
  name: string;
  isLoading?: boolean;
  position: Positions;
}

export default function DisplayProfessional({
  name,
  position,
  isLoading,
}: IDisplayProfessional) {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        xs={12}
        // sm={2}
        // md={4}
        // lg={4}
        // xl={3}
      >
        {isLoading ? (
          <Box>
            <Skeleton variant="circular" width={56} height={56} />
          </Box>
        ) : (
          <Avatar aria-label="" sx={{ width: 56, height: 56 }}></Avatar>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        //  sm={10} md={7} lg={7} xl={8}
      >
        {isLoading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={210} height={40} />
            <Skeleton variant="text" />
          </Stack>
        ) : (
          <Box>
            <Typography noWrap variant="h6">
              {name}
            </Typography>

            <Typography color="text.secondary">
              {literalPosition(position)}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
