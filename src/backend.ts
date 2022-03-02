import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

function randomDelay(delay: number) {
  return Math.random() * delay;
}

export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false,
    },
  ];

  storedUsers: User[] = [
    { id: 111, name: 'Victor' },
    { id: 112, name: 'Arthur' },
    { id: 113, name: 'Alex' },
    { id: 114, name: 'Hugo' },
  ];

  lastId = 1;

  constructor(private delay = 4000) {}

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay(this.delay)));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay(this.delay)));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay(this.delay)));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay(this.delay)));
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    return of(newTicket).pipe(
      delay(randomDelay(this.delay)),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number) {
    try {
      const foundTicket = this.findTicketById(+ticketId);
      const user = this.findUserById(+userId);

      return of(foundTicket).pipe(
        delay(randomDelay(this.delay)),
        tap((ticket: Ticket) => {
          ticket.assigneeId = user.id;
        })
      );
    } catch (e) {
      return throwError(() => new Error('ticket or user not found'));
    }
  }

  complete(ticketId: number, completed: boolean) {
    try {
      const foundTicket = this.findTicketById(+ticketId);
      return of(foundTicket).pipe(
        delay(randomDelay(this.delay)),
        tap((ticket: Ticket) => {
          ticket.completed = completed;
        })
      );
    } catch (e) {
      return throwError(() => new Error('ticket not found'));
    }
  }

  private findTicketById = (id: number) => {
    const found = this.storedTickets.find((ticket) => ticket.id === +id);
    if (found) {
      return found;
    }
    throw new Error(`Ticket (id=${id}) not found`);
  };

  private findUserById = (id: number) => {
    const found = this.storedUsers.find((user) => user.id === +id);
    if (found) {
      return found;
    }
    throw new Error(`User (id=${id}) not found`);
  };
}
