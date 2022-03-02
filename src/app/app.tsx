import { Box, ChakraProvider } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { TicketManager } from './components/ticket-manager';

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Suspense fallback={<Box>Loading...</Box>}>
          <TicketManager />
        </Suspense>
      </RecoilRoot>
    </ChakraProvider>
  );
};
