import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Icon,
  Flex,
  MenuDivider,
  Text,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useRouter } from "next/router";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color={colorMode === "dark" ? "dark.200" : "gray.300"}
                  as={CgProfile}
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Icon as={ChevronDownIcon} color="gray.400" />
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={CgProfile} />
            )}
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList maxW="200px">
        {user ? (
          <>
            <Button 
              variant="menuItem" 
              width="100%"
              onClick={() => router.push(`/u/${user.uid}`)}
            >
              <Flex align="center">
                <Icon 
                  fontSize={20} 
                  mr={2} 
                  as={CgProfile} 
                  color={colorMode === "dark" ? "dark.200" : "gray.500"}
                />
                <Text fontSize="10pt" fontWeight={500}>
                  Profile
                </Text>
              </Flex>
            </Button>
            <Button 
              variant="menuItem" 
              width="100%"
              onClick={() => {
                console.log("Navigating to profile settings");
                router.push("/profile/settings");
              }}
              bg={colorMode === "dark" ? "#272729" : "gray.100"}
              color={colorMode === "dark" ? "#D7DADC" : "inherit"}
              _hover={{ 
                bg: colorMode === "dark" ? "#343536" : "gray.200"
              }}
            >
              <Flex align="center">
                <Icon 
                  fontSize={20} 
                  mr={2} 
                  as={FiSettings} 
                  color={colorMode === "dark" ? "#D7DADC" : "gray.600"}
                />
                <Text fontSize="10pt" fontWeight={500}>
                  Profile Settings
                </Text>
              </Flex>
            </Button>
            <MenuDivider />
            <Button variant="menuItem" width="100%" onClick={() => signOut(auth)}>
              <Flex align="center">
                <Icon 
                  fontSize={20} 
                  mr={2} 
                  as={MdOutlineLogin} 
                  color={colorMode === "dark" ? "dark.200" : "gray.500"}
                />
                <Text fontSize="10pt" fontWeight={500}>
                  Log Out
                </Text>
              </Flex>
            </Button>
          </>
        ) : (
          <Button
            variant="menuItem"
            width="100%"
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex align="center">
              <Icon 
                fontSize={20} 
                mr={2} 
                as={MdOutlineLogin} 
                color={colorMode === "dark" ? "dark.200" : "gray.500"}
              />
              <Text fontSize="10pt" fontWeight={500}>
                Log In / Sign Up
              </Text>
            </Flex>
          </Button>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu; 