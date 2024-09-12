"use client";

import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, Divider, useToast } from '@chakra-ui/react';
import Header from '../components/Header'; // Adjust path if necessary
import ClaimRewardCard from '../components/ClaimRewardCard'; // Adjust path if necessary
import { ethers } from 'ethers';
import Footer from '../components/Footer';

const ClaimRewardsPage = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
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
      <Flex direction="column" alignItems="center" justifyContent="center" flex="1" px="4">
        <Box bg="gray.800" p="6" borderRadius="md" shadow="md" width="full" maxW="lg">
          <Heading as="h1" size="lg" mb="4" color="yellow.400">
            Rewards
          </Heading>
          <Text mb="4" color="gray.400">
            Claiming rewards allows you to retrieve the rewards you have earned. Follow the steps below to claim your rewards:
          </Text>
          <Text mb="4" color="gray.400">
            1. Ensure you have connected your wallet.
          </Text>
          <Text mb="4" color="gray.400">
            2. Check the available rewards in the claim section below.
          </Text>
          <Text mb="4" color="gray.400">
            3. Click "Claim Rewards" to complete the claiming process.
          </Text>
          <Text mb="4" color="gray.400">
            4. Your rewards will be transferred to your wallet upon successful claim.
          </Text>
          <Divider mb="6" />
          {userAddress && (
            <ClaimRewardCard userAddress={userAddress} />
          )}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default ClaimRewardsPage;
