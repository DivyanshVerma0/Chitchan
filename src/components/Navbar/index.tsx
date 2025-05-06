import React from "react";
import { Box, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  defaultMenuItem,
  directoryMenuState,
} from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";
import { ChitchanLogoColored } from "../../components/Icons/ChitchanLogoColored";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  const { colorMode } = useColorMode();

  return (
    <Flex
      bg={colorMode === "dark" ? "dark.500" : "white"}
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
      borderBottom="1px solid"
      borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <ChitchanLogoColored boxSize="32px" />
        <Text
          display={{ base: "none", md: "unset" }}
          fontSize="18px"
          fontWeight={600}
          color={colorMode === "dark" ? "dark.100" : "gray.800"}
          ml={2}
        >
          chitchan
        </Text>
      </Flex>
      {user && <Directory />}
      <SearchInput user={user as User} />
      <RightContent user={user as User} />
    </Flex>
  );
};
 

export default Navbar;

