import React from 'react';
import { useRecoilValue } from 'recoil';
import { useComplete } from '../hooks/tickets.hooks';
import { ticketsSource } from '../selectors/tickets.selectors';
import { Card } from './card';
import { TicketsContainer } from './tickets-container';

export const TicketManager: React.FC = () => {
  const tickets = useRecoilValue(ticketsSource);

  const onComplete = useComplete();

  return (
    <TicketsContainer>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          ticket={ticket}
          onClick={() => console.log(`ticketId ${ticket.id} clicked`)}
          onComplete={(completed) => onComplete(ticket.id, completed)}
        />
      ))}
    </TicketsContainer>
  );
};
