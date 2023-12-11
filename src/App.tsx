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
import AboutUsPage from './pages/about';
import ContactUsPage from './pages/contact';
import AdsPage from './pages/ads';
import NotFoundPage from './pages/not_found';
import { Toaster } from 'react-hot-toast';

const AuthLoader = () => {
  // se tiver usuário logado, jogar pra /
  if (AuthRepository.getAuth()) {
    return redirect('/');
  }

  return null;
};

const HomeLoader = ({ request }: { request: Request }) => {
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
    loader: HomeLoader,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about-us',
        element: <AboutUsPage />,
      },
      {
        path: '/contact-us',
        element: <ContactUsPage />,
      },
      {
        path: '/ads',
        element: <AdsPage />,
      },
    ],
  },
  {
    element: <RootLayout />,
    path: '/',
    loader: AuthLoader,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
