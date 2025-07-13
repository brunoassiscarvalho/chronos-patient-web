import { Box } from '@mui/material';
import Content from '../../components/organisms/Content';
import { IPatientLogged } from '../../interfaces/Patient';
import { getUser } from '../../utils/Api';

export default function Chat() {
  const { userId, name }: IPatientLogged = getUser();

  return (
    <Content title="Chat" withoutGoBack maxWidth={1200}>
      <Box display="flex" justifyContent="center" width="100%" height="76vh">
        <Box
          component="iframe"
          src={`${process.env.REACT_APP_CHAT_URL}/patient/${userId}/${name}`}
          width="100%"
          height="100%"
          border="none"
          allow="display-capture"
        ></Box>
      </Box>
    </Content>
  );
}
