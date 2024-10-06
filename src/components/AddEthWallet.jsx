import React, { useState } from 'react'
import styled from 'styled-components';
import { genM } from '../util/mFunctions';
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import subWallet from '../ui/subWallet';

function addEthWallet() {

  const [mnemonic, setMnemonic] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const onClickFunction = async () => {
    setMnemonic(genM());
    
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  }



  return (
    <>
      <Container>
        <button onClick={onClickFunction}>
            Add ETH Wallet
        </button>
        <KeyConatiner>
            {addresses.map((p, index) => 
            <KeyBox key={index}>
                {p}
                {/* <subWallet publicKey={p}/> */}
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
    border: 2px solid #b5f795;
    height: 40px;
    width: 120px;
    padding: 3px 6px;
    border-radius: 12px;
    background-color: rgb(88, 234, 68);
    color: #3a3a3a;
    font-size: 13.5px;

      &:hover{
        background-color: rgba(88, 234, 68,.5);
        color: #fff;
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
  height: auto;
  min-height: 40px;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding-inline: 12px;
  border: 2px solid #b3b3b3;
  border-radius: 10px;
`;

export default addEthWallet
