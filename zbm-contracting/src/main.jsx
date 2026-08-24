import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './hooks/useLanguage.jsx';
import App from './App';

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
