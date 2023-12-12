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
import AdsFormPage from './pages/ads_form';
import axios from 'axios';

const AuthLoader = () => {
  // se tiver usuário logado, jogar pra '/'
  if (AuthRepository.getAuth()) {
    return redirect('/');
  }

  return null;
};

const HomeLoader = () => {
  const auth = AuthRepository.getAuth();
  if (!auth) {
    return redirect('/login');
  }

  axios.defaults.headers.common['Authorization'] = auth.token;

  return null;
};

const AdsFormLoader = async () => {
  const { self } = AuthRepository.useLoginRepository();
  return self()
    .then((res) => {
      if (!res?.admin) {
        return redirect('/');
      }
      return null;
    })
    .catch(() => redirect('/'));
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
        path: '/ads',
        element: <AdsPage />,
      },
      {
        path: '/contact-us',
        element: <ContactUsPage isLogged={true} />,
      },
      {
        path: '/ads-form',
        element: <AdsFormPage />,
        loader: AdsFormLoader,
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
      {
        path: '/contact-us-no-user',
        element: <ContactUsPage isLogged={false} />,
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
