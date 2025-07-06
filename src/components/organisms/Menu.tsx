import { Box, ButtonBase } from '@mui/material';
import { ReactComponent as Schedule } from '../../assets/schedule.svg';
import { ReactComponent as Chat } from '../../assets/chat.svg';
import { ReactComponent as Tele } from '../../assets/tele.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import IconTextBelow from '../atoms/IconTextBelow';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

interface IMenuItem {
  key: string;
  title: string;
  Icon?: any;
}

const items: IMenuItem[] = [
  { key: '', title: 'Início', Icon: Home },
  { key: 'agenda', title: 'Agenda', Icon: Schedule },
  { key: 'consulta', title: 'Consulta', Icon: Tele },
  { key: 'chat', title: 'Chat', Icon: Chat },
];

export default memo(function Menu() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'primary.light',
        width: '100%',
      }}
    >
      {items.map(({ key, ...propsMenuItem }: IMenuItem) => (
        <ButtonBase key={key} onClick={() => navigate(key)}>
          <IconTextBelow {...propsMenuItem} />
        </ButtonBase>
      ))}
    </Box>
  );
});
