import axios from "axios";

// Reusable function for making JSON-RPC calls
const rpcCall = async (method, params = []) => {
  const rpcUrl = "http://127.0.0.1:5556"; // Update with your RPC URL and port
  const rpcAuth = {
    username: "veil", 
    password: "veil", 
  };

  try {
    const response = await axios.post(
      rpcUrl,
      {
        jsonrpc: "1.0",
        id: "rpc_call",
        method,
        params,
      },
      {
        auth: rpcAuth, // Attach authentication credentials
      }
    );
    return response.data.result; // Return the result from the RPC response
  } catch (error) {
    console.error(`Error calling RPC method ${method}:`, error);
    throw error; // Propagate the error for handling
  }
};

export default rpcCall;