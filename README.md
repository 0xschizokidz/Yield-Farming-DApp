# Yield Sphere DApp

Yield Sphere is a decentralized application (DApp) built on the Ethereum blockchain, designed for users to stake tokens, withdraw tokens, and claim rewards. This README provides an overview of the project's purpose, setup instructions, and usage.

## Table of Contents

- [Yield Sphere DApp](#yield-sphere-dapp)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Usage](#usage)
    - [Staking Tokens](#staking-tokens)
    - [Withdrawing Tokens](#withdrawing-tokens)
    - [Claiming Rewards](#claiming-rewards)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Staking Tokens**: Stake your tokens to earn rewards.
- **Withdrawing Tokens**: Withdraw staked tokens from the contract.
- **Claiming Rewards**: Claim rewards earned from staking.

## Installation

### Prerequisites

- Node.js (>= 18.x)
- Yarn or npm (for package management)
- MetaMask or another Ethereum wallet

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/yield-sphere.git
   cd yield-sphere

2. **Install Dependencies**
   
   ```bash
   npm install

3. **Setup Environment Variables**
   Create a .env file in the root directory and add the necessary environment variables. Example:

   ```bash
   REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
   REACT_APP_CONTRACT_ADDRESS=your_contract_address

4. **Start the Developement Server**

    ```bash
    npm run dev
    ```

    Your application will be available at http://localhost:3000.

## Usage

### Staking Tokens

1. **Connect Wallet**: Click the "Connect Wallet" button in the header and follow the prompts in MetaMask.
2. **Stake Tokens**: Go to the staking page, enter the amount of tokens you want to stake, and click "Stake".

### Withdrawing Tokens

1. **Connect Wallet**: Ensure your wallet is connected.
2. **Withdraw Tokens**: Navigate to the withdrawal page, enter the amount of tokens you wish to withdraw, and click "Withdraw".

### Claiming Rewards

1. **Connect Wallet**: Ensure your wallet is connected.
2. **Claim Rewards**: Visit the claim rewards page and click "Claim Rewards" to retrieve your earned rewards.

## Project Structure

- `src/components/`: Contains React components used in the application.
- `src/pages/`: Contains page components for different routes.
- `src/utils/`: Contains utility functions for interacting with smart contracts.
- `styles/`: Contains global styles and theme configurations.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

Please ensure your code adheres to the existing style and includes tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
