import { Stack } from '@chakra-ui/react';
import React from 'react';
import { AddFilters } from './AddFilters';
import { DescriptionFilter } from './DescriptionFilter';

export const TicketListHeader: React.FC = () => {
  return (
    <Stack isInline>
      <DescriptionFilter />
      <AddFilters />
    </Stack>
  );
};
