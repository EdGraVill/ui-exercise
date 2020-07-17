import * as React from 'react';
import { Nav } from './Nav';
import { MailList, Mail } from './Mail';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => (
  <Nav>
    <Switch>
      <Route path="/mail/:id" component={Mail} />
      <Route component={MailList} />
    </Switch>
  </Nav>
);

export default App;
