import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { getUserLpTokenBalance } from '../utils/LPTokenContract'; // Adjust the import path
import { ethers } from 'ethers';

interface UserAvailableTokensProps {
  userAddress: string;
}

const UserAvailableTokens: React.FC<UserAvailableTokensProps> = ({ userAddress }) => {
  const [availableTokens, setAvailableTokens] = useState<string>('0');

  useEffect(() => {
    const fetchAvailableTokens = async () => {
      try {
        const balance = await getUserLpTokenBalance(userAddress);
        setAvailableTokens(ethers.formatUnits(balance, 18));
      } catch (error) {
        console.error('Failed to fetch available tokens:', error);
      }
    };

    if (userAddress) {
      fetchAvailableTokens();
    }
  }, [userAddress]);

  return (
    <Text mb="4" color="gray.400">
      Available LP Tokens to Stake: {availableTokens}
    </Text>
  );
};

export default UserAvailableTokens;