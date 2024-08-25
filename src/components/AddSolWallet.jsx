import React, { useEffect } from 'react';
import { useState } from 'react'
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { genM } from "../util/mFunctions.js"

import styled from "styled-components"

function AddSolWallet() {

//   useEffect((setMnemonic)=>{
//     setMnemonic(genM());
//   },[]);

    
  
  const [mnemonic, setMnemonic] = useState("");
  const [currentIndex,setCurrentIndex] = useState(0);
  const [publicKeys,setPublicKeys] = useState([])

  const onClickFunction = async () => {
    setMnemonic(genM());
    const seed = await mnemonicToSeed(mnemonic);
    console.log("Seed ---->\n", seed.toString("hex"));
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  }

  return (
    <>
      <Container>
        <button onClick={onClickFunction}>
            Add wallet
        </button>
        <KeyConatiner>
            {publicKeys.map(p => 
            <KeyBox>
                {p.toBase58()}
            </KeyBox>
            )}
        </KeyConatiner>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  background-color: rgb(20,20,20);
  color: #d5d5d5;


  button{
    margin-top: 40px;
    border: 2px solid #d5d5d5;
    height: 40px;
    width: 120px;
    padding: 3px 6px;
    border-radius: 12px;
    background-color: rgb(20,20,20);
    color: #d5d5d5;
    font-size: 13.5px;

      &:hover{
        background-color: rgb(30, 30, 30)
      }
    }
`;

const KeyConatiner = styled.div`
  margin-top: 20px;
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap:4px;
`;

const KeyBox = styled.div`
  height: 40px;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding-inline: 12px;
  border: 2px solid #b3b3b3;
  border-radius: 10px;
`;

export default AddSolWallet
