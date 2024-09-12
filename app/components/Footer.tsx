// Footer.tsx
import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <Flex
      as="footer"
      position="relative"
      paddingX="4"
      paddingY="4"
      bg="gray.800"
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="sm">© 2024 0xschizokidz.</Text>
      <Flex gap="4">
        <Button as="a" href="https://github.com/0xschizokidz/Yield-Farming/tree/main/yieldfarming-dapp" variant="link" colorScheme="yellow">
          <FaGithub size="24px" />
        </Button>
        <Button as="a" href="https://www.linkedin.com/in/m-helmi/" variant="link" colorScheme="yellow">
          <FaLinkedin size="24px" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Footer;
