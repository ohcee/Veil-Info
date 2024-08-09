# Veil-Info

<p>The Veil-Info app is an easy-to-use tool that provides up-to-date information on the Veil blockchain, market trends, and news.</p>
<p>It displays the current block, difficulty levels for all algorithms, exchange rates, the most active exchanges, team budgets, and includes many clickable quick links.</p>
<p>This uses a proxy to make calls to the Veil explorer every 15 seconds and displays the information.</p>

#### `git clone https://github.com/ohcee/veil-info.git`

### You will need Node.js and npm.

#### On Ubuntu:
#### `sudo apt install nodejs`
#### `sudo apt install npm`

#### On macOS:
#### You can use Homebrew to install Node.js and npm:
#### `brew install node`

### You also need react-scripts and several Babel plugins.

### After you install npm, install react-scripts and the plugins:

### `npm install`

### `npm upgrade`

### `npm install @testing-library/jest-dom@latest`
### `npm install @testing-library/react@latest` 
### `npm install @testing-library/user-event@latest`
### `npm install web-vitals@latest`

### After these are installed, inside the `veil-info` 
### root folder, run the following:

#### `cd veil-info`

#### `cd Java` 

### Then once inside the Java folder:

#### `node server.js`

## This should start the proxy. It will continue to make RPC calls and restart every 30 mins.

## Open another terminal window and enter the following:

### `cd veil-info`

#### `cd src`

## Once inside the src folder:

#### `npm start`

# Dark mode:
![Screenshot 2023-12-30 at 5 55 35 AM](https://github.com/ohcee/veil-info/assets/46406370/4a5706ae-3f00-41de-944a-8d433a675963)
![Screenshot 2023-12-30 at 5 56 34 AM](https://github.com/ohcee/veil-info/assets/46406370/f1ef496f-2caf-428a-90e2-db3799f7c100)

# Light mode:
![Screenshot 2023-12-30 at 6 00 18 AM](https://github.com/ohcee/veil-info/assets/46406370/0fb67ee0-3b33-4570-ac59-28596e50dbb0)

