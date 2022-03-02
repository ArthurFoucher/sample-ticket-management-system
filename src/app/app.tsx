import { ChakraProvider } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { LoadingScreen } from './components/loading-screen';
import { TicketManager } from './components/ticket-manager';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <RecoilRoot>
          <Suspense fallback={<LoadingScreen />}>
            <TicketManager />
          </Suspense>
        </RecoilRoot>
      </ChakraProvider>
    </BrowserRouter>
  );
};
