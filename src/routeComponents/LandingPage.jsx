import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar';
import { genM } from '../util/mFunctions';
import { mnemonicToSeed } from "bip39";
import { useDispatch } from "react-redux";
import { saveMnemonicAndSeed } from '../RTK/features/utilSlice';

import {
    AddSolWallet, 
    AddEthWallet,
    
  } from "../components/cIndex"
  import { useNavigate } from "react-router-dom";
  

function LandingPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState("");
  const [seed, setSeed] = useState("")
  const [walletType, setWalletType] = useState("")


  // const [wallet,setWallet] = useState("AddSolWallet");

  // const walletComponents = {
  //   AddEthWallet: AddEthWallet,
  //   AddSolWallet: AddSolWallet,
  // };

  // const SelectedWalletComponent = wallet ? walletComponents[wallet] : null;

 
 
  
  useEffect(() => {
    if (mnemonic && seed) {
      // Dispatch the thunk instead of individual actions
      dispatch(saveMnemonicAndSeed(mnemonic, seed));
      
      // Navigate based on selected wallet type after dispatching
      navigate(walletType === "eth" ? "/ethWallet" : "/solWallet");
    }
  }, [mnemonic, seed, walletType, dispatch, navigate]);


  const genMenmonic = async (type) => {
    const newMnemonic = genM(); // Generate a new mnemonic
    setMnemonic(newMnemonic); // Update state
    const m2seed = await mnemonicToSeed(newMnemonic); // Convert to seed
    const seedHex = m2seed.toString("hex");
    setSeed(seedHex);
    setWalletType(type);

    // ------- Logs -------
    // console.log("mnemonic --->\n", newMnemonic);
    // console.log("m2seed --->\n", m2seed);
    // console.log("seed --->\n", seedHex);
  };

  return (
    <>
      <Container>
        <Navbar/>

        {/* <WalletRender>

          <SelectTag>
          <label htmlFor="walletSelect" className='text-slate-50 '>Choose Wallet:</label>

          <select id="walletSelect" onChange={(e) => setWallet(e.target.value)}>
            <option value="AddSolWallet" defaultValue>Solana Wallet</option>
            <option value="AddEthWallet">Ethereum Wallet</option>
          </select>
          </SelectTag>

          {SelectedWalletComponent && <SelectedWalletComponent />}
        </WalletRender> */}

        <GettingStarted>

          <main>
            <h1>Welcome to a new cryber wallet</h1>
            <h1>Select  one to create a wallet</h1>
            <Buttons>
              
              <button onClick={() => { genMenmonic("eth") }}>
                Ethereum
              </button>
              <button onClick={()=>{ genMenmonic("sol") }}>
                Solana
              </button>
            </Buttons>
          </main>
        </GettingStarted>
      </Container>
    </>
  )
}


const Container = styled.div`
  height: auto;
  min-height: 100dvh;
  width: 100dvw;
  background-color: rgb(15, 15, 15);
  display: flex;
  /* justify-content: center; */
  flex-direction:column;
  align-items: center;
  color: aliceblue;
`;

// const SelectTag = styled.div`
//   margin-top: 30px;
//   height: auto;
//   width: 100%;
//   /* border: 1px solid red; */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   text-align: left;

//   label{
//     width: 80%;
//     padding:7px;
//     font-size: large;
//   }
//   select{
//     height: 35px;
//     border-radius: 12px;
//     padding-inline:15px;
//     width: 80%;
//     cursor: pointer;
//     color: aliceblue;
//     background-color: rgb(25,25,25);
//     border: 1.8px solid #9c9c9c;

    
//   }
//   option{
//     cursor: pointer;
//   }
// `;

// const WalletRender = styled.div`
//   height: 100%;
//   width: 55%;
//   /* border: 2px solid #ffffff; */
// `;


const GettingStarted = styled.div`
  margin-top: 40px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  main{
    height: 100%;
    width: 85%;
    padding: 20px;
    /* border: 2px solid white; */


    h1{
      font-size: 44px;
      font-weight: 600;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  button{
    /* border: .5px solid whitesmoke; */
    margin-block: 20px;
    /* padding: 12px 38px; */
    height: 48px;
    width: 156px;
    border-radius: 10px;
    background-color: rgb(250,250,250);
    color: rgb(20,20,20);
    font-size: 16px;
    font-weight: 400;

    &:hover{
      background-color: rgb(235,235,235);
    }
  }
`;

export default LandingPage
