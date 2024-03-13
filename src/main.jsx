// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SupabaseProvider } from './Providers/SupabaseProvider.jsx';
import { AuthProvider } from './Providers/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </AuthProvider>
  </React.StrictMode>,
);
