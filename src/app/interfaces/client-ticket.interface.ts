import { Ticket, User } from '../../backend';

type SavingStatus = 'saving' | 'saved';

export interface SavedTicket extends Ticket {
  status: SavingStatus;
}

export interface ClientTicket extends Omit<SavedTicket, 'assigneeId'> {
  assignee: User | null;
}
