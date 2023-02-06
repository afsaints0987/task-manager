import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {UserProvider} from './context/UserContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);

