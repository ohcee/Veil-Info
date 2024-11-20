import axios from "axios";
import { useState, useEffect } from "react";
import rpcCall from "./rpcAuth"; // Import the rpcCall function

const Chainsize = () => {
    const [blockchainInfo, setBlockchainInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use the rpcCall function to fetch blockchain info
                const result = await rpcCall("getblockchaininfo");
                console.log(result);
                setBlockchainInfo({ size_on_disk: result.size_on_disk });
            } catch (error) {
                console.error("Error fetching blockchain info:", error);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 36000000); // Fetch every 10 hours

        return () => clearInterval(intervalId); // Clean up interval
    }, []);

    // Convert size from bytes to GB for display
    const sizeInGB = blockchainInfo ? blockchainInfo.size_on_disk / (1024 * 1024 * 1024) : 0;

    return (
        <div className="csheader">
            {blockchainInfo && (
                <h3>
                    Currently you need <p>{sizeInGB.toFixed(2)} GB</p> of free storage to download 
                    <p>the blockchain</p>to participate in<p><b>STAKING</b> with the core wallet</p>
                </h3>
            )}
            <h6>
                <a href="https://veil.freshdesk.com/support/solutions/articles/43000468343-staking-faq" 
                   target="_blank" 
                   rel="noopener noreferrer">
                   Staking FAQ
                </a>
            </h6>
        </div>
    );
};

export default Chainsize;
