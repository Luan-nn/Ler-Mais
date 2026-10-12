import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Estante from './pages/Estante.jsx';
import Login from './pages/Login.jsx';
import Livro from './pages/Livro.jsx';
import ProgressoLeitura from './pages/ProgressoLeitura.jsx';
import Temporizador from './pages/Temporizador.jsx';

const pages = {
  estante: Estante,
  login: Login,
  livro: Livro,
  progressoLeitura: ProgressoLeitura,
  temporizador: Temporizador,
};

const rootElement = document.getElementById('root');
const pageName = rootElement?.dataset.page;
const Page = pages[pageName];

if (!rootElement || !Page) {
  throw new Error(`Página React não encontrada: ${pageName ?? 'sem identificador'}`);
}

createRoot(rootElement).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
