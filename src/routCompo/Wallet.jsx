import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';

import {
    AddSolWallet, 
    AddEthWallet,
    
  } from "../components/cIndex"
  

function Wallet() {

  const [wallet,setWallet] = useState("AddSolWallet");

  const walletComponents = {
    AddSolWallet: AddSolWallet,
    AddEthWallet: AddEthWallet,
  };

  const SelectedWalletComponent = wallet ? walletComponents[wallet] : null;

  

  return (
    <>
      <Container>
        <Navbar/>
        <WalletRender>

          <SelectTag>
          <label htmlFor="walletSelect" className='text-slate-50 '>Choose Wallet:</label>

          <select id="walletSelect" onChange={(e) => setWallet(e.target.value)}>
            <option value="AddSolWallet" selected>Solana Wallet</option>
            <option value="AddEthWallet">Ethereum Wallet</option>
          </select>
          </SelectTag>

          {SelectedWalletComponent && <SelectedWalletComponent />}
        </WalletRender>
      </Container>
    </>
  )
}


const Container = styled.div`
  height: auto;
  min-height: 100dvh;
  width: 100dvw;
  background-color: rgb(20,20,20);
  display: flex;
  /* justify-content: center; */
  flex-direction:column;
  align-items: center;
`;

const SelectTag = styled.div`
  margin-top: 30px;
  height: auto;
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;

  label{
    width: 80%;
    padding:7px;
    font-size: large;
  }
  select{
    height: 35px;
    border-radius: 12px;
    padding-inline:15px;
    width: 80%;
    cursor: pointer;
    color: aliceblue;
    background-color: rgb(25,25,25);
    border: 1.8px solid #9c9c9c;

    
  }
  option{
    cursor: pointer;
  }
`;

const WalletRender = styled.div`
  height: 100%;
  width: 55%;
  border: 2px solid #ffffff;
`;


export default Wallet
