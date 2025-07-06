import Service from '../../services/Service';

import { IPatientRegister } from '../../interfaces/Patient';

export default class PatientService extends Service {
  private baseUrl = '/patient';

  async createPatient(params: IPatientRegister) {
    console.log({ params });
    const res = await this.sendRequest('POST', this.baseUrl, params);
    return res;
  }

  async sendVerificationMail(params: IPatientRegister) {
    console.log({ params });
    const res = await this.sendRequest(
      'POST',
      this.baseUrl + '/verification-mail',
      params,
    );
    return res;
  }
}
