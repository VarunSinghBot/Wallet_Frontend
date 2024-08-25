import React from 'react'
import styled from 'styled-components'

function Login() {
  return (
    <>
      <Container>
        <h1>Login Page</h1>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Login
