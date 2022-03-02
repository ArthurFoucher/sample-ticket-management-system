import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useToggleAssignee } from '../hooks/filters.hooks';
import { assigneesFilterSource } from '../selectors/filters.selectors';
import { userListSource } from '../selectors/users.selectors';

export const AddFilters: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userList = useRecoilValue(userListSource);
  const assignees = useRecoilValue(assigneesFilterSource);
  const toggleAssignee = useToggleAssignee();

  return (
    <>
      <Button onClick={onOpen}>
        <Text pr={1}>More filters</Text>
        <AddIcon fontWeight="bold" fontSize="sm" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter by assignee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box data-testid="assignee-filter-list">
              {userList.map(({ id, name }) => (
                <Badge
                  key={id}
                  as="button"
                  onClick={() => toggleAssignee(id)}
                  fontSize="sm"
                  m={1}
                  colorScheme={assignees.has(id) ? 'blue' : 'gray'}
                >
                  {name}
                </Badge>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Stack isInline w="100%">
              <Button ml="auto" size="sm" variant="ghost" onClick={onClose}>
                Exit
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
