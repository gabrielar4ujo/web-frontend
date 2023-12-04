import { useNavigate } from 'react-router-dom';
import { AuthRepository } from '../../repositories/auth.repository';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          AuthRepository.removeAuth();
          navigate('/');
        }}
      >
        SAIR
      </button>
      <button
        onClick={() => {
          AuthRepository.removeAuth();
          navigate('/about');
        }}
      >
        ABOUT
      </button>
      <button
        onClick={() => {
          AuthRepository.removeAuth();
          navigate('/contact');
        }}
      >
        CONTACT
      </button>
    </div>
  );
};

export default HomePage;
