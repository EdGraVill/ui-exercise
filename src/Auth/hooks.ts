import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './slicer';
import { isAuthLoadingSelector, authErrorSelector } from './selectors';

interface UseAuthReturn {
  error: string | null;
  isLoading: boolean;
  loginFunction: (email: string) => void;
  logoutFunction: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();

  const error = useSelector(authErrorSelector);

  const clearError = React.useCallback(() => {
    dispatch(authActions.removeError());
  }, [dispatch]);

  const isLoading = useSelector(isAuthLoadingSelector);

  const loginFunction = React.useCallback((email: string) => {
    const formatedEmail = email.includes('@') ? email : `${email}@salesloft.com`;

    dispatch(authActions.login(formatedEmail));
  }, [dispatch]);

  const logoutFunction = React.useCallback(() => {
    dispatch(authActions.restoreDefault());
  }, [dispatch]);

  return {
    error,
    clearError,
    isLoading,
    loginFunction,
    logoutFunction,
  };
}
