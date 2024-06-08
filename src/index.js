import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModelsProvider } from 'hooks/useModels';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModelsProvider>
      <App />
    </ModelsProvider>
  </React.StrictMode>
);
