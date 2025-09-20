import 'modern-normalize';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ModalFormPage from './ModalFormPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalFormPage />
  </StrictMode>,
);
