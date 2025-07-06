import React from "react";
import { Flex, Icon, Text, Stack, Button, useColorMode } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Flex
      direction="column"
      bg={colorMode === "dark" ? "dark.card" : "white"}
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor={colorMode === "dark" ? "dark.300" : "gray.300"}
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="brand.100" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>Chitchan Premium</Text>
          <Text>The best Chitchan experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      <Button height="30px" bg="brand.100">
        Try Now
      </Button>
    </Flex>
  );
};

export default Premium;
