import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useComplete } from '../hooks/tickets.hooks';
import { ticketsSource } from '../selectors/tickets.selectors';
import { Card } from './card';
import { TicketListHeader } from './ticket-list-header';
import { TicketsContainer } from './tickets-container';

export const TicketList: React.FC = () => {
  const tickets = useRecoilValue(ticketsSource);
  const onComplete = useComplete();

  return (
    <TicketsContainer Header={<TicketListHeader />}>
      {tickets.map((ticket) => (
        <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
          <Card
            ticket={ticket}
            onComplete={(completed) => onComplete(ticket.id, completed)}
          />
        </Link>
      ))}
    </TicketsContainer>
  );
};
