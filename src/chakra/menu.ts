// Importing Chakra UI's predefined structure (anatomy) for the Menu component
import { menuAnatomy } from '@chakra-ui/anatomy'

// Importing helpers to create multi-part style configurations
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

// Destructuring utility functions to define styles and configurations for multi-part components
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// Defining base styles for each part of the Menu component
const baseStyle = definePartsStyle({
  // Styles for the dropdown list container
  list: {
    bg: "dark.500",          // Dark background
    borderColor: "dark.400", // Border color
    padding: "0",            // No padding
  },
  // Styles for each menu item
  item: {
    bg: "transparent",       // Transparent background
    color: "gray.500",       // Gray text color
    fontSize: "10pt",        // Smaller font size
    fontWeight: 500,         // Medium-bold weight
    _hover: {
      bg: "dark.400",        // Darker background on hover
    },
    _dark: {
      color: "whiteAlpha.700", // Light text in dark mode
    }
  },
  // Styles for dividers between menu items
  divider: {
    borderColor: "dark.400", // Divider color
  },
})

// Exporting the complete style configuration for the Menu component
export const Menu = defineMultiStyleConfig({
  baseStyle,
})
