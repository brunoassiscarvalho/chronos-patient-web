import Service from '../../services/Service';

import {
  IPatientBase,
  IPatientComplement,
  IPatientRegister,
  IUserMailConfirmationForm,
  IUserMailConfirmationService,
  IUserResetPass,
} from '../../interfaces/Patient';

export default class PatientService extends Service {
  private baseUrl = '/patient';

  async createPatient(params: IPatientRegister) {
    return this.sendRequest('POST', this.baseUrl, params);
  }

  async getPatient() {
    return this.sendRequest('GET', this.baseUrl);
  }

  async updatePatientBase(params: IPatientBase) {
    return this.sendRequest('PATCH', this.baseUrl + '/base', params);
  }

  async updatePatientComplement(params: IPatientComplement) {
    return this.sendRequest('PATCH', this.baseUrl + '/complement', params);
  }

  async requestUpdateMail(params: IUserMailConfirmationForm) {
    return this.sendRequest('POST', this.baseUrl + '/email', params);
  }

  async sendUpdateMailConfirmation(params: IUserMailConfirmationService) {
    return this.sendRequest('PATCH', this.baseUrl + '/email', params);
  }

  async resetPass(params: IUserResetPass) {
    return this.sendRequest('POST', this.baseUrl + '/pass', params);
  }

  async sendVerificationMail(params: IPatientRegister) {
    return this.sendRequest(
      'POST',
      this.baseUrl + '/verification-mail',
      params,
    );
  }
}
