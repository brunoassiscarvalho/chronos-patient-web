import Service from '../../services/Service';

interface ILoginService {
  email: string;
  password: string;
}

export default class LoginService extends Service {
  async login(params: ILoginService) {
    const res = await this.sendRequest('POST', '/login', params);
    console.log({ res });
    return res;
  }
}
