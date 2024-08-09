import React, { useEffect } from 'react';

const WebSocketListener = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onmessage = (event) => {
      if (event.data === 'error') {
        // Handle proxy error if needed (e.g., show a message)
        console.error('Proxy server encountered an error.');
      } else if (event.data === 'recovered') {
        // Refresh the page when the proxy recovers
        window.location.reload();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return null;
};

export default WebSocketListener;
