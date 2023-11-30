import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/auth';

// Seus componentes de página
const About = () => <h2>About</h2>;
const Contact = () => <h2>Contact</h2>;
const NotFound = () => <h2>NotFound</h2>;

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
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
