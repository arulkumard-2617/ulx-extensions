import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import './theme/tokens.css';
import './theme/components.css';
import './styles/index.css';
import App from './App.jsx';
import { listenParentTheme } from './theme/theme.js';

// Sync theme from Backstage parent when embedded in iframe
listenParentTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
