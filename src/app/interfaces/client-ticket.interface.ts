import { Ticket, User } from '../../backend';

export interface ClientTicket extends Omit<Ticket, 'assigneeId'> {
  assignee: User | null;
}
