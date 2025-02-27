// File: src/pages/UserFormPage.tsx
import React from 'react';
import { Box, Heading, VStack, Divider } from '@chakra-ui/react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const UserFormPage: React.FC = () => {
  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">User Data Management</Heading>
        
        <UserForm />
        
        <Divider />
        
        <Heading as="h2" size="lg">Users</Heading>
        <UserList />
      </VStack>
    </Box>
  );
};

export default UserFormPage;