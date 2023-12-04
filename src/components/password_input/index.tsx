import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ onChange }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <input
        placeholder="sua@senha"
        type={showPassword ? 'text' : 'password'}
        id="password"
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="eye-icon"
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default PasswordInput;
