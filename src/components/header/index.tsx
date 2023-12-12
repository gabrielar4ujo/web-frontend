import { Link, useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import { AuthRepository } from '../../repositories/auth.repository';
import { useEffect, useState } from 'react';
import { SelfModel } from '../../domain/models/self.model';
import { IAxiosError } from '../../repositories/util.repository';
import toast from 'react-hot-toast';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<SelfModel>();

  function isCurrentPath(path: string) {
    return location.pathname === path;
  }

  const { self } = AuthRepository.useLoginRepository();

  useEffect(() => {
    self()
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .catch((error: IAxiosError) => {
        toast.error(error.response.data['message']);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {user && user.admin && (
            <li
              className={isCurrentPath('/ads-form') ? 'active' : 'not-active'}
            >
              <Link to="/ads-form">Criar Anúncio</Link>
            </li>
          )}
          <li
            className="sign-out"
            onClick={async () => {
              await AuthRepository.removeAuth();
              setTimeout(() => navigate('/'));
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
