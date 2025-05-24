import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import necessary functions from react-router-dom
import './index.css';
import App from './App.jsx';
import HomePage from './components/HomePage.jsx';
import Profile from './components/Profile/Profile.jsx';
import Status from './components/Status/Status.jsx';
import StatusViwer from './components/Status/StatusViwer.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import Signin from './Register/Signin.jsx';
import Signup from './Register/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/status',
    element: <Status />
  },
  {
    path: '/status/:userId',
    element: <StatusViwer />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
      <RouterProvider router={router} /> {/* Provide the router */}
    <App />
  </Provider>
  </StrictMode>
);
