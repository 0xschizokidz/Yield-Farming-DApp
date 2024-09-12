import { ethers } from 'ethers';

export const stakeTokens = async (amount: string) => {
    try {
        const contract = await getStakingContract();
        const estimatedGas = await contract.estimateGas.stake(ethers.parseUnits(amount, 'ether'));
        const tx = await contract.stake(ethers.parseUnits(amount, 'ether'), {
            gasLimit: estimatedGas.add(ethers.BigNumber.from("10000"))  // Add a small buffer to the estimated gas
        });
        await tx.wait();
        console.log('Stake transaction successful');
    } catch (error) {
        console.error("Failed to stake tokens", error);
        throw error;
    }
};
