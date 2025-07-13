import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { IPatientBasic } from '../../interfaces/Patient';

interface IAvatarText {
  user: IPatientBasic;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AvatarText({ user, onClick }: IAvatarText) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick && onClick(event);
  };

  return (
    <ListItemButton alignItems="center" onClick={handleClick}>
      <ListItemText>
        <Typography color="background.paper">
          <b>{user?.name}</b>
        </Typography>
      </ListItemText>
      <ListItemAvatar>
        <Avatar
          sx={{ marginLeft: 2 }}
          alt={user?.name || user?.email}
          src={user?.image}
        />
      </ListItemAvatar>
    </ListItemButton>
  );
}
