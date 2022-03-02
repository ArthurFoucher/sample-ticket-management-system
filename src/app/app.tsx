import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { TicketManager } from './components/ticket-manager';

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <TicketManager />
    </ChakraProvider>
  );
};
