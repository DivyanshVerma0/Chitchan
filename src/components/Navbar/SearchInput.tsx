import React from "react";
import { Flex, InputGroup, InputLeftElement, Input, useColorMode } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color={colorMode === "dark" ? "dark.200" : "gray.400"} mb={1} />}
        />
        <Input
          placeholder="Search Chitchan"
          fontSize="10pt"
          _placeholder={{ color: colorMode === "dark" ? "dark.200" : "gray.500" }}
          _hover={{
            bg: colorMode === "dark" ? "dark.card" : "white",
            border: "1px solid",
            borderColor: colorMode === "dark" ? "dark.300" : "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: colorMode === "dark" ? "dark.300" : "blue.500",
          }}
          height="34px"
          bg={colorMode === "dark" ? "dark.card" : "gray.50"}
          border="1px solid"
          borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
//ak //ak //ak //ak
