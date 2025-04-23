import React from "react";
import { Flex, Icon, Text, Stack, Button } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="green.500" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>Chitchan Premium</Text>
          <Text>The best Chitchan experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      <Button height="30px" colorScheme="green">
        Try Now
      </Button>
    </Flex>
  );
};

export default Premium;
