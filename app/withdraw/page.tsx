"use client";

import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, Divider, useToast } from '@chakra-ui/react';
import Header from '../components/Header'; // Adjust path if necessary
import WithdrawCard from '../components/WithdrawCard'; // Adjust path if necessary
import { ethers } from 'ethers';
import { getStakedAmount } from '../utils/stakingPoolContract'; // Adjust path if necessary
import Footer from '../components/Footer';

const WithdrawPage = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [availableTokens, setAvailableTokens] = useState<string>('0');
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

  useEffect(() => {
    const fetchAvailableTokens = async () => {
      try {
        if (userAddress) {
          const amount = await getStakedAmount(userAddress);
          setAvailableTokens(amount || '0'); // Provide default value if amount is undefined
        }
      } catch (error) {
        console.error('Error fetching staked amount:', error);
        toast({
          title: "Error",
          description: "Could not fetch available tokens. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchAvailableTokens();
  }, [userAddress, toast]);

  // Callback function to refresh available tokens
  const refreshAvailableTokens = async () => {
    try {
      if (userAddress) {
        const amount = await getStakedAmount(userAddress);
        setAvailableTokens(amount || '0'); // Provide default value if amount is undefined
      }
    } catch (error) {
      console.error('Error fetching staked amount:', error);
      toast({
        title: "Error",
        description: "Could not refresh available tokens. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" minHeight="100vh" bg="gray.900">
      <Header title="Yield Sphere" />
      <Flex direction="column" alignItems="center" justifyContent="center" flex="1" px="4">
        <Box bg="gray.800" p="6" borderRadius="md" shadow="md" width="full" maxW="lg">
          <Heading as="h1" size="lg" mb="4" color="yellow.400">
            Withdraw
          </Heading>
          <Text mb="4" color="gray.400">
            Withdrawing tokens allows you to retrieve your staked tokens. Follow the steps below to withdraw your tokens:
          </Text>
          <Text mb="4" color="gray.400">
            1. Ensure you have tokens available for withdrawal in your account.
          </Text>
          <Text mb="4" color="gray.400">
            2. Enter the amount you wish to withdraw in the withdrawal section below.
          </Text>
          <Text mb="4" color="gray.400">
            3. Click &quot;Withdraw&quot; to complete the withdrawal process.
          </Text>
          <Text mb="4" color="gray.400">
            4. After withdrawing, you can view the updated available tokens displayed below.
          </Text>
          <Divider mb="6" />
          <Text mb="4" color="gray.400">
            Available Tokens for Withdrawal: {availableTokens} Tokens
          </Text>
          <WithdrawCard 
            userAddress={userAddress} 
            availableTokens={availableTokens} 
            onWithdrawalSuccess={refreshAvailableTokens} // Pass the callback
          />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default WithdrawPage;
