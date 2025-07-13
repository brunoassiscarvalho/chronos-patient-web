import { Box, Grid, Paper, Theme, CSSObject } from '@mui/material';
import { Outlet } from 'react-router-dom';

const rootStyles = (theme: Theme): CSSObject => ({
  height: '100vh',
  backgroundImage: 'url(https://source.unsplash.com/random?trees)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    backgroundSize: 'cover',
  },
});

const paperStyles = (theme: Theme): CSSObject => ({
  maxWidth: 600,
  backgroundColor: '#ffffffe7',
  alignSelf: 'center',
  padding: 5,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 390,
  },
});

export default function External() {
  return (
    <>
      <Grid xs={8} item sx={rootStyles}>
        <Paper sx={paperStyles}>
          <Outlet />
        </Paper>
      </Grid>
      <Grid xs={1} item></Grid>
    </>
  );
}
