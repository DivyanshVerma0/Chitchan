import React from "react";
import { Box, Button, Flex, Icon, Text, Image, useColorMode } from "@chakra-ui/react";
import { Community, communityState } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";
import { useSetRecoilState } from "recoil";
import { ChitchanLogoColored } from "../../components/Icons/ChitchanLogoColored";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {

  const { communityStateValue, loading, error, onJoinLeaveCommunity } =
    useCommunityData(!!communityData);
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg={colorMode === "dark" ? "dark.400" : "brand.100"} />
      <Flex justifyContent="center" bg={colorMode === "dark" ? "dark.card" : "white"} height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA-USE ICON AT FIRST */}
          {communityStateValue.currentCommunity.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={ChitchanLogoColored}
              fontSize={64}
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                c/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
