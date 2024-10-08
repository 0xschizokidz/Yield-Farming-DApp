// Header.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Button, useColorMode, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';

const Header = ({ title = "Yield Sphere" }: { title?: string }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [account, setAccount] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    // Only run on the client side
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setAccount(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        localStorage.setItem('walletAddress', address);
        setAccount(address);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${address}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to use this feature.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to MetaMask.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.800" color="white" px={4} py={3}>
      <Flex as="nav" justify="space-between" align="center">
        <Heading size="lg">
          <NextLink href="/" passHref>
            {title}
          </NextLink>
        </Heading>
        <Flex align="center">
          <Button variant="link" onClick={toggleColorMode} aria-label="Toggle theme">
            {colorMode === 'light' ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
          </Button>
          <NextLink href="/stake" passHref>
            <Button ml={4} variant="outline" colorScheme="blue">
              Staking
            </Button>
          </NextLink>
          <NextLink href="/withdraw" passHref>
            <Button ml={4} variant="outline" colorScheme="pink">
              Withdraw
            </Button>
          </NextLink>
          <NextLink href="/claimreward" passHref>
            <Button ml={4} variant="outline" colorScheme="yellow">
              Rewards
            </Button>
          </NextLink>
          <Button ml={4} variant="outline" colorScheme="teal" onClick={connectWallet}>
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
