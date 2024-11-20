import { useState, useEffect } from "react";
import rpcCall from "./rpcAuth"; // Import the rpcCall function

const Currentblock = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blockchain info using rpcCall
        const result = await rpcCall("getblockchaininfo");
        console.log(result);
        setBlockchainInfo({ blocks: result.blocks }); // Update with actual field if different
      } catch (error) {
        console.error("Error fetching blockchain info:", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div>
      {blockchainInfo && (
        <h3>
          The current Block number is <p>{blockchainInfo.blocks}</p>
          VEIL has a <p>1 minute block time</p> and is a <p>50/50 PoS/PoW Hybrid</p>
        </h3>
      )}
      <h6>
        <a
          href="https://veil-project.com/faqs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>
      </h6>
    </div>
  );
};

export default Currentblock;
