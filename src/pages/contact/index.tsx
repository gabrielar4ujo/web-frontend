import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router';
import { useContactRepository } from '../../repositories/contact.repository';
import toast from 'react-hot-toast';
import { IAxiosError } from '../../repositories/util.repository';
import { AuthRepository } from '../../repositories/auth.repository';

const ContactUsPage = ({ isLogged }: { isLogged: boolean }) => {
  const [email, setEmail] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string>('');
  const [nome, setNome] = useState<string | undefined>();
  const [nomeError, setNomeError] = useState<string>('');
  const [telefone, setTelefone] = useState<string | undefined>();
  const [telefoneError, setTelefoneError] = useState<string>('');
  const { sendEmail } = useContactRepository();
  const { self } = AuthRepository.useLoginRepository();

  const [message, setMessage] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    self()
      .then((res) => {
        if (res?.email) {
          setEmail(res.email);
        }
      })
      .catch();
  });

  const handleContactUs = () => {
    sendEmail({
      email: email!,
      nome: nome!,
      telefone: telefone!,
      msg: message!,
    })
      .then(() => {
        toast.success('E-mail enviado com sucesso');
        navigate('/login');
      })
      .catch((error: IAxiosError) =>
        toast.error(error.response.data['message'])
      );
  };

  const validateEmail = (input: string): void => {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setEmail(undefined);
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
      setEmail(input);
    }
  };

  const validateTelefone = (input: string): void => {
    // Expressão regular para validar o formato do e-mail
    const telefoneRegex = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;
    if (!telefoneRegex.test(input)) {
      setTelefone(undefined);
      setTelefoneError('Por favor, insira um telefone válido.');
    } else {
      setTelefoneError('');
      setTelefone(input);
    }
  };

  const validate = (
    input: string,
    setterValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    setterError?: React.Dispatch<React.SetStateAction<string>> | undefined
  ): void => {
    if (!input.trim().length) {
      setterValue(undefined);
      setterError && setterError('Campo obrigatório');
    } else {
      setterValue(input);
      setterError && setterError('');
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleContactUs();
  };

  return (
    <div className="main-container">
      <div className="contact-us-container">
        <h2>Fale Conosco</h2>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            placeholder="Fulano Silva"
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => {
              validate(e.target.value, setNome, setNomeError);
            }}
          />
          {nomeError && <p className="error-message">{nomeError}</p>}

          <label htmlFor="email">E-mail:</label>
          <input
            placeholder="email@email.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              // valida a cada caractere digitado se o email é valido
              validateEmail(e.target.value);
            }}
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="telefone">Telefone:</label>
          <input
            placeholder="99999999999"
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => {
              validateTelefone(e.target.value);
            }}
          />
          {telefoneError && <p className="error-message">{telefoneError}</p>}

          <textarea
            placeholder="Escreva sua dúvida, sugestão ou reclamação..."
            rows={10}
            value={message}
            onChange={(e) => {
              // valida a cada caractere digitado se o email é valido
              validate(e.target.value, setMessage, undefined);
            }}
          />

          <br />

          <button
            type="submit"
            className={
              !email || !message || !telefone || !nome
                ? 'disable-button'
                : undefined
            }
            disabled={!email || !message || !telefone || !nome}
          >
            Enviar
          </button>

          {!isLogged && (
            <>
              <div className="divider" />

              <button type="button" onClick={handleLogin}>
                Ir para tela de Login
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
