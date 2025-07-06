import { Box, Grid } from '@mui/material';
import { useRef } from 'react';

import ButtonsCall from '../molecules/buttons/ButtonsCall';



export default function VideoPlayer({ token, video }: any) {





  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box width="100%" height='46vh' sx={{ backgroundColor: 'gray' }}>
          <video width="100%" height="600" autoPlay>{video}</video>
          {/* <audio ref={audioRef} autoPlay /> */}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ButtonsCall />
      </Grid>

    </Grid>
  );
}