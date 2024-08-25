import React, { useState } from 'react'
import styled from 'styled-components'

import {
    AddSolWallet, 
    AddEthWallet,
    
  } from "../components/cIndex"
  

function Wallet() {

  const [wallet,setWallet] = useState("");

  const walletComponents = {
    AddSolWallet: AddSolWallet,
    AddEthWallet: AddEthWallet,
  };

  const SelectedWalletComponent = wallet ? walletComponents[wallet] : null;

  

  return (
    <>
      <Container>
        <WalletRender>

          <label htmlFor="walletSelect">Choose Wallet:</label>

          <select id="walletSelect" onChange={(e) => setWallet(e.target.value)}>
            <option value="">Select Wallet</option>
            <option value="AddSolWallet">Solana Wallet</option>
            <option value="AddEthWallet">Ethereum Wallet</option>
          </select>


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
  justify-content: center;
  /* align-items: center; */
`;

const WalletRender = styled.div`
  height: 100%;
  width: 55%;
  border: 2px solid #ffffff;
`;


export default Wallet
