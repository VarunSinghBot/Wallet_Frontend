import React from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Wallet,
  Login,
  Signup,
} from "./routCompo/rIndex"

function App() {

  return (
    <>
      <Router>
        <Container>
          <Routes>

            {/* Landing Page */}
            < Route path="/" element={<Wallet />} />

            {/* Login Page */}
            < Route path="/login" element={<Login />} />

            {/* Signup Page */}
            <Route path="/signup" element={<Signup />}/>

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
