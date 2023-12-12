import React, { useState } from 'react';
import './index.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PasswordInput from '../../components/password_input';
import { AuthRepository } from '../../repositories/auth.repository';
import { IAxiosError } from '../../repositories/util.repository';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = AuthRepository.useLoginRepository();

  const handleLogin = () => {
    login({ email: email!, password: password! })
      .then((res) => {
        AuthRepository.persistAuth({ token: res.data['token'] });
        const param = searchParams.get('redirect');
        if (param) {
          navigate(param);
        } else {
          navigate('/');
        }
      })
      .catch((res: IAxiosError) => {
        toast.error(res.response.data['message']);
      });
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleContactUs = () => {
    navigate('/contact-us-no-user');
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

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="email">E-mail:</label>
          <input
            placeholder="email@email.com"
            type="email"
            id="email"
            onChange={(e) => {
              // valida a cada caractere digitado se o email é valido
              validateEmail(e.target.value);
            }}
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">Senha:</label>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} />

          <button
            type="submit"
            className={!email || !password ? 'disable-button' : undefined}
            disabled={!email || !password}
          >
            Login
          </button>

          <div className="divider" />

          <button type="button" onClick={handleSignUp}>
            Cadastrar Conta
          </button>

          <div className="divider" />

          <button type="button" onClick={handleContactUs}>
            Entrar em Contato
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
