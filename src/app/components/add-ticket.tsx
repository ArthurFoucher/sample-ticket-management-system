import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface Props {
  onAdd: (description: string) => void;
}

export const AddTicket: React.FC<Props> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAdding) {
        setIsAdding(false);
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isAdding]);

  if (!isAdding) {
    return (
      <IconButton
        data-testid="add-card-button"
        variant="ghost"
        aria-label="create a new ticket"
        onClick={() => setIsAdding(true)}
        icon={<AddIcon />}
      />
    );
  } else {
    return (
      <Stack
        m={4}
        p={2}
        w="400px"
        borderRadius="sm"
        boxShadow="md"
        justifyContent="center"
        backgroundColor="white"
      >
        <CardForm
          onSubmit={(text) => {
            onAdd(text);
            setIsAdding(false);
          }}
        />
      </Stack>
    );
  }
};

const CardForm: React.FC<{ onSubmit: (text: string) => void }> = ({
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value: string = (e.currentTarget as any).elements.description
          .value;
        if (value && value.length > 0) {
          onSubmit(value);
        }
      }}
    >
      <FormLabel htmlFor="description" data-testid="description-label">
        Description
      </FormLabel>
      <InputGroup size="md">
        <Input id="description" placeholder="Enter description" autoFocus />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" type="submit">
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
