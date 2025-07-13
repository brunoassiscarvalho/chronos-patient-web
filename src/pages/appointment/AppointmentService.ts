import { IAppointment } from '../../interfaces/Appointment';
import { IProfessional } from '../../interfaces/Professional';
import Service from '../../services/Service';

export default class AppointmentService extends Service {
  async getProfessionals(): Promise<IProfessional[]> {
    const res = await this.sendRequest('GET', '/professional');
    return res;
  }

  async getProfessional(professionalId: string): Promise<IProfessional[]> {
    const res = await this.sendRequest(
      'GET',
      `/professional/${professionalId}`,
    );
    return res;
  }

  async bookAppointment(params: IAppointment) {
    const res = await this.sendRequest('POST', '/appointment/patient', params);
    return res;
  }

  async cancelAppointment(params: IAppointment) {
    const res = await this.sendRequest(
      'DELETE',
      '/appointment/patient',
      params,
    );
    return res;
  }

  async getCustomerAppointment() {
    const res = await this.sendRequest('GET', '/appointment');
    return res;
  }

  async getAppointmentByProfessional(professionalId: string) {
    const res = await this.sendRequest(
      'GET',
      `/appointment/professional/${professionalId}`,
    );
    return res;
  }

  async getAppointment(appointmentId: string): Promise<IAppointment> {
    const res = await this.sendRequest('GET', `/appointment/${appointmentId}`);
    return res;
  }
}
