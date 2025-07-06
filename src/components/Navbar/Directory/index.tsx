import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { colorMode } = useColorMode();
  const { directoryState, toggleMenuOpen } = useDirectory();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ 
              bg: colorMode === "dark" ? "dark.400" : "gray.50",
              outline: "1px solid", 
              outlineColor: colorMode === "dark" ? "dark.300" : "gray.200" 
            }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={toggleMenuOpen}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex alignItems="center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="24px"
                      src={directoryState.selectedMenuItem.imageURL}
                      mr={2}
                    />
                  ) : (
                    <Icon
                      fontSize={24}
                      mr={{ base: 1, md: 2 }}
                      color={colorMode === "dark" ? "dark.200" : directoryState.selectedMenuItem.iconColor}
                      as={directoryState.selectedMenuItem.icon}
                    />
                  )}
                  <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDirection="column"
                    fontSize="10pt"
                  >
                    <Text fontWeight={600} color={colorMode === "dark" ? "dark.100" : "inherit"}>
                      {directoryState.selectedMenuItem.displayText}
                    </Text>
                  </Box>
                </>
              </Flex>
              <ChevronDownIcon color={colorMode === "dark" ? "dark.200" : "gray.500"} />
            </Flex>
          </MenuButton>
          <MenuList 
            maxHeight="300px" 
            overflow="scroll" 
            overflowX="hidden"
            bg={colorMode === "dark" ? "dark.500" : "white"}
            borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
          >
            <Communities menuOpen={isOpen} />
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Directory;
