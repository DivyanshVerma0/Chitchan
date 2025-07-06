// Importing the type definition for Chakra UI component styling.
import type { ComponentStyleConfig } from "@chakra-ui/theme";

// Custom style configuration for the Chakra UI Input component.
export const Input: ComponentStyleConfig = {
  baseStyle: {
    // Styling for the main input field
    field: {
      fontSize: "10pt", // Sets a smaller font size for the input text
      bg: "gray.50", // Light gray background color
      _placeholder: {
        color: "gray.500", // Medium gray color for placeholder text
      },
      _hover: {
        bg: "white", // Changes background to white when hovered
        border: "1px solid", // Adds a border on hover
        borderColor: "blue.500", // Blue border color on hover
      },
      _focus: {
        outline: "none", // Removes default focus outline
        border: "1px solid", // Adds a border on focus
        borderColor: "blue.500", // Blue border color on focus
      },
    },
    // Styling for input addons (e.g., icons or labels inside the input group)
    addons: {
      height: "30px", // Sets a fixed height for addons
    },
  },
  sizes: {
    md: {
      field: {
        // Applies to the medium size variant of the Input
        // height: "30px", // Optionally set a height (currently commented out)
        fontSize: "10pt", // Same small font size for medium inputs
      },
    },
  },
  variants: {
    // Custom variants can be added here if needed
  },
  defaultProps: {
    variant: undefined, // No default variant is set
  },
};
