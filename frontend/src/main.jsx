// src/main.jsx
import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthState from './context/AuthState';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID; // ensure you set this in frontend .env if using Google

const RootApp = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // render without provider during initial mount to avoid tricky double-unmounts
    return (
      <AuthState>
        <App />
      </AuthState>
    );
  }

  // after client mount, render provider-wrapped app
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthState>
        <App />
      </AuthState>
    </GoogleOAuthProvider>
  );
};

const root = createRoot(document.getElementById('root'));

// In dev we avoid StrictMode to reduce double-mount/unmount cycles (library incompatibilities).
if (import.meta.env.DEV) {
  root.render(<RootApp />);
} else {
  root.render(
    <StrictMode>
      <RootApp />
    </StrictMode>
  );
}
