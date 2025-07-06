import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logoUrl } from '../../utils/Constants';
import { Avatar, Box } from '@mui/material';
import { memo } from 'react';
import { IPatientBasic } from '../../interfaces/Patient';

interface INavBar {
  user: IPatientBasic;
}

export default memo(function NavBar({ user }: INavBar) {
  console.log({ user });
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="static"
      elevation={3}
      color="inherit"
    >
      <Toolbar>
        <Box component="img" src={logoUrl} height={40} margin={2} />
        <Box sx={{ flexGrow: 1 }} />

        {user && <Typography>{user.name || user.email}</Typography>}
        {user && (
          <Avatar
            sx={{ marginLeft: 2 }}
            alt={user.name || user.email}
            src={user.urlImage}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}, userEmailPropsAreEqual);

function userEmailPropsAreEqual(prevUser: any, nextUser: any) {
  return (
    prevUser.user.email === nextUser.user.email &&
    prevUser.user.name === nextUser.user.name
  );
}
