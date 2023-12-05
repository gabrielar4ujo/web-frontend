import React, { useRef, useState } from 'react';
import './index.css';

const ContactUsPage: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>();
  const emailRef = useRef<HTMLInputElement | null>();

  const handleContactUs = () => {
    // TODO: enviar email
    setMessage('');
    setEmail('');
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

  const validateMessage = (input: string): void => {
    if (!input.trim().length) {
      setMessage(undefined);
    } else {
      setMessage(input);
    }
  };

  return (
    <div className="main-container">
      <div className="contact-us-container">
        <h2>Fale Conosco</h2>
        <form>
          <label htmlFor="email">E-mail:</label>
          <input
            ref={(ref) => (emailRef.current = ref)}
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

          <textarea
            placeholder="Escreva sua dúvida, sugestão ou reclamação..."
            rows={10}
            value={message}
            onChange={(e) => {
              // valida a cada caractere digitado se o email é valido
              validateMessage(e.target.value);
            }}
          />

          <br />

          <button
            type="button"
            onClick={handleContactUs}
            className={!email || !message ? 'disable-button' : undefined}
            disabled={!email || !message}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
