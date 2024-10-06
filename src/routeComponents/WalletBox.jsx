import React, { useState } from 'react'
import styled from 'styled-components';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';


function WalletBox({ walletNo, publicKey, privateKey, onDelete, }) {

  const [myTog, setMyTog] = useState(true);


  const icon = myTog ? 
  (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF">
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

  const copyToClipboard = async (item) => {
    try {
      await navigator.clipboard.writeText(item);
      // toast.success("Text copied to clipboard!",{ className: 'toast-success' });
      toast.success('Text copied to clipboard!', {
        style: {
          border: '1px solid #ffffff',
          padding: '16px',
          color: '#000000',
        },
        iconTheme: {
          primary: '#000000',
          secondary: '#FFFAEE',
        }
      });
    } catch (err) {
      // toast.error("Couldn't copy text", { className: 'toast-error' });
      toast.error("Couldn't copy text");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Container>
      {/* <ToastContainer position="bottom-right" autoClose={1600} /> */}

      {/* <Toaster position="bottom-right" reverseOrder={false}/> */}

      <Header>
        <h1>Wallet {walletNo}</h1>

        <Bin onClick={()=> { onDelete(walletNo)}}>
          <img src="/bin-icon.svg" alt="bin icon"/>
        </Bin>
      </Header>
      <InnerContainer>
        <label htmlFor="pubKey"> Public Key </label>
          <First>
            <input type="text" readOnly value={publicKey} id='pubKey' onClick={()=>{copyToClipboard(publicKey)}}/>
          </First>
          
        

        <label htmlFor="priKey"> Private Key</label>
          <Second>
            <input type={myTog ? "password": "text"} readOnly value={privateKey} id='priKey' onClick={()=>{copyToClipboard(privateKey)}}/>
            <Eye onClick={() => setMyTog(!myTog)}>{icon}</Eye>
          </Second>
        
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  height: auto;
  width: auto;
  border:1px solid rgba(255,255,255,0.05);
  border-radius:8px;
  background-color: rgba(255,255,255,0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;


  &:hover{
    background-color: rgba(255,255,255,0.05);
  }

  
`;

const Header = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1{
    width: 100%;
    height: 20%;
    padding:12px;
    font-size: 28px;
    display: flex;
    align-items: center;
    /* border:1px solid red; */
  }
`

const Bin = styled.div`
  height: 42px;
  width: 42px;
  background-color: rgba(255, 0, 0, 0.78);
  cursor: pointer;
  padding:10px;
  margin-inline:12px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    background-color: rgba(255, 0, 0, 1);
  }

`;

const InnerContainer = styled.div`
  height: 80%;
  width: 100%;
  background-color: rgba(255,255,255,.1);
  border-radius: 24px 24px 0 0 ;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;


  label{
    height: auto;
    width: 100%;
    font-size: 24px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const Eye = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover{
    background-color: rgba(255,255,255,.1);
  }
`;

const First = styled.div`
  height: auto;
  width: 100%;
  color: aliceblue;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  /* align-items: flex-start; */
  justify-content: center;
  flex-direction: column;

  input{
    height: 40px;
    width: 95%;
    background-color: transparent;
    color: aliceblue;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    outline: none;
    padding-left: 4px;
  }
`

const Second = styled.div`
  height: auto;
  width: 100%;
  color: aliceblue;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input{
    height: 40px;
    width:95%;
    background-color: transparent;
    color: aliceblue;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    outline: none;
    padding-left: 4px;
  }
`;



export default WalletBox
