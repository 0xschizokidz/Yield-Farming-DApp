import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { claimRewards, calculateReward } from '../utils/stakingPoolContract'; // Adjust path if necessary

interface ClaimRewardCardProps {
  userAddress: string;
}

const ClaimRewardCard: React.FC<ClaimRewardCardProps> = ({ userAddress }) => {
  const [rewardAmount, setRewardAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Define fetchReward using useCallback to prevent re-creation on every render
  const fetchReward = useCallback(async () => {
    try {
      if (userAddress) {
        const reward = await calculateReward(userAddress);
        // Check if reward is defined before using it
        if (reward !== undefined) {
          setRewardAmount(reward.toString());
        } else {
          setRewardAmount('0');
        }
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  }, [userAddress]); // `userAddress` as dependency

  useEffect(() => {
    fetchReward();
  }, [fetchReward]); // Add fetchReward as a dependency

  const handleClaimRewards = async () => {
    setLoading(true);
    try {
      await claimRewards();
      toast({
        title: "Rewards Claimed",
        description: "Your rewards have been successfully claimed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchReward(); // Refresh reward amount after claiming
    } catch (error) {
      toast({
        title: "Error",
        description: "Claiming rewards failed. Please try again.",
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
        Claim Your Rewards
      </Heading>
      <Text mb="4" color="gray.400">
        Claim the rewards you have earned by staking your tokens.
      </Text>
      <Box mb="6">
        <Heading as="h3" size="md" mb="4" color="yellow.400">
          Available Rewards
        </Heading>
        <Text color="gray.400">
          {rewardAmount} Tokens
        </Text>
      </Box>
      <Button
        colorScheme="yellow"
        onClick={handleClaimRewards}
        isLoading={loading}
        loadingText="Claiming"
        size="lg"
      >
        Claim Rewards
      </Button>
    </Box>
  );
};

export default ClaimRewardCard;
