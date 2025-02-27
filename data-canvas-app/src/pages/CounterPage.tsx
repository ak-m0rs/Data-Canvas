// File: src/pages/CounterPage.tsx
import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import Counter from '../components/Counter';

const CounterPage: React.FC = () => {
  return (
    <Box maxW="container.md" mx="auto" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">Counter</Heading>
        <Counter />
      </VStack>
    </Box>
  );
};

export default CounterPage;