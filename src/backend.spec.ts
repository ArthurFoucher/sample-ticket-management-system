import { firstValueFrom } from 'rxjs';
import { BackendService, Ticket } from './backend';

describe('BackendService', () => {
  let backend: BackendService;

  const storedTickets: Ticket[] = [
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

  const storedUsers = [
    { id: 111, name: 'Victor' },
    { id: 112, name: 'Arthur' },
    { id: 113, name: 'Alex' },
    { id: 114, name: 'Hugo' },
  ];

  beforeEach(() => {
    backend = new BackendService(0); // we disable the random delay to make testing simpler
  });

  it('should initialize', () => {
    expect(backend).not.toBeNull();
  });

  it('should return the list of tickets', async () => {
    expect(backend.storedTickets).toEqual(storedTickets);

    expect(await firstValueFrom(backend.tickets())).toEqual(storedTickets);
  });

  it('should find a ticket by its id', async () => {
    expect(await firstValueFrom(backend.ticket(0))).toEqual(storedTickets[0]);
  });

  it('should error when no ticket matches an id', async () => {
    try {
      await firstValueFrom(backend.ticket(120));
    } catch (e) {
      expect((e as ErrorEvent).message).toEqual('Ticket (id=120) not found');
    }
  });

  it('should return the list of users', async () => {
    expect(backend.storedUsers).toEqual(storedUsers);

    expect(await firstValueFrom(backend.users())).toEqual(storedUsers);
  });

  it('should find a user by its id', async () => {
    expect(await firstValueFrom(backend.user(111))).toEqual(storedUsers[0]);
  });

  it('should error when no user matches an id', async () => {
    try {
      await firstValueFrom(backend.user(120));
    } catch (e) {
      expect((e as ErrorEvent).message).toEqual('User (id=120) not found');
    }
  });

  it('should create a ticket', async () => {
    await firstValueFrom(
      backend.newTicket({ description: 'a brand new ticket' })
    );

    expect(await firstValueFrom(backend.ticket(2))).toEqual({
      id: 2,
      description: 'a brand new ticket',
      assigneeId: null,
      completed: false,
    });
  });

  describe('assign', () => {
    const ticketId = storedTickets[0].id;
    const userId = storedUsers[0].id;

    it('should assign a user to a ticket', async () => {
      await firstValueFrom(backend.assign(ticketId, userId));
      expect(await firstValueFrom(backend.ticket(ticketId))).toEqual({
        ...storedTickets[0],
        assigneeId: userId,
      });
    });

    it('should fail when the user id does not match', async () => {
      try {
        await firstValueFrom(backend.assign(ticketId, 10_000));
      } catch (e) {
        expect((e as ErrorEvent).message).toEqual('ticket or user not found');
      }
    });

    it('should fail when the ticket id does not match', async () => {
      try {
        await firstValueFrom(backend.assign(2_000, ticketId));
      } catch (e) {
        expect((e as ErrorEvent).message).toEqual('ticket or user not found');
      }
    });
  });

  describe('complete', () => {
    const ticketId = storedTickets[0].id;

    it('should complete a ticket', async () => {
      await firstValueFrom(backend.complete(ticketId, true));
      expect(await firstValueFrom(backend.ticket(ticketId))).toEqual({
        ...storedTickets[0],
        completed: true,
      });
    });

    it('should fail when the ticket id does not match', async () => {
      try {
        await firstValueFrom(backend.complete(10_000, true));
      } catch (e) {
        expect((e as ErrorEvent).message).toEqual('ticket not found');
      }
    });
  });
});
