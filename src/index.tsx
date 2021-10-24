import React, { createContext } from 'react';

import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import './index.scss';
import history from './utils/history';
import { IFirebaseContext, auth, analytics, app, db } from './firebaseSetup';
import App from './App';

export const FirebaseContext = createContext<IFirebaseContext>({ app, auth, db, analytics });

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <FirebaseContext.Provider value={{ app, auth, db, analytics }}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
