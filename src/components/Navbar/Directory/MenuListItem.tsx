import React from "react";
import { Flex, Icon, Button, Image, useColorMode } from "@chakra-ui/react";
import { IconType } from "react-icons";
import useDirectory from "../../../hooks/useDirectory";

type DirectoryItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<DirectoryItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  const { colorMode } = useColorMode();

  return (
    <Button
      width="100%"
      variant="menuItem"
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex alignItems="center">
        {imageURL ? (
          <Image borderRadius="full" boxSize="18px" src={imageURL} mr={2} />
        ) : (
          <Icon 
            fontSize={20} 
            mr={2} 
            as={icon} 
            color={colorMode === "dark" ? "dark.200" : iconColor} 
          />
        )}
        {displayText}
      </Flex>
    </Button>
  );
};
export default MenuListItem;
