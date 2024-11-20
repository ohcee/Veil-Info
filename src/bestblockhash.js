import axios from "axios";
import { useState, useEffect } from "react";
import rpcCall from "./rpcAuth"; // Import the rpcCall function

const BestBlockHash = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the rpcCall function to fetch blockchain info
        const result = await rpcCall("getblockchaininfo");
        console.log(result);
        setBlockchainInfo({ bestblockhash: result.bestblockhash });
      } catch (error) {
        console.error("Error fetching best block hash:", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div className="BestBlockHash">
      {blockchainInfo && (
        <h3>
          Best Block Hash: <br />
          {blockchainInfo.bestblockhash}
        </h3>
      )}
    </div>
  );
};

export default BestBlockHash;
