import React, { useState } from 'react';
import { Box, Heading, Input, Button, Text, useToast, VStack } from '@chakra-ui/react';
import { stakeTokens } from '../utils/stakingPoolContract'; // Import utility functions
import { approveStakingPool } from '../utils/LPTokenContract'; // Import function for approval

const StakingCard: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleApproveAndStake = async () => {
    if (!stakeAmount || isNaN(parseFloat(stakeAmount)) || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid staking amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // Approve tokens
      await approveStakingPool(stakeAmount);
      // Perform staking
      await stakeTokens(stakeAmount);
      toast({
        title: "Success",
        description: "Tokens approved and staked successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setStakeAmount('');
    } catch (error) {
      console.error('Error in approval or staking:', error);
      toast({
        title: "Transaction Error",
        description: "There was an issue with approving or staking tokens.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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
        Stake Your Tokens
      </Heading>
      <Text mb="4" color="gray.400">
        Earn rewards by staking your tokens. The more you stake, the more you earn!
      </Text>
      <VStack spacing="4" align="stretch">
        <Input
          placeholder="Amount to stake"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          bg="gray.700"
          color="white"
          border="none"
          _placeholder={{ color: 'gray.400' }}
        />
        <Button
          colorScheme="yellow"
          onClick={handleApproveAndStake}
          isLoading={loading}
          loadingText="Processing"
          size="lg"
        >
          Stake
        </Button>
      </VStack>
    </Box>
  );
};

export default StakingCard;
