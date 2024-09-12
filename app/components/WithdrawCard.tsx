import React, { useState } from 'react';
import { Box, Heading, Input, Button, Text, useToast, VStack } from '@chakra-ui/react';
import { withdrawTokens } from '../utils/stakingPoolContract'; // Adjust path if necessary

interface WithdrawCardProps {
  userAddress: string;
  availableTokens: string;
  onWithdrawalSuccess?: () => void; // Make this prop optional
}

const WithdrawCard: React.FC<WithdrawCardProps> = ({ userAddress, availableTokens, onWithdrawalSuccess }) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(availableTokens)) {
      toast({
        title: "Insufficient Tokens",
        description: "You do not have enough tokens to withdraw.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await withdrawTokens(withdrawAmount);
      toast({
        title: "Success",
        description: "Withdrawal was successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setWithdrawAmount('');
      if (onWithdrawalSuccess) {
        onWithdrawalSuccess(); // Call the callback to refresh tokens
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with your withdrawal request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box
      bg="gray.800"
      p="6"
      borderRadius="md"
      boxShadow="md"
      width="full"
      maxW="lg"
      textAlign="center"
    >
      <Heading as="h2" size="lg" mb="4" color="yellow.400">
        Withdraw Your Tokens
      </Heading>
      <Text mb="4" color="gray.400">
        Withdraw tokens to retrieve your staked tokens. Enter the amount you wish to withdraw below.
      </Text>
      <VStack spacing="4" align="stretch">
        <Input
          placeholder="Amount to withdraw"
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          bg="gray.700"
          color="white"
          border="none"
          _placeholder={{ color: 'gray.400' }}
        />
        <Button
          colorScheme="yellow"
          onClick={handleWithdraw}
          isLoading={loading}
          loadingText="Withdrawing"
          size="lg"
        >
          Withdraw
        </Button>
      </VStack>
    </Box>
  );
};

export default WithdrawCard;
