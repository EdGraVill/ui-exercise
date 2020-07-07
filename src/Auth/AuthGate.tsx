import * as React from 'react';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from './selectors';
import LoginPage from './LoginPage';

const AuthGate: React.FC = ({ children }) => {
  const isLogged = useSelector(isLoggedSelector);

  if (!isLogged) {
    return <LoginPage />
  }

  return <>{children}</>;
};

export default AuthGate;
