import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  maxWidth?: string;
  children: ReactNode[];
}

const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "1200px"}>
        {/* Left Sidebar */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          width={{ md: "200px" }}
          mr={6}
        >
          {children[0]}
        </Box>
        {/* Main Content */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "640px" }}
          mr={{ base: 0, md: 6 }}
        >
          {children[1]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children[2]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
