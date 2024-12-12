import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';
import './styles/form.css';
import './styles/toast.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: 'toast',
        success: {
          className: 'toast toast-success',
        },
        error: {
          className: 'toast toast-error',
        },
        warning: {
          className: 'toast toast-warning',
        },
        info: {
          className: 'toast toast-info',
        },
      }}
    />
  </StrictMode>
);