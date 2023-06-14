import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from "react-oidc-context";
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const oidcConfig = {
    authority: "http://localhost:4000",
    client_id: "232e3043-6064-443f-830c-c0ad0c4e594e",
    redirect_uri: "http://localhost:3000/",
};

root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);
