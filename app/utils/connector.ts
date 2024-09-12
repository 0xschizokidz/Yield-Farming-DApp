import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';

// MetaMask or Injected connector
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42], // Replace with your supported chain IDs
});

// WalletConnect v2 provider with Alchemy RPC URLs
export const walletConnect = new WalletConnectProvider({
    rpc: {
        1: "https://eth-mainnet.g.alchemy.com/v2/<YOUR_ALCHEMY_API_KEY>", // Ethereum mainnet
        3: "https://eth-ropsten.alchemyapi.io/v2/<YOUR_ALCHEMY_API_KEY>", // Ropsten testnet
        4: "https://eth-rinkeby.alchemyapi.io/v2/<YOUR_ALCHEMY_API_KEY>", // Rinkeby testnet
        5: "https://eth-goerli.alchemyapi.io/v2/<YOUR_ALCHEMY_API_KEY>",  // Goerli testnet
        42: "https://eth-kovan.alchemyapi.io/v2/<YOUR_ALCHEMY_API_KEY>"   // Kovan testnet
    },
    qrcode: true, // Show QR code for WalletConnect
});
