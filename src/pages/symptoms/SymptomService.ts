import { IPatientSymptom } from '../../interfaces/PatientSymptom';
import { Symptom } from '../../interfaces/Symptom';
import Service from '../../services/Service';

const baseUrl = '/symptom';
const baseUrlPatient = '/patient-symptom';

export default class SymptomService extends Service {
  async getSymptoms(): Promise<Symptom[]> {
    return this.sendRequest('GET', baseUrl);
  }

  async getSymptom(symptomId: string): Promise<Symptom> {
    return this.sendRequest('GET', `${baseUrl}/${symptomId}`);
  }

  async insertSymptomRegister(params: IPatientSymptom) {
    return this.sendRequest('POST', baseUrlPatient, params);
  }
}
