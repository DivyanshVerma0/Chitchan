import React from 'react';
import { Flex } from '@chakra-ui/react';

const PostItem = ({ post, onSelectPost, colorMode }) => {
  return (
    <Flex
      border="1px solid"
      bg={colorMode === "dark" ? "dark.card" : "white"}
      borderColor={colorMode === "dark" ? "dark.300" : "gray.300"}
      borderRadius={4}
      _hover={{
        borderColor: colorMode === "dark" ? "dark.200" : "gray.500",
      }}
      cursor="pointer"
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      {/* Rest of the component content */}
    </Flex>
  );
};

export default PostItem; 