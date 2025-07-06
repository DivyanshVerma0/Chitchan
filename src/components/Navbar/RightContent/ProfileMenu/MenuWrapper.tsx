import React from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/authModalAtom";
import { auth } from "../../../../firebase/clientApp";

import NoUserList from "./NoUserList";
import UserList from "./UserList";

import { ChitchanLogo } from "../../../../components/Icons/ChitchanLogo";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";

type MenuWrapperProps = {};

const MenuWrapper: React.FC<MenuWrapperProps> = () => {
  const [authModal, setModalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ 
          bg: colorMode === "dark" ? "dark.400" : "gray.50",
          outline: "1px solid", 
          outlineColor: colorMode === "dark" ? "dark.300" : "gray.200" 
        }}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color={colorMode === "dark" ? "dark.200" : "gray.300"}
                  as={ChitchanLogo}
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700} color={colorMode === "dark" ? "dark.100" : "inherit"}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color={colorMode === "dark" ? "dark.200" : "gray.400"}>1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon 
                fontSize={24} 
                mr={1} 
                color={colorMode === "dark" ? "dark.200" : "gray.400"} 
                as={VscAccount} 
              />
            )}
          </Flex>
          <ChevronDownIcon color={colorMode === "dark" ? "dark.200" : "gray.500"} />
        </Flex>
      </MenuButton>
      <MenuList
        bg={colorMode === "dark" ? "dark.500" : "white"}
        borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
      >
        {user ? <UserList /> : <NoUserList setModalState={setModalState} />}
      </MenuList>
    </Menu>
  );
};
export default MenuWrapper;
