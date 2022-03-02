import React from 'react';
import { backend } from '../clients/backend.client';
import { Card } from './card';

export const TicketManager: React.FC = () => {
  const tickets = backend.storedTickets;
  return (
    <>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          ticket={ticket}
          onClick={() => console.log(`ticketId ${ticket.id} clicked`)}
          onComplete={(completed) =>
            console.log(`ticketId ${ticket.id} set to ${completed}`)
          }
        />
      ))}
    </>
  );
};
