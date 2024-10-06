import React from 'react'
import styled from 'styled-components'

function subWallet({walletNumber,publicKey, privateKey, secretPhrase }) {
  return (
    <Container>
        <h1>Wallet{walletNumber}</h1>

        <Box>
        <h1>Public Key</h1>
        <input type='text' value={publicKey}/>
        <h1>Private Key</h1>
        <input type='password' value={privateKey}/>
        <h1>Secret Phrase</h1>
        <input type='password' value={secretPhrase}/>
        </Box>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  border: 1ps solid rgba(50, 126, 126, 0.8);

  h1{
    height: auto;
    width: 100%;
  }
`;

export default subWallet;
