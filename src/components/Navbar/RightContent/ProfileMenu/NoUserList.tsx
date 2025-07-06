import React from "react";
import { MenuItem, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { MdOutlineLogin } from "react-icons/md";
import { AuthModalState } from "../../../../atoms/authModalAtom";

type NoUserListProps = {
  setModalState: (value: AuthModalState) => void;
};

const NoUserList: React.FC<NoUserListProps> = ({ setModalState }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: colorMode === "dark" ? "dark.400" : "gray.100" }}
        color={colorMode === "dark" ? "dark.100" : "inherit"}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        <Flex alignItems="center">
          <Icon 
            fontSize={20} 
            mr={2} 
            as={MdOutlineLogin}
            color={colorMode === "dark" ? "dark.200" : "inherit"}
          />
          Log In / Sign Up
        </Flex>
      </MenuItem>
    </>
  );
};
export default NoUserList;
