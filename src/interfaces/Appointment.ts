import { IProfessional } from './Professional';
import { IPatientBasicData } from './Patient';

// export interface IAppointmentData {

// }
// export interface IAppointment<T> {
//   title: string;
//   start: Date;
//   end: Date;
//   resource: T;
// }

export interface IAppointment {
  _id?:string;
  title: string;
  start: Date;
  end: Date;
  professional: IProfessional;
  patient: IPatientBasicData;
  status: string;
}
