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
import AppointmentCalendar from '../pages/appointment/AppointmentCalendar';
import TeleAttendance from '../pages/teleAttendance/TeleAttendance';
import SymptomsGrid from '../pages/symptoms/SymptomsGrid';
import SymptomsFormDetail from '../pages/symptoms/SymptomsFormDetail';
import Profile from '../pages/user/Profile';
import UserPassword from '../pages/user/UserPassword';
import UserEmail from '../pages/user/UserEmail';
import UserFormComplement from '../pages/user/UserFormComplement';
import UpdateMailConfirmation from '../pages/user/UpdateMailConfirmation';
import AppointmentDetailContent from '../pages/appointment/AppointmentDetailContent';
import ChangeImage from '../pages/user/ChangeImage';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<External />}>
        <Route index element={<Login />} />

        <Route path="new-user" element={<NewUser />} />
        <Route
          path="resend-mail-avalidation"
          element={<ResendMailConfirmation />}
        />
        <Route
          path="email-change-confirmation"
          element={<UpdateMailConfirmation />}
        />
        <Route path="reset-pass" element={<UserPassword external />} />
      </Route>
      <Route path="/main" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="paciente" element={<Profile />} />
        <Route
          path="paciente/dados-complementar"
          element={<UserFormComplement />}
        />
        <Route path="paciente/mudar-senha" element={<UserPassword />} />
        <Route path="paciente/mudar-email" element={<UserEmail />} />
        <Route path="paciente/imagem" element={<ChangeImage />} />
        <Route path="agenda" element={<Schedule />} />
        <Route path="consulta" element={<Appointment />} />
        <Route
          path="consulta/seleciona/:professionalId"
          element={<AppointmentCalendar />}
        />
        <Route path="sintomas" element={<SymptomsGrid />} />

        <Route path="sintomas/:symptomId" element={<SymptomsFormDetail />} />
        <Route path="chat" element={<Chat />} />
        <Route
          path="tele-atendimento/:appointmentId/ante-sala"
          element={<AppointmentDetailContent />}
        />
        <Route
          path="tele-atendimento/:appointmentId/sala"
          element={<TeleAttendance />}
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
