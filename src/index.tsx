import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import { SearchProvider } from './context/SearchContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <Layout />
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
