import React from "react";
import { MenuItem, Flex, Icon, Text, Box } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import MenuListItem from "./MenuListItem";
import { CommunitySnippet } from "../../../atoms/communitiesAtom";
import { ChitchanLogo } from "../../../components/Icons/ChitchanLogo";

type MyCommunitiesProps = {
  snippets: CommunitySnippet[];
  setOpen: (value: boolean) => void;
};

const MyCommunities: React.FC<MyCommunitiesProps> = ({ snippets, setOpen }) => {
  return (
    <Box mt={3} mb={3}>
      <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
        MY COMMUNITIES
      </Text>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`c/${snippet.communityId}`}
          link={`c/${snippet.communityId}`}
          icon={ChitchanLogo}
          iconColor="blue.500"
        />
      ))}
    </Box>
  );
};
export default MyCommunities;
