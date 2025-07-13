import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { ReactComponent as Schedule } from '../../assets/icon-schedule.svg';
import { ReactComponent as Chat } from '../../assets/icon-chat.svg';
import { ReactComponent as Tele } from '../../assets/icon-tele.svg';
import { ReactComponent as Symptoms } from '../../assets/icon-symptons.svg';
import { ReactComponent as Medicine } from '../../assets/icon-medicine.svg';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';

interface IMenuItem {
  key: string;
  title: string;
  Icon: any;
}

const items: IMenuItem[] = [
  { key: 'agenda', title: 'Agenda', Icon: Schedule },
  { key: 'consulta', title: 'Consulta', Icon: Tele },
  { key: 'sintomas', title: 'Sintomas', Icon: Symptoms },
  { key: 'medicamentos', title: 'Medicamentos', Icon: Medicine },
  { key: 'chat', title: 'Chat', Icon: Chat },
];

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState();

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          {items.map(({ key, title, Icon }: IMenuItem) => (
            <BottomNavigationAction
              value={key}
              key={key}
              label={title}
              icon={<Icon width={30} height={30} />}
            />
          ))}
        </BottomNavigation>
      </Box>
    </AppBar>
  );
}
