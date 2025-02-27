// File: src/components/Counter.tsx
import React from 'react';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { useSpring, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increment, decrement, reset } from '../store/counterSlice';

const AnimatedBox = animated(Box);

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  
  // Animation for background color
  const props = useSpring({
    backgroundColor: `rgba(66, 153, 225, ${count / 20})`,
    config: {
      tension: 170,
      friction: 26,
    },
  });
  
  return (
    <AnimatedBox 
      w="100%" 
      p={8} 
      borderRadius="lg" 
      boxShadow="md" 
      style={props}
      minH="300px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6}>
        <Text fontSize="6xl" fontWeight="bold">{count}</Text>
        
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
          
          <Button colorScheme="red" onClick={() => dispatch(reset())}>
            Reset
          </Button>
          
          <Button colorScheme="green" onClick={() => dispatch(increment())}>
            Increment
          </Button>
        </HStack>
      </VStack>
    </AnimatedBox>
  );
};

export default Counter;

