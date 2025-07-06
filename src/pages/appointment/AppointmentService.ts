import { IProfessional } from '../../interfaces/Professional';
import Service from '../../services/Service';

export default class AppointmentService extends Service {
  async getProfessionals(): Promise<IProfessional[]> {
    const res = await this.sendRequest('GET', '/professional');
    return res;
  }

  async saveAppointment(params: any) {
    const res = await this.sendRequest('PATCH', '/appointment/patient', params);
    return res;
  }

  async getCustomerAppointment() {
    const res = await this.sendRequest(
      'GET',
      '/appointment',
    );
    console.log({ res });
    return res;
  }

  async getAppointmentByProfessional(professionalId: string) {
    const res = await this.sendRequest(
      'GET',
      `/appointment/professional/${professionalId}`,
    );
    console.log({ res });
    return res;
  }
}
