import axios from 'axios';

interface IRegisterUser {
  email: string;
  password: string;
  isAdmin: boolean;
}

const useRegisterRepository = () => {
  async function registerUser({
    email,
    password,
    isAdmin,
  }: IRegisterUser): Promise<any> {
    return axios.post(`/register`, {
      email: email,
      senha: password,
      admin: isAdmin,
    });
  }
  return { registerUser };
};

export { useRegisterRepository };
