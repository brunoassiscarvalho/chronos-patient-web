import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import Logout from '@mui/icons-material/Logout';
import AvatarText from '../molecules/AvatarText';
import { useNavigate } from 'react-router-dom';
import { IPatientBasic } from '../../interfaces/Patient';
import { useMediaQuery, Tooltip, Theme, ButtonBase } from '@mui/material';

interface IAccountMenu {
  user: IPatientBasic;
}

export default function AccountMenu({ user }: IAccountMenu) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          {isVerySmall ? (
            <ButtonBase onClick={handleClick}>
              <Avatar
                // sx={{ marginLeft: isVerySmall ? 1 : 3 }}
                alt={user?.name || user?.email}
                src={user?.image}
              />
            </ButtonBase>
          ) : (
            <AvatarText user={user} onClick={handleClick} />
          )}
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('paciente')}>
          <Avatar /> Perfil
        </MenuItem>
        <MenuItem onClick={() => navigate('/')}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
