import { BrowserRouter, Route, Routes } from 'react-router-dom';
import External from '../components/templates/External';
import NewUser from '../pages/user/NewUser';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import Home from '../pages/home/Home';
import Schedule from '../pages/schedule/Schedule';
import Appointment from '../pages/appointment/Appointment';
import Chat from '../pages/chat/Chat';
import NoMatch from '../components/molecules/NoMatch';
import ResendMailConfirmation from '../pages/user/ResendMailConfirmation';
import AppointmentSelectDate from '../pages/appointment/AppointmentSelectDate';
import TeleAttendance from '../pages/teleAttendance/TeleAttendance';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="external" element={<External />}>
        <Route path="new-user" element={<NewUser />} />
        <Route
          path="resend-mail-avalidation"
          element={<ResendMailConfirmation />}
        />
      </Route>
      <Route path="/main" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="agenda" element={<Schedule />} />
        <Route path="consulta" element={<Appointment />} />
        <Route
          path="consulta/seleciona/:professionalId"
          element={<AppointmentSelectDate />}
        />
        <Route path="chat" element={<Chat />} />
        <Route path="tele-atendimento/:appointmentId" element={<TeleAttendance />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
