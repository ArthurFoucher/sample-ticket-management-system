import { Badge, Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { ClientTicket } from '../interfaces/client-ticket.interface';

interface Props {
  ticket: ClientTicket;
  onClick: () => void;
  onComplete: (completed: boolean) => void;
}

export const Card: React.FC<Props> = ({ ticket, onClick, onComplete }) => {
  return (
    <Box
      mt={2}
      p={2}
      boxShadow="md"
      w="400px"
      borderRadius="sm"
      backgroundColor={ticket.status === 'saving' ? 'gray.50' : 'white'}
      pointerEvents={ticket.status === 'saving' ? 'none' : 'auto'}
      onClick={(e) => {
        if (e.defaultPrevented) {
          return;
        }
        onClick();
      }}
    >
      <Stack isInline justifyContent="space-between">
        <Text color="gray.500">Task id: {ticket.id}</Text>
        <Box>
          <Badge
            as="button"
            colorScheme={ticket.completed ? 'green' : 'gray'}
            onClick={(e) => {
              e.preventDefault();
              onComplete(!ticket.completed);
            }}
          >
            {ticket.completed ? 'Done' : 'Todo'}
          </Badge>
          {ticket.assignee && <Badge ml={2}>{ticket.assignee.name}</Badge>}
        </Box>
      </Stack>

      <Text>{ticket.description}</Text>
    </Box>
  );
};
