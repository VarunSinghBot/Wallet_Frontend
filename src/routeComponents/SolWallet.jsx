import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletBox from "./WalletBox.jsx"
import Navbar from './Navbar.jsx';
import bs58 from "bs58";
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SolWallet() {

  const [currentIndex,setCurrentIndex] = useState(0);
  const [publicKeys,setPublicKeys] = useState([]);
  const [privateKeys, setPrivateKeys] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState(true)
  const [deletedWallets, setDeletedWallets] = useState([]);

  const seed = useSelector(state => state.util.seed);
  // console.log("solWallet S  --->",seed);
  const mnemonic = useSelector(state => state.util.mnemonic);
  // console.log("solWallet M  --->",mnemonic);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!mnemonic){
      navigate("/")
    }
  },[mnemonic])


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Text copied to clipboard!",{
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
      toast.error("Couldn't copy text");
      console.error("Failed to copy: ", err);
    }
  };

  function splitStringToArray(inputString) {
    // Split the string by spaces and return the resulting array
    return inputString.split(' ');
  }

  const resultArray = splitStringToArray(mnemonic);
  // console.log(resultArray)

  const handleDeleteWallet = (walletNo) => {
    const publicKeyToDelete = publicKeys[walletNo - 1];
    const privateKeyToDelete = privateKeys[walletNo - 1];

    // Store the deleted wallet's public and private keys
    setDeletedWallets(prev => [...prev, { publicKey: publicKeyToDelete, privateKey: privateKeyToDelete }]);

    setPublicKeys(prevKeys => prevKeys.filter((_, index) => index !== walletNo - 1));
    setPrivateKeys(prevKeys => prevKeys.filter((_, index) => index !== walletNo - 1));
    toast.success('Wallet deleted successfully!',{
      style: {
      border: '1px solid #ffffff',
      padding: '16px',
      color: '#000000',
    },
    iconTheme: {
      primary: '#ff0000',
      secondary: '#ffffff',
    }
  });
  };  

  const onClickAddWalletFunction = async () => {
    
    if (deletedWallets.length > 0) {
 
      const restoredWallet = deletedWallets[deletedWallets.length - 1];
      setPublicKeys(prevKeys => [...prevKeys, restoredWallet.publicKey]);
      setPrivateKeys(prevKeys => [...prevKeys, restoredWallet.privateKey]);
      
      toast.success(`Restored Wallet successfully!`,
        {
          style: {
            border: '1px solid #ffffff',
            padding: '16px',
            color: '#000000',
          },
          iconTheme: {
            primary: '#000000',
            secondary: '#FFFAEE',
          }
        }
      );
      
      // Remove the restored wallet from deleted wallets
      setDeletedWallets(prev => prev.slice(0, -1));
    } else {

      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      // console.log("sol secret ---> \n",keypair.secretKey);
      // console.log("sol secret 2 ---> \n",bs58.encode(keypair.secretKey));

      const bs58EncodedPrivateKey = bs58.encode(keypair.secretKey);
      
      setCurrentIndex(prevIndex => prevIndex + 1);
      setPublicKeys(prevKeys => [...prevKeys, keypair.publicKey.toBase58()]);
      setPrivateKeys(prevKeys => [...prevKeys, bs58EncodedPrivateKey])
  
      toast.success('Added new Wallet', {
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
    }
  }

  return (
    <Container>
      <Navbar/>
      {/* <ToastContainer position="bottom-right" autoClose={1600} /> */}
      <Toaster position="bottom-right" reverseOrder={true}/>
      <TopContainer>
      <Top onClick={()=>setDropdownToggle(!dropdownToggle)}>
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
      
      { dropdownToggle ? null :
        <>
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
        </>
      }

      <p onClick={()=>copyToClipboard()}>
        <span>
          <img src="/copy-icon.svg" alt="<--Copy Icon-->" width="16" height="16" />
        </span>
        Click to copy
      </p>
      </TopContainer>


      <Heading>
        <h1>
          Solana Wallet
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
              // Clear all wallets
              setPublicKeys([]); 
              setPrivateKeys([]); 
              setDeletedWallets([]);
              setCurrentIndex(0); // Reset current index
              toast.success(`All wallets cleared!`,{
                  style: {
                  border: '1px solid #ffffff',
                  padding: '16px',
                  color: '#000000',
                },
                iconTheme: {
                  primary: '#ff0000',
                  secondary: '#ffffff',
                }
              });
            }}
          >
            Clear Wallets
          </button>
        </div>
      </Heading>
      
      { currentIndex === 0 ? null : (<>
        <KeyContainer>
          <GridContainer>
            {publicKeys.map((p, index) => 
              <WalletBox
                key={index}
                walletNo = {index+1}
                publicKey = {p}
                privateKey={privateKeys[index]}
                onDelete = {handleDeleteWallet}
              />
            )}
            
           
          </GridContainer>
        </KeyContainer>
      </>)
      }
      
      
    </Container>
  )
}



// Styled Components:

const Container = styled.div`
  height: 100%;
  min-height: 100dvh;
  width: 100%;
  background-color: rgb(15,15,15);
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  padding-bottom: 100px;
  position: relative;
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
  transition: all .25s;

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
      background-color: rgba(255, 0, 0,.85);
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

export default SolWallet
