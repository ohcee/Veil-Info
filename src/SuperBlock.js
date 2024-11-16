import { useState, useEffect } from "react";
import rpcCall from "./rpcAuth"; // Import the rpcCall function

const SuperBlock = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blockchain info using rpcCall
        const result = await rpcCall("getblockchaininfo");
        console.log(result);
        setBlockchainInfo({
          next_super_block: result.next_super_block, // Update with actual RPC response if different
          current_block: result.blocks, // Update with actual RPC response if different
        });
      } catch (error) {
        console.error("Error fetching blockchain info:", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  const calculateTimeRemaining = () => {
    if (blockchainInfo && blockchainInfo.next_super_block && blockchainInfo.current_block) {
      const blocksRemaining = blockchainInfo.next_super_block - blockchainInfo.current_block;
      const minutesRemaining = blocksRemaining; // Adjust if block time differs from 1 minute
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      const daysRemaining = Math.floor(hoursRemaining / 24);

      return {
        days: daysRemaining,
        hours: hoursRemaining % 24,
        minutes: minutesRemaining % 60,
      };
    }
    return null;
  };

  const remainingTime = calculateTimeRemaining();

  return (
    <div>
      {blockchainInfo && remainingTime && (
        <h3>
          Block number <p>{blockchainInfo.next_super_block}</p> is the next <p>SuperBlock</p>
          It's in approximately <p>{remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes</p>
        </h3>
      )}
      <h6>
        Learn about the{" "}
        <a
          href="https://veil-project.com/uploads/Superblocks.202402.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Superblock Data
        </a>
      </h6>
    </div>
  );
};

export default SuperBlock;

