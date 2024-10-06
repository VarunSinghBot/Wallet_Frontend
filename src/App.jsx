import React from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Wallet,
  Login,
  Signup,
  SolWallet,
  EthWallet,
} from "./routeComponents/rIndex"
import LandingPage from './routeComponents/LandingPage';

function App() {

  return (
    <>
     
      
      <Router>
        <Container>
          <Routes>

            {/* Landing Page */}
            < Route path="/" element={<LandingPage />} />

            {/* Login Page */}
            < Route path="/login" element={<Login />} />

            {/* Signup Page */}
            <Route path="/signup" element={<Signup />}/>

            <Route path="/ethWallet" element={<EthWallet />}/>

            <Route path="/solWallet" element={<SolWallet />}/>

          </Routes>
        </Container>
    </Router>
    </>
  )
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

export default App
