import { Spinner, Stack, Text } from '@chakra-ui/react';
import { random } from 'lodash';
import React, { useEffect, useState } from 'react';

const waitingMessages = [
  'Better late than never',
  'The early bird gets the worm',
  'The whole nine yards',
  "There's a method to this madness",
  'Once in a blue moon',
];

export const LoadingScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(() => random(waitingMessages.length - 1));
    }, 2500);

    return () => clearInterval(timeout);
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" m={20}>
      <Spinner width="7rem" height="7rem" color="gray.300" />
      <Text size="xl" color="gray.500" mt={3}>
        {waitingMessages[index]}...
      </Text>
    </Stack>
  );
};
