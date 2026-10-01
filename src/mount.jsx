import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import '@/theme/tokens.css';
import '@/theme/components.css';
import '@/styles/index.css';
import { listenParentTheme } from '@/theme/theme.js';

/**
 * Mount a single page for standalone compile (dist/<page>/).
 * Used by generated entry files under .page-entries/.
 */
export function mountPage(Page) {
  listenParentTheme();
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <PrimeReactProvider>
        <Page />
      </PrimeReactProvider>
    </StrictMode>,
  );
}
