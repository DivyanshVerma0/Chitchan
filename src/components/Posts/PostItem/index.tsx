import { Stack, Box, Flex, Text, Image, Icon } from "@chakra-ui/react";

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {
  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        // ... existing code ...
      </Flex>
      <Flex direction="column" width="100%">
        // ... existing code ...
        <Stack
          direction="row"
          spacing={0.6}
          align="center"
          fontSize="9pt"
          color="gray.500"
        >
          // ... existing code ...
        </Stack>
      </Flex>
    </Flex>
  );
}; 