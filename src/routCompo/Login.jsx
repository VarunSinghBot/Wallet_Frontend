import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [toggle, setToggele] = useState(true);


  const icon = toggle ? 
  (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#292929">
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
    </svg>
  )
  :
  (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );


  const navigate = useNavigate();

  return (
    <>
      <Container>
      <Card>
        
        <Box>
          <h1>Login</h1>
          <input type="text" id="username" placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)}/>
          <span>
            <input id='password' type={toggle? "password" : "text"} placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <button className='icon' onClick={()=> setToggele(!toggle)}>{icon}</button>
          </span>
          <button id="login">Login</button>
        </Box>

        <Box>
          <h2>No Account?</h2>
          <button id="signup" onClick={()=> navigate("/signup")}>Signup</button>
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
  background: linear-gradient(60deg, #0081a7, #00afb9, #fed9b7, #f07167);
`;

const Card =styled.div`
  height: 60%;
  width: 28%;
  min-width: 362px;
  border: 2px solid black;
  border-radius: 10px;

  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.57 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );

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

  #username,button,span{
    height: 50px;
    width: 100%;
    border: 2px solid black;
    border-radius: 90px;
    padding-inline: 20px;
    margin-top: 10px;
    
  }

  #login{
    background: linear-gradient(45deg, #14a468, #68ffc8);
    border: 2px solid #118655;
  }

  #signup{
    /* background: linear-gradient(75deg, #0600ff 10%, #00f4fd 90%); */
    background: linear-gradient(50deg, #fed9b7 , #f07167 );
    /* filter: blur(1px); */
    border: 2px solid linear-gradient(50deg, #0081a7 20%, #00afb9 40%, #fed9b7 , #f07167 );
  }

  #username, #password{
    background-color: transparent;

    &:focus{
      outline: none;
    }
  }

  span{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    outline: none;

    .icon{
      height: 45px;
      width: fit-content;

      border: none;
      margin: 0;
    }

    
  }

  #password{
    /* border: 1px solid cyan; */
    margin: 0;
    height: 45px;
    width: 85%;
    padding-inline: 20px 5px;
    border-radius: 90px;
  }

  h1{
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
  }

`

export default Login
