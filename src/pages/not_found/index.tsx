import { Link } from 'react-router-dom';
import './index.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h2>Página não Encontrada</h2>
      <p>
        A página que você está procurando não existe. Ir para a{' '}
        <Link to={'/'}>Home</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
