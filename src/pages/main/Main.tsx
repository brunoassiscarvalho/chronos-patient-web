import { Box, Grid, Paper } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom';
import Menu from '../../components/organisms/Menu';
import Navbar from '../../components/organisms/Navbar';
import { getUser } from '../../utils/Api';

export default function Main(): JSX.Element {
  const navigate = useNavigate();

  const user = getUser();
  if (!user) navigate('/login');

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar user={user} />
      </Grid>
      <Grid item xs={12}>
        <Menu />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ padding: 5 }}>
          <Paper sx={{ width: '100%', padding: 3, minHeight: '70vh' }}>
            <Outlet />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
