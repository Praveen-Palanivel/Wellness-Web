import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Authentication from './components/Authentication.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QRScanner from './components/QRScanner.jsx';
import Migrant from './components/Migrant.jsx';
import DoctorHome from './components/Doctor.jsx';
import HealthOfficialHome from './components/HealthOfficial.jsx';
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path : "/login",
    element : <Authentication />,
  },
  {
    path : "/qr",
    element : <QRScanner />,
  },
  {
    path : "/migrant",
    element : <Migrant/>,
  },
  {
    path : "/doctor",
    element : <DoctorHome/>,
  },
  {
    path : "/health",
    element : <HealthOfficialHome/>,
  }
]);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);