import { useState, useEffect } from "react";
import rpcCall from "./rpcAuth"; // Import the rpcCall function

const AddressBalance = ({ label, address }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call a method that retrieves the balance for an address
        // Replace "getaddressbalance" with the actual RPC method for address balance
        const result = await rpcCall("getaddressbalance", [address]);
        console.log(`${label} Data received:`, result);

        // Assuming the result is numeric
        if (typeof result === "number") {
          setBalance(result);
        } else {
          console.error(`Invalid data structure for ${label}:`, result);
        }
      } catch (error) {
        console.error(`Error fetching data for ${label}:`, error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 86400000); // Fetch once a day

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, [address, label]);

  return (
    <div className="AddressBalance">
      {balance !== null ? (
        <div>
          <h3>
            {label} Budget:{" "}
          </h3>
          <h4>
            <span style={{ color: "lightslategrey" }}>{balance} VEIL</span>
          </h4>
        </div>
      ) : (
        <h5>Loading {label} Budget...</h5>
      )}
    </div>
  );
};

export default AddressBalance;
