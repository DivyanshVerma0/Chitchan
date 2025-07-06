import React, { useState } from "react";
import { Box, Flex, Icon, MenuItem, Text, useColorMode, Button } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import { auth } from "../../../firebase/clientApp";
import CreateCommunityModal from "../../Modal/CreateCommunity";
import MenuListItem from "./MenuListItem";
import { ChitchanLogo } from "../../../components/Icons/ChitchanLogo";

type CommunitiesProps = {
  menuOpen: boolean;
};

const Communities: React.FC<CommunitiesProps> = ({ menuOpen }) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  const { colorMode } = useColorMode();

  return (
    <>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
        userId={user?.uid!}
      />
      {/* COULD DO THIS FOR CLEANER COMPONENTS */}
      {/* <Moderating snippets={snippetState.filter((item) => item.isModerator)} />
      <MyCommunities snippets={snippetState} setOpen={setOpen} /> */}
      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={3} mb={4} maxW="200px" mx="auto">
          <Text 
            pl={3} 
            mb={1} 
            fontSize="7pt" 
            fontWeight={500} 
            color={colorMode === "dark" ? "dark.200" : "gray.500"}
          >
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`c/${snippet.communityId}`}
                link={`/c/${snippet.communityId}`}
                icon={ChitchanLogo}
                iconColor={colorMode === "dark" ? "dark.200" : "brand.100"}
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={4} maxW="200px" mx="auto">
        <Text 
          pl={3} 
          mb={1} 
          fontSize="7pt" 
          fontWeight={500} 
          color={colorMode === "dark" ? "dark.200" : "gray.500"}
        >
          MY COMMUNITIES
        </Text>
        <Button
          width="100%"
          fontSize="10pt"
          variant="menuItem"
          onClick={() => setOpen(true)}
        >
          <Flex alignItems="center">
            <Icon 
              fontSize={20} 
              mr={2} 
              as={GrAdd} 
              color={colorMode === "dark" ? "dark.200" : "inherit"}
              filter={colorMode === "dark" ? "invert(1)" : "none"}
            />
            Create Community
          </Flex>
        </Button>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={ChitchanLogo}
            displayText={`c/${snippet.communityId}`}
            link={`/c/${snippet.communityId}`}
            iconColor={colorMode === "dark" ? "dark.200" : "brand.100"}
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
