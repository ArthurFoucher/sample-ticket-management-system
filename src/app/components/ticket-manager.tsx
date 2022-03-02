import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TicketDetails } from './ticket-details';
import { TicketList } from './ticket-list';

export const TicketManager: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketList />} />
      <Route path="/tickets/:ticketId" element={<TicketDetails />} />
    </Routes>
  );
};
