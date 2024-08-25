import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


function Navbar() {

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <h1>Web Wallet ~ By ~ Varun</h1>

        <div>
          <h1>Your Name</h1>
          <Login onClick={()=>{ navigate("/login") }}>Login</Login>
          <Logout onClick={()=>{ navigate("/") }}> Logout </Logout>
        </div>
      </Container>
    </>
  )
}


const Container = styled.div`
  padding: 15px 30px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 2px solid #cecdcd;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  

  h1{
    /* font-size: 20r; */
    
  }

  div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap:20px;

  }
`;

const Login = styled.button`
  border: 1.8px solid rgba(114, 144, 252,1);
  background-color: rgba(61, 102, 249,1);
  padding: 6px 30px;
  border-radius: 25px;

  &:hover{
    background-color: rgba(61, 102, 249,.5);
  }
`;

const Logout = styled.button`
  border: 1.8px solid #fc7272;
  background-color: rgb(249, 61, 61);
  padding: 6px 30px;
  border-radius: 25px;

  &:hover{
    background-color: rgba(249, 61, 61,.5);
  }
`;

export default Navbar
