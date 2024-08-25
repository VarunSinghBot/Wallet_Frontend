import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Container>
      <Card>
        
        <Box>
          <h1>Login</h1>
          <input type="text" placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
          <button>Login</button>
        </Box>

        <Box>
          <h2>No Account?</h2>
          <button onClick={()=> navigate("/signup")}>Signup</button>
        </Box>
      </Card>
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
  flex-direction: column;
`;

const Card =styled.div`
  height: 60%;
  width: 28%;
  min-width: 362px;
  border: 2px solid black;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Box =styled.div`
  height: fit-content;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input,button{
    height: 50px;
    width: 100%;
    border: 2px solid black;
    border-radius: 90px;
    padding-inline: 20px;
    margin-top: 10px;
  }

  h1{
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  
`

export default Login
