import { Box, Theme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPatientLogged } from '../../interfaces/Patient';
import { logoUrl } from '../../utils/Constants';

import { Home as HomeIcon } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import AccountMenu from './AccountMenu';

interface INavBar {
  user: IPatientLogged;
}

function userEmailPropsAreEqual(prevUser: INavBar, nextUser: INavBar) {
  return prevUser.user.userId === nextUser.user.userId;
}

function NavBar({ user }: INavBar) {
  const navigate = useNavigate();
  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <AppBar
      sx={{
        bgcolor: 'primary.light',
      }}
      position="fixed"
      elevation={0}
    >
      <Toolbar>
        <Box
          component="img"
          src={logoUrl}
          height={isVerySmall ? 20 : 30}
          margin={2}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            sx={{ color: 'background.paper' }}
            onClick={() => navigate('/main')}
          >
            <HomeIcon />
          </IconButton>
          {/* <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <AccountMenu user={user} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default memo(NavBar, userEmailPropsAreEqual);
