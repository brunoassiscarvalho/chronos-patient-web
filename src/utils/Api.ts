import { IPatientLogged, IPatientSession } from '../interfaces/Patient';
import { localUserStorage } from './Constants';

const getSession: any = () => {
  try {
    const session = sessionStorage.getItem(localUserStorage);
    if (session) {
      const { token, ...user } = JSON.parse(session);

      return { user, token };
    }
  } catch (error) {
    return null;
  }
};

export const setSession: (user: IPatientSession) => void = (
  user: IPatientSession,
) => {
  sessionStorage.setItem(localUserStorage, JSON.stringify(user));
};

export const getToken: () => string | null = () => {
  return getSession()?.token;
};

export const getUser: () => IPatientLogged = () => {
  return getSession()?.user;
};
