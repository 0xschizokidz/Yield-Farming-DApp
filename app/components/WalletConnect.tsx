// src/components/WalletConnect.tsx
import React, { useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Web3Provider } from '@ethersproject/providers';

// Define your connectors
const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42], // Replace with your supported chain IDs
});

const walletConnect = new WalletConnectConnector({
    qrcode: true,
    supportedChainIds: [1, 3, 4, 5, 42], // Replace with your supported chain IDs
});

const WalletConnect: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<Web3Provider | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const connectInjected = async () => {
        try {
            const injectedProvider = await injected.getProvider();
            const accounts = await injectedProvider.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setProvider(new Web3Provider(injectedProvider));
            setConnected(true);
        } catch (error) {
            console.error("Failed to connect with MetaMask", error);
        }
    };

    const connectWalletConnect = async () => {
        try {
            const walletConnectProvider = await walletConnect.getProvider();
            const accounts = await walletConnectProvider.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setProvider(new Web3Provider(walletConnectProvider));
            setConnected(true);
        } catch (error) {
            console.error("Failed to connect with WalletConnect", error);
        }
    };

    const disconnect = () => {
        try {
            // Clear connection state
            setAccount(null);
            setProvider(null);
            setConnected(false);
        } catch (error) {
            console.error("Failed to disconnect", error);
        }
    };

    return (
        <div>
            {connected && account ? (
                <div>
                    <p>Connected as: {account}</p>
                    <button onClick={disconnect}>Disconnect</button>
                </div>
            ) : (
                <div>
                    <button onClick={connectInjected}>Connect MetaMask</button>
                    <button onClick={connectWalletConnect}>Connect WalletConnect</button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
