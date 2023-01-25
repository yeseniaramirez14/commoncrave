import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Modal from 'react-modal';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement(root)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);