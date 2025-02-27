// File: src/components/UserList.tsx
import React from 'react';
import { 
  Box, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  IconButton, 
  Text, 
  HStack
} from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { editUser, deleteUser } from '../store/userSlice';
import { deleteContent } from '../store/editorSlice';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  
  const handleEdit = (id: string) => {
    dispatch(editUser(id));
  };
  
  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    dispatch(deleteContent(id));
  };
  
  if (users.length === 0) {
    return (
      <Box p={4} borderRadius="md" bg="gray.50">
        <Text>No users found. Add a user using the form above.</Text>
      </Box>
    );
  }
  
  return (
    <Box overflowX="auto">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.address}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit user"
                    icon={<FiEdit />}
                    size="sm"
                    onClick={() => handleEdit(user.id)}
                  />
                  <IconButton
                    aria-label="Delete user"
                    icon={<FiTrash2 />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(user.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserList;