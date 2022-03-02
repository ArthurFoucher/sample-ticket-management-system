import { Box, createStandaloneToast } from '@chakra-ui/react';
import update from 'immutability-helper';
import { useRecoilCallback } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';
import { ticketMappingSource } from '../selectors/tickets.selectors';

const toast = createStandaloneToast();

export const useComplete = () => {
  return useRecoilCallback(
    ({ set }) =>
      async (ticketId: number, completed: boolean) => {
        // we optimistically update the ticket in place
        set(ticketMappingSource, (mapping) =>
          update(mapping, {
            [ticketId]: { $merge: { completed, status: 'saving' } },
          })
        );
        try {
          // then we save
          const savedTicket = await firstValueFrom(
            backend.complete(ticketId, completed)
          );
          // when done, we replace the old version with the new
          set(ticketMappingSource, (mapping) =>
            update(mapping, {
              [ticketId]: { $set: { ...savedTicket, status: 'saved' } },
            })
          );
        } catch {
          // we undo the update since the request failed
          set(ticketMappingSource, (mapping) =>
            update(mapping, {
              [ticketId]: {
                $merge: { completed: !completed, status: 'saved' },
              },
            })
          );
          // then we warn the user
          toast({
            position: 'top-right',
            render: () => (
              <Box color="white" p={3} bg="red.300">
                We tried to complete the ticket but they wouldn't let us !
              </Box>
            ),
          });
        }
      }
  );
};
