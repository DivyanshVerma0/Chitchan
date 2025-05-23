import React, { MouseEventHandler, useState } from "react";
import { Flex, Textarea, Button, Text, useColorMode } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";

type CommentInputProps = {
  comment: string;
  setComment: (value: string) => void;
  loading: boolean;
  user?: User | null;
  onCreateComment: (comment: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  comment,
  setComment,
  loading,
  user,
  onCreateComment,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1} color={colorMode === "dark" ? "dark.100" : undefined}>
            Comment as{" "}
            <span style={{ color: colorMode === "dark" ? "brand.100" : "#3182CE" }}>
              {user?.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            bg={colorMode === "dark" ? "dark.card" : "white"}
            color={colorMode === "dark" ? "dark.100" : undefined}
            borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
            _placeholder={{ color: colorMode === "dark" ? "dark.200" : "gray.500" }}
            _focus={{
              outline: "none",
              bg: colorMode === "dark" ? "dark.400" : "white",
              border: "1px solid",
              borderColor: colorMode === "dark" ? "brand.100" : "black",
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg={colorMode === "dark" ? "dark.400" : "gray.100"}
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!comment.length}
              isLoading={loading}
              onClick={() => onCreateComment(comment)}
              colorScheme={colorMode === "dark" ? "green" : undefined}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor={colorMode === "dark" ? "dark.300" : "gray.100"}
          p={4}
        >
          <Text fontWeight={600} color={colorMode === "dark" ? "dark.100" : undefined}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
