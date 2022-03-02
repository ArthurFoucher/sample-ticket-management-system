import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ticketMappingSource } from '../selectors/tickets.selectors';
import { TicketsContainer } from './tickets-container';

export const TicketDetails: React.FC = () => {
  const params = useParams();
  const ticketMapping = useRecoilValue(ticketMappingSource);

  if (
    params['ticketId'] == null ||
    ticketMapping[+params['ticketId']] == null
  ) {
    return null;
  }
  const ticket = ticketMapping[+params['ticketId']];

  return (
    <TicketsContainer>
      <Box alignItems="center" p={6}>
        <Text size="3xl" fontWeight="semibold">
          Ticket Details
        </Text>
      </Box>
      <Box boxShadow="sm" p={6} backgroundColor="white">
        <Stack>
          <Stack alignItems="center" isInline>
            <Text size="lg" fontWeight="semibold">
              Description:
            </Text>
            <Box>{ticket?.description}</Box>
          </Stack>
          <Stack alignItems="center" isInline>
            <Text size="lg" fontWeight="semibold">
              Completed:{' '}
            </Text>
            <Text size="lg">{ticket.completed ? 'yes' : 'no'}</Text>
          </Stack>
          <Stack alignItems="center" isInline>
            <Text size="lg" fontWeight="semibold">
              Assignee:{' '}
            </Text>
            <Text size="lg">{ticket.assigneeId}</Text>
          </Stack>
        </Stack>
      </Box>
    </TicketsContainer>
  );
};
