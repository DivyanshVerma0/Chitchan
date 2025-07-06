import React from "react";
import { Flex, Icon, MenuDivider, MenuItem, useColorMode } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { useResetRecoilState } from "recoil";
import { communityState } from "../../../../atoms/communitiesAtom";
import { auth } from "../../../../firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  const resetCommunityState = useResetRecoilState(communityState);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();

  const logout = async () => {
    await signOut(auth);
    resetCommunityState();
  };

  const goToProfile = () => {
    if (user) {
      const username = user.displayName || user.email?.split("@")[0];
      router.push(`/u/${username}`);
    }
  };

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: colorMode === "dark" ? "dark.400" : "gray.100" }}
        color={colorMode === "dark" ? "dark.100" : "inherit"}
        onClick={goToProfile}
      >
        <Flex alignItems="center">
          <Icon 
            fontSize={20} 
            mr={2} 
            as={CgProfile}
            color={colorMode === "dark" ? "dark.200" : "inherit"}
          />
          Profile
        </Flex>
      </MenuItem>
      <MenuDivider borderColor={colorMode === "dark" ? "dark.300" : "gray.200"} />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: colorMode === "dark" ? "dark.400" : "gray.100" }}
        color={colorMode === "dark" ? "dark.100" : "inherit"}
        onClick={logout}
      >
        <Flex alignItems="center">
          <Icon 
            fontSize={20} 
            mr={2} 
            as={MdOutlineLogin}
            color={colorMode === "dark" ? "dark.200" : "inherit"}
          />
          Log Out
        </Flex>
      </MenuItem>
    </>
  );
};
export default UserList;
