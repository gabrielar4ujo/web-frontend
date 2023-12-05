import { Link, useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import { AuthRepository } from '../../repositories/auth.repository';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function isCurrentPath(path: string) {
    return location.pathname === path;
  }

  return (
    <header className="header-container">
      <nav>
        <ul>
          <li className={isCurrentPath('/') ? 'active' : 'not-active'}>
            <Link to="/">Home</Link>
          </li>
          <li className={isCurrentPath('/ads') ? 'active' : 'not-active'}>
            <Link to="/ads">Anúncios</Link>
          </li>
          <li className={isCurrentPath('/about-us') ? 'active' : 'not-active'}>
            <Link to="/about-us">Sobre</Link>
          </li>
          <li
            className={isCurrentPath('/contact-us') ? 'active' : 'not-active'}
          >
            <Link to="/contact-us">Fale Conosco</Link>
          </li>
          <li
            className="sign-out"
            onClick={() => {
              AuthRepository.removeAuth();
              navigate('/');
            }}
          >
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
