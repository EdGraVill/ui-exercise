import * as React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

const Container = styled.div`
  align-items: stretch;
  background-color: white;
  display: flex;
  flex-direction: row nowrap;
  height: 100vh;
  width: 100vw;
`;

const Children = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  margin-top: 64px;
`;

const Nav: React.FC = ({ children }) => (
  <Container>
    <BrowserRouter>
      <Navbar />
      <Children>{children}</Children>
    </BrowserRouter>
  </Container>
);

export default Nav;
