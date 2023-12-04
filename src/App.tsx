import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import LoginPage from './pages/login';
import SignUpPage from './pages/sign_up';
import RootLayout from './root';
import { AuthRepository } from './repositories/auth.repository';
import HomePage from './pages/home';

// Seus componentes de página
const About = () => <h2>About</h2>;
const Contact = () => <h2>Contact</h2>;
const NotFound = () => <h2>NotFound</h2>;

const loader = () => {
  // se tiver usuário logado, jogar pra /
  if (AuthRepository.getAuth()) {
    return redirect('/');
  }

  return null;
};
const loader_2 = ({ request }: { request: Request }) => {
  const redirectPath = new URL(request.url).pathname;

  if (redirectPath !== '/') {
    return redirect(`/${redirectPath}`);
  }

  if (!AuthRepository.getAuth()) {
    return redirect('/login');
  }

  return null;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: '/',
    loader: loader_2,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
  {
    element: <RootLayout />,
    path: '/',
    loader: loader,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signUp',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
