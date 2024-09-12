import { ethers, Signer } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';

// ABI of your Staking contract
const STAKING_CONTRACT_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_stakingToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_rewardToken",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balances",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateReward",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "checkContractBalance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "claimReward",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "lastUpdate",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewardRate",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewardToken",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rewards",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stake",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stakingToken",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStaked",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "DebugLog",
    "inputs": [
      {
        "name": "message",
        "type": "string",
        "internalType": "string",
        "indexed": false
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RewardClaimed",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address",
        "indexed": true
      },
      {
        "name": "reward",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Staked",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdrawn",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  }
]
;

// Address of your deployed Staking contract
const STAKING_CONTRACT_ADDRESS = '0xFdE10e9477869cD2E78976CdCECD293ad115Bb58'; // Replace with your contract address

// Initialize ethers provider and contract
const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum); // For Ethers.js v6, use BrowserProvider instead of Web3Provider
  } else {
    throw new Error('Ethereum provider not found');
  }
};

const getStakingContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer);
};

// Stake Tokens with gas buffer
export const stakeTokens = async (amount: string) => {
  try {
    const contract = await getStakingContract();
    const formattedAmount = ethers.parseUnits(amount, 18); // Adjust decimals if needed

    const provider = getProvider();
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || 0n; // Use bigint

    // Estimate gas and add a buffer (20% extra gas)
    let gasEstimate = await contract.stake.estimateGas(formattedAmount);
    gasEstimate = gasEstimate + (gasEstimate * 20n / 100n); // Adding 20% buffer using bigint arithmetic

    const tx = await contract.stake(formattedAmount, {
      gasPrice: gasPrice,
      gasLimit: gasEstimate
    });

    const receipt = await tx.wait();
    console.log('Staking successful', receipt);
  } catch (error) {
    console.error('Error staking tokens:', error);
    throw error;
  }
};

// Withdraw Tokens with gas buffer
export const withdrawTokens = async (amount: string) => {
  try {
    const contract = await getStakingContract();
    const formattedAmount = ethers.parseUnits(amount, 18); // Adjust decimals if needed

    const provider = getProvider();
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || 0n; // Use bigint

    // Estimate gas and add a buffer
    let gasEstimate = await contract.withdraw.estimateGas(formattedAmount);
    gasEstimate = gasEstimate + (gasEstimate * 20n / 100n); // Adding 20% buffer using bigint arithmetic

    const tx = await contract.withdraw(formattedAmount, {
      gasPrice: gasPrice,
      gasLimit: gasEstimate
    });

    const receipt = await tx.wait();
    console.log('Withdrawal successful', receipt);
  } catch (error) {
    console.error('Error withdrawing tokens:', error);
    throw error;
  }
};

// Claim Rewards with gas buffer
export const claimRewards = async () => {
  try {
    const contract = await getStakingContract();

    const provider = getProvider();
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || 0n; // Use bigint

    // Estimate gas and add a buffer
    let gasEstimate = await contract.claimReward.estimateGas();
    gasEstimate = gasEstimate + (gasEstimate * 20n / 100n); // Adding 20% buffer using bigint arithmetic

    const tx = await contract.claimReward({
      gasPrice: gasPrice,
      gasLimit: gasEstimate
    });

    const receipt = await tx.wait();
    console.log('Rewards claimed successfully', receipt);
  } catch (error) {
    console.error('Error claiming rewards:', error);
    throw error;
  }
};

// Calculate Reward
export const calculateReward = async (userAddress: string) => {
  try {
    const contract = await getStakingContract();
    const reward = await contract.calculateReward(userAddress);
    return ethers.formatUnits(reward, 18); // Adjust decimals if needed
  } catch (error) {
    console.error('Error calculating reward:', error);
  }
};

// Get Staked Amount
export const getStakedAmount = async (userAddress: string) => {
  try {
    const contract = await getStakingContract();
    const stakedAmount = await contract.balances(userAddress);
    return ethers.formatUnits(stakedAmount, 18); // Adjust decimals if needed
  } catch (error) {
    console.error('Error fetching staked amount:', error);
  }
};