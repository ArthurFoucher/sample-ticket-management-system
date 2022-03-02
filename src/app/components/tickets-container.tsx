import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  Header?: React.ReactNode;
}

export const TicketsContainer: React.FC<Props> = ({ children, Header }) => {
  return (
    <Box backgroundColor="gray.50" minH="100vh">
      <Stack
        isInline
        justifyContent="space-around"
        alignItems="center"
        w="100%"
        px="150px"
        py="4"
        boxShadow="xs"
        backgroundColor="white"
      >
        <Text fontSize="2xl" autoCapitalize="all" fontWeight="semibold">
          Ticket Manager
        </Text>
        <Box>{Header}</Box>
      </Stack>
      <Stack mx={'200px'} alignItems="center">
        {children}
      </Stack>
    </Box>
  );
};
