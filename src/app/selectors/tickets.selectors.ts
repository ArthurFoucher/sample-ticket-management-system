import { keyBy } from 'lodash';
import { atom, selector } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';
import {
  ClientTicket,
  SavedTicket,
} from '../interfaces/client-ticket.interface';
import { userMappingSource } from './users.selectors';

const fetchTickets = firstValueFrom(backend.tickets()).then((tickets) =>
  tickets.map((ticket): SavedTicket => ({ ...ticket, status: 'saved' }))
);

export const ticketIdsSource = atom({
  key: 'ticketIds',
  default: fetchTickets.then((tickets) => tickets.map(({ id }) => id)),
});

export const ticketMappingSource = atom({
  key: 'ticketMapping',
  default: fetchTickets.then((tickets) =>
    keyBy(tickets, (ticket) => ticket.id)
  ),
});

export const ticketsSource = selector({
  key: 'tickets',
  get: ({ get }) => {
    const ids = get(ticketIdsSource);
    const ticketMapping = get(ticketMappingSource);
    const userMapping = get(userMappingSource);

    return ids
      .map((id) => ticketMapping[id])
      .filter((ticket) => ticket != null)
      .map(
        ({ id, description, completed, assigneeId, status }): ClientTicket => ({
          id,
          description,
          completed,
          assignee: assigneeId ? userMapping[assigneeId] : null,
          status,
        })
      );
  },
});
