import React, { useEffect }  from "react";
import { ethers } from 'ethers';

function Log() {

  const listenToEvent = async () => {
    try {
        /*
        const wsProvider = new ethers.providers.WebSocketProvider(
        // web socket provider ('wss://...')
        );
        const contract = new ethers.Contract(
            // contract address,
            // contract ABI,
            wsProvider
        );
      
        // listen to any event on the contract using event name
        contract.on('event_name', () => {
            console.log("event is emmited");
        });
        */

    } catch (error) {
      console.log(error);
    }
  };
 /*
  useEffect(() => {
    listenToEvent();

    // Clean up the event listener when the component unmounts
   
    return () => {
      const wsProvider = new ethers.providers.WebSocketProvider(
        // web socket provider URL
      );
  
      const contract = new ethers.Contract(
        // contract address,
        // contract ABI,
        wsProvider
      );

      contract.removeAllListeners('event_name');
    };
  }, []);
    */
    return (
        <div><h2>Log</h2></div>
    );
}

export default Log;