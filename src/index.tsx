import * as React from 'react';
import { render } from 'react-dom';
import { ReduxProvider } from './store';
import { AuthGate } from './Auth';
import './fonts/fonts.css';
import { Theme } from './util';
import App from './App';

render(
  <React.StrictMode>
    <ReduxProvider>
      <Theme>
        <AuthGate>
          <App />
        </AuthGate>
      </Theme>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
