import React, { useState } from 'react';
import './index.css';
import PasswordInput from '../../components/password_input';
import { useRegisterRepository } from '../../repositories/user.repository';
import { IAxiosError } from '../../repositories/util.repository';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState('admin');
  const { registerUser } = useRegisterRepository();
  const navigate = useNavigate();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSignUp = () => {
    registerUser({
      email: email!,
      password: password!,
      isAdmin: selectedOption === 'admin',
    })
      .then(() => {
        toast.success('Usuário criado com sucesso!');
        navigate('/login');
      })
      .catch((result: IAxiosError) => {
        toast.error(result.response.data['message']);
      });
  };

  const validateEmail = (input: string): void => {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setEmail(undefined);
      setEmailError('Por favor, insira um e-mail válido');
    } else {
      setEmail(input);
      setEmailError('');
    }
  };

  const validatePassword = (input: string): void => {
    if (input?.length < 8) {
      setPassword(undefined);
      setPasswordError('Senha deve ter mais de 8 dígitos');
    } else {
      setPassword(input);
      setPasswordError('');
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Registrar novo usuário</h2>
        <form>
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
          <div>
            <PasswordInput
              onChange={(e) => {
                // valida a cada caractere digitado se a senha é valida
                validatePassword(e.target.value);
              }}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                value="admin"
                checked={selectedOption === 'admin'}
                onChange={handleOptionChange}
              />
              Administrador
            </label>

            <label>
              <input
                type="radio"
                value="client"
                checked={selectedOption === 'client'}
                onChange={handleOptionChange}
              />
              Cliente
            </label>
          </div>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={!email || !password}
            className={!email || !password ? 'disable-button' : undefined}
          >
            Criar Conta
          </button>

          <div className="divider" />

          <a href="/login">Voltar para login</a>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
