import { Outlet } from 'react-router-dom';
import Header from './components/header';
import './root.css';
import { AuthRepository } from './repositories/auth.repository';

export default function RootLayout() {
  const isLogged = AuthRepository.getAuth();

  return (
    <div className="root">
      {isLogged && <Header />}
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}
