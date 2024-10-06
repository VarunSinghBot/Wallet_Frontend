import React, { useState } from 'react'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletBox from "./WalletBox.jsx"
import Navbar from './Navbar.jsx';
import { Wallet, HDNodeWallet } from "ethers";
import { useSelector } from 'react-redux';


function EthWallet() {

  
  const [currentIndex,setCurrentIndex] = useState(0);
  const [publicKeys,setPublicKeys] = useState([]);

  const seed = useSelector(state => state.util.seed);
  console.log("solWallet S  --->",seed);
  const mnemonic = useSelector(state => state.util.mnemonic);
  console.log("solWallet M  --->",mnemonic);


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Text copied to clipboard!",{ className: 'toast-success' });
    } catch (err) {
      toast.error("Couldn't copy text", { className: 'toast-error' });
      console.error("Failed to copy: ", err);
    }
  };

  function splitStringToArray(inputString) {
    // Split the string by spaces and return the resulting array
    return inputString.split(' ');
  }
  // Example usage
  const resultArray = splitStringToArray(mnemonic);
  console.log(resultArray)


  const onClickAddWalletFunction = async () => {
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
      <Navbar/>
      <ToastContainer position="bottom-right" autoClose={1600} />
      <TopContainer>
      <Top>
        <div>
          Copy your Mnemonics 
        </div>
        <div>
          <span className='arrow'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"  
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round">
              <polyline points="5 8 12 15 19 8"></polyline>
            </svg>
          </span>
        </div>
      </Top>
      
      <Mnemonic>
      {
          resultArray.map((value, index) => (
            <Item 
              key={index}
              onClick={() => copyToClipboard()}
            >
              {value}
            </Item>
          ))
        }
      </Mnemonic>

      <p onClick={()=>copyToClipboard()}>
        <span>
          <img src="/copy-icon.svg" alt="<--Copy Icon-->" width="16" height="16" />
        </span>
        Click to copy
      </p>
      </TopContainer>


      <Heading>
        <h1>
          Ethereum Wallet
        </h1>

        <div>
          <button 
            id='addWallet' 
            onClick={(e)=>{
              e.preventDefault();
              onClickAddWalletFunction();
            }}
          >
            Add Wallet
          </button>
          <button 
            id='delWallets'
            onClick={()=>{
              setPublicKeys([]); // Clear all wallets
              setCurrentIndex(0); // Reset current index
            }}
          >
            Clear Wallets
          </button>
        </div>
      </Heading>
      
      { currentIndex === 0 ? null : (<>
        <KeyContainer>
          {/* {addresses.map((p, index) => 
          <KeyBox key={index}>
              {p}
              <subWallet publicKey={p}/>
          </KeyBox>
          )} */}

          <GridContainer>
            {publicKeys.map((p, index) => 
              <WalletBox
                key={index}
                walletNo = {index+1}
                publicKey = {p}
                privateKey="ndcsuyhc89qwnr0238dnm20389dij2309fm3w80"
              />
            )}
            
           
          </GridContainer>
        </KeyContainer>
      </>)
      }
      
      
    </Container>
  
    </>
    )
}

const Container = styled.div`
  height: 100%;
  min-height: 100dvh;
  width: 100%;
  background-color: rgb(15,15,15);
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  color: #fff;
  padding-bottom: 100px;
`;

const Mnemonic = styled.div`
  height: fit-content;
  width: 85%;
  margin-block: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 80px;
  grid-gap: 12px;
`;

const Item = styled.div`
  background-color: rgba(255,255,255,.04) ;
  border-radius: 8px;
  height:auto;
  width:auto;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  color:#fff;
  font-size:18px;
  font-weight:400;
  padding-left: 12px;
  transition: all .2s;

  &:hover{
    background-color:rgba(255,255,255,.08);
    cursor: pointer;
  }
`;

const Top = styled.div`
  height: auto;
  width: 85%;
  font-size: 32px;
  font-weight: 500;
  border-radius: 8px;
  padding:20px 16px;
  margin-block: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover{
    background-color: rgba(255,255,255,.04);
  }
  
`;

const TopContainer = styled.div`
  margin-top: 40px;
  border: .5px solid rgba(255,255,255,.1);
  border-radius: 12px;
  height: fit-content;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p{
    width: 85%;
    height: 80px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 200;
    margin-top: 5px;
    border-radius: 12px;
    cursor: pointer;

    span{
      margin-inline:10px;
    }
    &:hover{
      background-color:rgba(255,255,255,.05);
    }
  }

  &:hover{
    border: .5px solid rgba(255,255,255,.175);
  }
`;


const Heading = styled.div`
  margin-block: 20px;
  border-radius: 12px;
  height: 120px;
  width: 85%;
  border: .5px solid rgba(255,255,255,.1);

  display: flex;
  align-items: center;
  justify-content: space-between;


  &:hover{
    border: .5px solid rgba(255,255,255,.175);
  }

  h1{
    font-size: 36px;
    font-weight: 500;
    margin-left: 30px;
  }

  div{
    margin-right: 20px;

    button{
      margin-inline:10px;
    }
    #addWallet{
      background-color: rgba(255, 255, 255,.9);
      /* padding:10px 20px; */
      height: 3rem;
      width: 8rem;  
      border-radius: 12px;
      color:black;

      &:hover{
        background-color: rgba(255, 255, 255,1);
      }
    }
    #delWallets{
      background-color: rgba(255, 0, 0,.9);
      /* padding:10px 20px; */
      border-radius: 12px;
      height: 3rem;
      width: 8rem;

      &:hover{
        background-color: rgba(255, 0, 0,1);
      }
    }
  }
`;


const KeyContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  border: .5px solid rgba(255,255,255,.1);
  border-radius: 12px;
  height: fit-content;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 320px;
  grid-gap: 20px;
`;


export default EthWallet
