import axios from 'axios';

interface IContactUs {
  nome: string;
  email: string;
  telefone: string;
  msg: string;
}

const useContactRepository = () => {
  async function sendEmail({
    nome,
    email,
    telefone,
    msg,
  }: IContactUs): Promise<any> {
    return await axios.post('/entrar-contanto', {
      nome,
      telefone,
      email,
      msg,
    });
  }

  return { sendEmail };
};

export { useContactRepository };
