import axios from "axios";
import { useState, useEffect } from "react";

const SuperBlock = () => {
  const [superBlock, setSuperBlock] = useState(null);

  useEffect(() => {
    const fetchSuperBlockData = async () => {
      try {
        const response = await axios.get(
          "https://explorer-api.veil-project.com/api/BlockchainInfo",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = response.data;
        setSuperBlock(data.chainInfo.next_super_block);
      } catch (error) {
        console.error("Error fetching super block data:", error);
      }
    };

    fetchSuperBlockData(); // Initial fetch
    const intervalId = setInterval(fetchSuperBlockData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div className="SuperBlock">
      {superBlock ? (
        <h3>
          Next Super Block: <br />
          {superBlock}
        </h3>
      ) : (
        <h3>Loading super block data...</h3>
      )}
    </div>
  );
};

export default SuperBlock;
