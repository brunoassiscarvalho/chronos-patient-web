import { CallEnd, Camera, CameraAlt, Mic, MicOff, PlayArrow } from '@mui/icons-material';
import { Box, Divider, Fab, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

export default function ButtonsCall() {

  const [mic, setMic] = useState<boolean>();
  const [cam, setCam] = useState<boolean>();

  return (
    <Box display='flex' alignItems='center' justifyContent='center' >
      <Box display='flex' justifyContent='space-between' alignItems='center' maxWidth={800} width='30%'>

        <Stack
          direction="row"
          // divider={<Divider orientation="vertical" flexItem />}
          spacing={2}         
        >

          <Fab color={cam ? 'primary' : 'default'} aria-label="edit" onClick={() => setCam(!cam)}>
            {cam ? <Camera /> : <CameraAlt />}
          </Fab>
          <Fab color={mic ? 'primary' : 'default'} aria-label="edit" onClick={() => setMic(!mic)}>
            {mic ? <Mic /> : <MicOff />}
          </Fab>


        </Stack>
        <Fab color="error" aria-label="edit">
          <CallEnd />
        </Fab>
      </Box>
    </Box>



  );
}