import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import './theme/tokens.css';
import './theme/components.css';
import './styles/index.css';
import WelcomeWidget from './WelcomeWidget.jsx';
import { listenParentTheme } from './theme/theme.js';

listenParentTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <WelcomeWidget />
    </PrimeReactProvider>
  </StrictMode>,
);
