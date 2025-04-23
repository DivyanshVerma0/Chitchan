import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
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

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={999}
      borderBottom="1px solid"
      borderColor="gray.200"
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
          color="gray.800"
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
