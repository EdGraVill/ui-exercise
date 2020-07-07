import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './createStore';

const ReduxProvider: React.FC = ({ children }) => {
  const store = React.useMemo(() => createStore(), []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
