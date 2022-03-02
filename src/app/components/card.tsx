import { Badge, Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Ticket } from '../../backend';

interface Props {
  ticket: Ticket;
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
      onClick={onClick}
    >
      <Stack isInline justifyContent="space-between">
        <Text color="gray.500">Task id: {ticket.id}</Text>
        <Box>
          <Badge
            as="button"
            colorScheme={ticket.completed ? 'green' : 'gray'}
            onClick={() => onComplete(!ticket.completed)}
          >
            {ticket.completed ? 'Done' : 'Todo'}
          </Badge>
          {ticket.assigneeId && <Badge ml={2}>{ticket.assigneeId}</Badge>}
        </Box>
      </Stack>

      <Text>{ticket.description}</Text>
    </Box>
  );
};
