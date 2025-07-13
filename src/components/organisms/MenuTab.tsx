import { useState } from 'react';
import { Box, Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Chat } from '../../assets/icon-chat.svg';
import { ReactComponent as Medicine } from '../../assets/icon-medicine.svg';
import { ReactComponent as Schedule } from '../../assets/icon-schedule.svg';
import { ReactComponent as Symptoms } from '../../assets/icon-symptons.svg';
import { ReactComponent as Tele } from '../../assets/icon-tele.svg';
import { ReactComponent as VitalSigns } from '../../assets/icon-vital-signs.svg';

interface IMenuItem {
  key: string;
  title: string;
  Icon: any;
}

const items: IMenuItem[] = [
  { key: 'consulta', title: 'Consulta', Icon: Tele },
  { key: 'chat', title: 'Chat', Icon: Chat },
  { key: 'agenda', title: 'Agenda', Icon: Schedule },
  // { key: 'sintomas', title: 'Sintomas', Icon: Symptoms },
  // { key: 'sinais-vitais', title: 'Sinais Vitais', Icon: VitalSigns },
  // { key: 'medicamentos', title: 'Medicamentos', Icon: Medicine },
];

export default function MenuTab() {
  const [value, setValue] = useState<any>();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(newValue);
  };
  const isSmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg'),
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'fixed',
        display: 'flex',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          paddingTop: 10,
          borderColor: 'divider',
          width: { lg: 150, md: 120 },
        }}
      >
        {items.map(({ key, title, Icon }: IMenuItem) => (
          <Tab
            key={key}
            icon={<Icon width={isSmall ? 30 : 40} height={isSmall ? 30 : 40} />}
            label={title}
            value={key}
            sx={{ paddingBottom: 2, fontSize: { lg: 12, md: 10, sm: 10 } }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
