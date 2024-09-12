// src/connector.ts
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42], // Replace with your supported chain IDs
});

export const walletConnect = new WalletConnectConnector({
    qrcode: true,
    supportedChainIds: [1, 3, 4, 5, 42], // Replace with your supported chain IDs
});
