import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails , setBlockNumberDetails] = useState();
  const [blockDetailsAvailable, setBlockNumberDetailsAvailable] = useState();




  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return <>
  <div className="App">Block Number: {blockNumber}</div>;

  <div className='blockDetails'>

    <button onClick={ async ()=>{
      setBlockNumberDetails(await alchemy.core.getBlock())
     if(blockDetails){
       setBlockNumberDetailsAvailable(true)
     }

    }}>
      Get Block Details
    </button>

    <ul>

      {
        blockDetailsAvailable && blockDetails.transactions.map(async(tx,i)=>{
          const txDetails = await alchemy.core.getTransactionReceipt(tx)
          return <div key={i}>
          <h1>
            Transaction
          </h1>
            <li >Transaction: {tx}</li>
            <li >Transaction Index: {txDetails.transactionIndex}</li>
            <li >From:{txDetails.from}</li>
            <li >to:{txDetails.to} </li>
            <hr/>
  
          </div>
        })
      }

    </ul>
  </div>
  </> 
  
 
}

export default App;
