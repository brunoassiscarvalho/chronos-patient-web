import { Box, Theme, useMediaQuery } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import NoMatch from '../../components/molecules/NoMatch';
import Navbar from '../../components/organisms/Navbar';
import { getUser } from '../../utils/Api';
import SimpleBottomNavigation from '../../components/organisms/SimpleBottomNavigation';
import MenuTab from '../../components/organisms/MenuTab';
import DrawerHeader from '../../components/atoms/DrawerHeader';

export default function Main(): JSX.Element {
  const navigate = useNavigate();
  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const user = getUser();
  if (!user) navigate('/');

  return user ? (
    <Box sx={{ display: 'flex' }}>
      <Navbar user={user} />

      {isVerySmall ? <SimpleBottomNavigation /> : <MenuTab />}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box
          sx={{
            padding: 1,
            paddingBottom: 15,
            paddingLeft: isVerySmall ? 0 : 20,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  ) : (
    <NoMatch />
  );
}
