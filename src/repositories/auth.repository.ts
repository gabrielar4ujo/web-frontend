import axios from 'axios';
import { SelfModel } from '../domain/models/self.model';
import { SelfEntity } from '../domain/entities/self.entity';

export const AUTH_STORAGE_KEY = 'AUTH';

export interface Auth {
  token: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

function persistAuth(auth: Auth): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

function getAuth(): Auth | undefined {
  const auth = localStorage.getItem(AUTH_STORAGE_KEY);
  return auth ? JSON.parse(auth) : undefined;
}

async function removeAuth(): Promise<void> {
  return await localStorage.removeItem(AUTH_STORAGE_KEY);
}

const useLoginRepository = () => {
  async function login({ email, password }: ILoginUser) {
    return await axios.post(`/login`, {
      email: email,
      senha: password,
    });
  }

  async function self(): Promise<SelfModel | null> {
    const res = await axios.get(`/self`);

    if (res.data) {
      return SelfModel.decoder(res.data as SelfEntity);
    }

    return null;
  }
  return { login, self };
};

export const AuthRepository = {
  persistAuth,
  getAuth,
  removeAuth,
  useLoginRepository,
};
