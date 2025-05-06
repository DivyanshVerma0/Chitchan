import { Flex, Icon, Input, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import useDirectory from "../../hooks/useDirectory";
import { ChitchanLogo } from "../../components/Icons/ChitchanLogo";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();
  const { colorMode } = useColorMode();

  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    const { community } = router.query;
    if (!community) {
      toggleMenuOpen();
      return;
    }
    router.push(`/c/${router.query.community}/submit`);
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg={colorMode === "dark" ? "dark.card" : "white"}
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor={colorMode === "dark" ? "dark.300" : "gray.300"}
      p={2}
      mb={4}
    >
      <Icon as={ChitchanLogo} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: colorMode === "dark" ? "dark.200" : "gray.500" }}
        _hover={{
          bg: colorMode === "dark" ? "dark.400" : "white",
          border: "1px solid",
          borderColor: colorMode === "dark" ? "dark.300" : "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: colorMode === "dark" ? "dark.400" : "white",
          border: "1px solid",
          borderColor: colorMode === "dark" ? "dark.300" : "blue.500",
        }}
        bg={colorMode === "dark" ? "dark.card" : "gray.50"}
        borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color={colorMode === "dark" ? "dark.200" : "gray.400"}
        cursor="pointer"
      />
      <Icon
        as={BsLink45Deg}
        fontSize={24}
        color={colorMode === "dark" ? "dark.200" : "gray.400"}
        cursor="pointer"
      />
    </Flex>
  );
};
export default CreatePostLink;
