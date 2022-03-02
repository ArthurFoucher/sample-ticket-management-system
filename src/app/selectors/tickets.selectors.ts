import { keyBy } from 'lodash';
import { atom, selector } from 'recoil';
import { firstValueFrom } from 'rxjs';
import { backend } from '../clients/backend.client';
import {
  ClientTicket,
  SavedTicket,
} from '../interfaces/client-ticket.interface';
import {
  assigneesFilterSource,
  descriptionFilterSource,
} from './filters.selectors';
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
    const descriptionFilter = get(descriptionFilterSource).toLocaleLowerCase();
    const assignees = get(assigneesFilterSource);

    return ids
      .map((id) => ticketMapping[id])
      .filter((ticket) => ticket != null)
      .filter(({ description }) =>
        description.toLocaleLowerCase().includes(descriptionFilter)
      )
      .filter(({ assigneeId }) => {
        if (assignees.size === 0) {
          return true;
        }
        if (assigneeId == null) {
          return false;
        }
        return assignees.has(assigneeId);
      })
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
