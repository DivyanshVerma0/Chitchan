import React, { useState } from "react";
import { Button, Flex, Icon, Stack, Text, useColorMode, Spinner } from "@chakra-ui/react";
import { ChitchanLogoColored } from "../../components/Icons/ChitchanLogoColored";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import CreateCommunityModal from "../Modal/CreateCommunity";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";

const PersonalHome: React.FC = () => {
  const { colorMode } = useColorMode();
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleCreateCommunityClick = () => {
    setLoading(true);
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      setLoading(false);
    } else {
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        bg={colorMode === "dark" ? "dark.card" : "white"}
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor={colorMode === "dark" ? "dark.300" : "gray.300"}
        position="sticky"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="blue.500"
          height="34px"
          borderRadius="4px 4px 0px 0px"
          fontWeight={600}
          bgImage="url(/images/redditPersonalHome.png)"
          backgroundSize="cover"
        />
        <Flex direction="column" p="12px">
          <Flex align="center" mb={2}>
            <Icon as={ChitchanLogoColored} fontSize={50} mr={2} />
            <Text fontWeight={600}>Home</Text>
          </Flex>
          <Stack spacing={3}>
            <Text fontSize="9pt">
              Your personal Chitchan frontpage, built for you.
            </Text>
            <Button height="30px">Create Post</Button>
            <Button variant="outline" height="30px" onClick={handleCreateCommunityClick} isLoading={loading}>
              Create Community
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <CreateCommunityModal isOpen={open} handleClose={() => setOpen(false)} userId={user?.uid || ""} />
    </>
  );
};

export default PersonalHome;

