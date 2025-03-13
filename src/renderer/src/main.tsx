import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from '@renderer/App';
import { Footer } from '@renderer/components/footer';
import { Header } from '@renderer/components/header';
import { ThemeProvider } from '@renderer/components/providers/theme-provider';
import { Toaster } from '@renderer/components/ui/sonner';

import '@renderer/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <Header />
      <App />
      <Footer />
      <Toaster position="bottom-left" className="pointer-events-auto" />
    </ThemeProvider>
  </StrictMode>,
);
