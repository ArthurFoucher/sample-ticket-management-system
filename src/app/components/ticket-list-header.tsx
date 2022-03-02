import { Stack } from '@chakra-ui/react';
import React from 'react';
import { AddFilters } from './add-filters';
import { DescriptionFilter } from './description-filter';

export const TicketListHeader: React.FC = () => {
  return (
    <Stack isInline>
      <DescriptionFilter />
      <AddFilters />
    </Stack>
  );
};
