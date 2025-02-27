// File: src/pages/DashboardPage.tsx
import React from 'react';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Card, 
  CardHeader, 
  CardBody
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardPage: React.FC = () => {
  const { value: counterValue } = useSelector((state: RootState) => state.counter);
  const { users } = useSelector((state: RootState) => state.user);
  const { content } = useSelector((state: RootState) => state.editor);
  
  // Chart data for users
  const userChartData = React.useMemo(() => {
    return users.map(user => ({
      name: user.name,
      contentSize: content[user.id] ? JSON.parse(content[user.id]).blocks.length : 0,
    }));
  }, [users, content]);
  
  // Mock historical counter data
  const counterHistory = React.useMemo(() => {
    return [
      { name: 'Day 1', value: Math.floor(counterValue * 0.2) },
      { name: 'Day 2', value: Math.floor(counterValue * 0.4) },
      { name: 'Day 3', value: Math.floor(counterValue * 0.6) },
      { name: 'Day 4', value: Math.floor(counterValue * 0.8) },
      { name: 'Today', value: counterValue },
    ];
  }, [counterValue]);
  
  // Pie chart data
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const pieData = React.useMemo(() => {
    const total = users.length;
    if (total === 0) return [];
    
    const withContentCount = Object.keys(content).length;
    const withoutContentCount = total - withContentCount;
    
    return [
      { name: 'With Content', value: withContentCount },
      { name: 'Without Content', value: withoutContentCount },
    ];
  }, [users, content]);
  
  return (
    <Box maxW="container.xl" mx="auto" py={6}>
      <Heading as="h1" size="xl" mb={8}>Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={10}>
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Counter Value</StatLabel>
          <StatNumber>{counterValue}</StatNumber>
          <StatHelpText>Current counter value</StatHelpText>
        </Stat>
        
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{users.length}</StatNumber>
          <StatHelpText>Number of registered users</StatHelpText>
        </Stat>
        
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Rich Text Documents</StatLabel>
          <StatNumber>{Object.keys(content).length}</StatNumber>
          <StatHelpText>Number of user documents</StatHelpText>
        </Stat>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Counter History</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              {counterHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={counterHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Text>No counter data available</Text>
              )}
            </Box>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Heading size="md">User Content Size</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              {userChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="contentSize" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Text>No user data available</Text>
              )}
            </Box>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Heading size="md">Content Distribution</Heading>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              {pieData.length > 0 && users.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Text>No user data available</Text>
              )}
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;