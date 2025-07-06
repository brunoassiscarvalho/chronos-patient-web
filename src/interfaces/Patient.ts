
export interface IPatientBasic {
  urlImage?:string;
  name: string;
  email: string;
}

export interface IPatientLogged extends IPatientBasic {
  token: string;
}

export interface IPatientSecurity {
  email: string;
  password: string;
}

export interface IPatientRegister extends IPatientBasic, IPatientSecurity {
  cep: number;
  phone: number;  
}

export interface IPatientBasicData {
  _id:any;
  name: string;
}


