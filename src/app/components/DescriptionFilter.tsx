import { Box, Input, InputGroup } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { descriptionFilterSource } from '../selectors/filters.selectors';

export const DescriptionFilter: React.FC = () => {
  const setDescription = useSetRecoilState(descriptionFilterSource);

  return (
    <Box>
      <InputGroup size="md">
        <Input
          data-testid="description-filter"
          placeholder="Filter by task description"
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
      </InputGroup>
    </Box>
  );
};
