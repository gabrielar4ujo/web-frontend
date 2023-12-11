import axios from 'axios';

interface IRegisterUser {
  email: string;
  password: string;
  isAdmin: boolean;
  name: string;
}

const useRegisterRepository = () => {
  async function registerUser({
    email,
    password,
    isAdmin,
    name,
  }: IRegisterUser): Promise<any> {
    return axios.post(`/register`, {
      email: email,
      senha: password,
      admin: isAdmin,
      nome: name,
    });
  }
  return { registerUser };
};

export { useRegisterRepository };
