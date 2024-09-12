"use client";

import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, Divider, useToast } from '@chakra-ui/react';
import Header from '../components/Header'; // Adjust path if necessary
import StakingCard from '../components/StakingCard'; // Adjust path if necessary
import UserAvailableTokens from '../components/UserAvailableTokens'; // Adjust path if necessary
import { ethers } from 'ethers';
import { getStakedAmount } from '../utils/stakingPoolContract'; // Adjust path if necessary
import Footer from '../components/Footer';

const StakePage = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [stakedAmount, setStakedAmount] = useState<string>('0');
  const toast = useToast();

  // Fetch user's address
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

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    const fetchStakedAmount = async () => {
      try {
        if (userAddress) {
          const amount = await getStakedAmount(userAddress);
          setStakedAmount(amount || '0'); // Provide default value if amount is undefined
        }
      } catch (error) {
        console.error('Error fetching staked amount:', error);
        toast({
          title: "Error",
          description: "Could not fetch staked amount. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchStakedAmount();
  }, [userAddress]);

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.900">
      <Header title="Yield Sphere" />
      <Flex direction="column" alignItems="center" justifyContent="center" flex="1" px="4">
        <Box bg="gray.800" p="6" borderRadius="md" shadow="md" width="full" maxW="lg">
          <Heading as="h1" size="lg" mb="4" color="yellow.400">
            Staking
          </Heading>
          <Text mb="4" color="gray.400">
            Staking tokens allows you to earn rewards over time. Follow the steps below to stake your tokens:
          </Text>
          <Text mb="4" color="gray.400">
            1. Ensure you have tokens available in your wallet.
          </Text>
          <Text mb="4" color="gray.400">
            2. Enter the amount you wish to stake in the staking section.
          </Text>
          <Text mb="4" color="gray.400">
            3. Click "Stake" to complete the staking process.
          </Text>
          <Text mb="4" color="gray.400">
            4. After staking, you can view the total staked amount displayed below.
          </Text>
          <Divider mb="6" />
          {userAddress && (
            <>
              <UserAvailableTokens userAddress={userAddress} />
            </>
          )}
          <StakingCard />
          <Text mb="4" color="gray.400">
          </Text>
          <Divider mb="6" />
          {userAddress && (
            <>
              <Text mb="4" color="gray.400">
                Current Staked Amount: {stakedAmount} Tokens
              </Text>
            </>
          )}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default StakePage;
