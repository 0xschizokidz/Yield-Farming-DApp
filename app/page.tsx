"use client";

import React, { useEffect, useState } from 'react';
import { Flex, Box, Heading, Text, Button, VStack, useToast } from '@chakra-ui/react';
import Header from './components/Header';  // Adjust the import path if needed
import Footer from './components/Footer';  // Adjust the import path if needed
import { ethers } from 'ethers';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [userAddress, setUserAddress] = useState<string>(''); // Add userAddress state
  const toast = useToast();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          // Request account access
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
        } else {
          toast({
            title: "Wallet Not Found",
            description: "Please install MetaMask or another Ethereum wallet.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        toast({
          title: "Connection Error",
          description: "Could not connect to wallet. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    connectWallet();
  }, [toast]);

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.900">
      <Header title="Yield Sphere" />
      <Flex direction="column" alignItems="center" justifyContent="center" flex="1">
        <Box bg="gray.800" p="6" borderRadius="md" shadow="md" width="full" maxW="lg">
          <Heading as="h1" size="lg" mb="4" color="yellow.400">
            Yield Farming DApp
          </Heading>
          <Text mb="4" color="gray.400">
            Welcome to the Yield Sphere. Stake tokens, withdraw funds, and claim rewards.
          </Text>
          <VStack spacing="4" align="stretch">
            {/* Link to Stake Page */}
            <Link href="/stake" passHref>
              <Button colorScheme="yellow" size="lg" width="full">
                Stake Tokens
              </Button>
            </Link>

            {/* Link to Withdraw Page */}
            <Link href="/withdraw" passHref>
              <Button colorScheme="yellow" size="lg" width="full">
                Withdraw Tokens
              </Button>
            </Link>

            {/* Link to Claim Rewards Page */}
            <Link href="/claimreward" passHref>
              <Button colorScheme="yellow" size="lg" width="full">
                Claim Rewards
              </Button>
            </Link>
          </VStack>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}
