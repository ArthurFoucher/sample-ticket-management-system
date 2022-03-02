import { Box, createStandaloneToast } from '@chakra-ui/react';
import update from 'immutability-helper';
import { random } from 'lodash';
import { useRecoilCallback } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';
import { SavedTicket } from '../interfaces/client-ticket.interface';
import {
  ticketIdsSource,
  ticketMappingSource,
} from '../selectors/tickets.selectors';

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

export const useCreateTicket = () => {
  return useRecoilCallback(({ set }) => async (description: string) => {
    // first we create a local id, that we can use to find this ticket later after it has been saved
    const localId = -random(10_000);

    // we optimistically add it to the list
    const newTicket: SavedTicket = {
      id: localId,
      description,
      assigneeId: null,
      status: 'saving',
      completed: false,
    };
    set(ticketIdsSource, (ticketIds) =>
      update(ticketIds, { $push: [localId] })
    );
    set(ticketMappingSource, (mapping) =>
      update(mapping, { $merge: { [localId]: newTicket } })
    );

    // then we save
    try {
      const savedTicket = await firstValueFrom(
        backend.newTicket({ description })
      );

      // when done, we replace the old version with the new
      set(ticketIdsSource, (ticketIds) => {
        const ticketIndex = ticketIds.indexOf(localId);
        if (ticketIndex < 0) {
          return ticketIds;
        }

        return update(ticketIds, {
          $splice: [[ticketIndex, 1, savedTicket.id]],
        });
      });
      set(ticketMappingSource, (mapping) => {
        return update(mapping, {
          [savedTicket.id]: { $set: { ...savedTicket, status: 'saved' } },
          $unset: [localId],
        });
      });
    } catch {
      // The server rejected the ticket, so we remove it from the local version
      set(ticketIdsSource, (ticketIds) => {
        const ticketIndex = ticketIds.indexOf(localId);
        if (ticketIndex < 0) {
          return ticketIds;
        }

        const newTickets = ticketIds.slice();
        newTickets.splice(ticketIndex, 1);
        return newTickets;
      });
      set(ticketMappingSource, (mapping) =>
        update(mapping, { $unset: [localId] })
      );

      // and we warn the user
      toast({
        position: 'top-right',
        render: () => (
          <Box color="white" p={3} bg="red.300">
            Oh no, we couldn't save your ticket 😞
          </Box>
        ),
      });
    }
  });
};
