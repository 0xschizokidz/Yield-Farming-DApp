// src/components/WalletConnect.tsx
import React, { useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { injected, walletConnect } from '../utils/connector';

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
            // Initialize the WalletConnect provider
            await walletConnect.enable(); // Enable WalletConnect session
            const accounts = walletConnect.accounts; // Get accounts from WalletConnect provider
            setAccount(accounts[0]);
            setProvider(new Web3Provider(walletConnect));
            setConnected(true);
        } catch (error) {
            console.error("Failed to connect with WalletConnect", error);
        }
    };

    const disconnect = () => {
        try {
            if (walletConnect) {
                walletConnect.disconnect(); // Disconnect WalletConnect session
            }
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
