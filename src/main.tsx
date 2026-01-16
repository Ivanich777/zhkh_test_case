import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';
import { StoreProvider } from 'stores/storeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
