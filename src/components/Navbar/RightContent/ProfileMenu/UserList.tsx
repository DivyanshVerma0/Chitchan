import React from "react";
import { Flex, Icon, MenuDivider, MenuItem, Switch, Text, useColorMode } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsMoon } from "react-icons/bs";
import { useResetRecoilState } from "recoil";
import { communityState } from "../../../../atoms/communitiesAtom";
import { auth } from "../../../../firebase/clientApp";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  const resetCommunityState = useResetRecoilState(communityState);
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = async () => {
    await signOut(auth);
    resetCommunityState();
  };

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "green.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={CgProfile} />
          Profile
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "green.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={IoSettingsOutline} />
          Settings
        </Flex>
      </MenuItem>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "green.500", color: "white" }}
      >
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Flex alignItems="center">
            <Icon fontSize={20} mr={2} as={BsMoon} />
            <Text>Dark Mode</Text>
          </Flex>
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            colorScheme="green"
          />
        </Flex>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "green.500", color: "white" }}
        onClick={logout}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Log Out
        </Flex>
      </MenuItem>
    </>
  );
};

export default UserList;
