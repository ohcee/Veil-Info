const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
let errorOccurred = false; // Flag to track if an error occurred

// Enable CORS for all routes
app.use(cors());

// Create an HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Function to broadcast messages to all connected clients
function broadcastMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Middleware to handle errors
function handleErrors(err, req, res, next) {
  if (err) {
    errorOccurred = true; // Set error flag
    broadcastMessage('error'); // Notify clients about the error
    if (err.response) {
      if (err.response.status === 429) {
        res.status(429).send('Rate limit exceeded. Please try again later.');
      } else if (err.response.status === 404) {
        res.status(404).send('Resource not found.');
      } else {
        res.status(err.response.status).send(err.response.statusText);
      }
    } else {
      res.status(500).send('Internal server error.');
    }
  } else {
    next();
  }
}

// Proxy configuration for nonkyc-veil-xmr
app.use('/nonkyc-veil-xmr', createProxyMiddleware({
  target: 'https://nonkyc.io',
  changeOrigin: true,
  pathRewrite: {
    '^/nonkyc-veil-xmr': '/api/v2/market/getbysymbol/VEIL_XMR'
  },
  onError: handleErrors
}));

// Proxy configuration for /api
app.use('/api', createProxyMiddleware({ 
  target: 'https://explorer-api.veil-project.com', 
  changeOrigin: true,
  timeout: 15000, // set timeout to 15 seconds 
  onProxyRes: (proxyRes, req, res) => {
    if (errorOccurred) {
      broadcastMessage('recovered'); // Notify clients about the recovery
      errorOccurred = false;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  },
  onError: handleErrors
}));

// Proxy configuration for probit
app.use('/probit', createProxyMiddleware({ 
  target: 'https://api.probit.com', 
  changeOrigin: true,
  pathRewrite: {
    '^/probit': '/api/exchange/v1'
  },
  onError: handleErrors
}));

// Proxy configuration for tradeogre
app.use('/tradeogre', createProxyMiddleware({ 
  target: 'https://tradeogre.com/api/v1', 
  changeOrigin: true,
  pathRewrite: {
    '^/tradeogre': ''
  },
  onError: handleErrors
}));

// Proxy configuration for coingecko
app.use('/coingecko', createProxyMiddleware({ 
  target: 'https://api.coingecko.com/api/v3/simple/price',
  changeOrigin: true,
  pathRewrite: {
    '^/coingecko': ''
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.path += `?ids=veil&vs_currencies=usd`;
  },
  onError: handleErrors
}));

// CORS handling for OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

// Configure the HTTP server with maxHeadersCount
server.maxHeadersCount = 0; // Set maxHeadersCount to 0 to disable the limit

// Function to restart the server
const restartServer = () => {
  if (errorOccurred) {
    console.log('Restarting proxy server due to an error...');
    server.close(() => {
      server.listen(3001, () => {
        console.log('Proxy server restarted successfully');
        broadcastMessage('recovered'); // Notify clients about the recovery
        errorOccurred = false; // Reset error flag
      });
    });
  }
};

// Start the proxy server
server.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});

// Periodically check for errors and restart the server if needed
setInterval(restartServer, 30000); // Check every 30 seconds
