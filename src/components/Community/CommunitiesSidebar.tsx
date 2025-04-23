import React, { useState } from "react";
import { Box, Flex, Icon, Stack, Text, Button } from "@chakra-ui/react";
import { ChitchanLogo } from "../Icons/ChitchanLogo";

type CommunitiesSidebarProps = {};

const CommunitiesSidebar: React.FC<CommunitiesSidebarProps> = () => {
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);

  // Example community data
  const communities = {
    favorites: [
      "Photography",
      "TechTalks",
      "GameDev",
    ],
    trending: [
      "ArtisanCrafts",
      "FutureTech",
      "SpaceExploration",
      "CulinaryArts",
      "UrbanGardening",
    ],
    popular: [
      "MusicProduction",
      "DIYProjects",
      "SustainableLiving",
      "DigitalNomads",
      "CreativeWriting",
      "WebDevelopment",
      "MentalWellness",
    ],
  };

  const renderCommunityList = (communities: string[], showAll: boolean = false) => {
    const displayCommunities = showAll ? communities : communities.slice(0, 3);
    return (
      <Stack spacing={2}>
        {displayCommunities.map((community) => (
          <Flex
            key={community}
            align="center"
            p="2"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            borderRadius="md"
          >
            <Icon as={ChitchanLogo} fontSize={20} mr={2} color="green.500" />
            <Text fontSize="10pt">c/{community}</Text>
          </Flex>
        ))}
      </Stack>
    );
  };

  return (
    <Box
      position="sticky"
      top="14px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      bg="white"
      p={3}
    >
      <Stack spacing={4}>
        <Box>
          <Text fontSize="10pt" fontWeight={600} color="green.500" mb={2}>
            FAVORITES
          </Text>
          {renderCommunityList(communities.favorites)}
        </Box>

        <Box>
          <Text fontSize="10pt" fontWeight={600} color="green.500" mb={2}>
            TRENDING COMMUNITIES
          </Text>
          {renderCommunityList(communities.trending, showAllTrending)}
          <Button 
            size="sm" 
            width="100%" 
            mt={2} 
            variant="outline"
            onClick={() => setShowAllTrending(!showAllTrending)}
          >
            {showAllTrending ? "Show Less" : "See More"}
          </Button>
        </Box>

        <Box>
          <Text fontSize="10pt" fontWeight={600} color="green.500" mb={2}>
            POPULAR COMMUNITIES
          </Text>
          {renderCommunityList(communities.popular, showAllPopular)}
          <Button 
            size="sm" 
            width="100%" 
            mt={2} 
            variant="outline"
            onClick={() => setShowAllPopular(!showAllPopular)}
          >
            {showAllPopular ? "Show Less" : "See All Communities"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommunitiesSidebar; 


//