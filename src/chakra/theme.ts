// Importing necessary Chakra utilities and types
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Importing custom component styles
import { Button } from "./button";
import { Input } from "./input";
import { Menu } from "./menu";

// Theme configuration to set initial color mode and whether to follow system preference
const config: ThemeConfig = {
  initialColorMode: "light",       // Start in light mode by default
  useSystemColorMode: false,       // Do not use system color mode settings
};

// Extending the default Chakra theme
export const theme = extendTheme({
  config,

  // Custom color palette
  colors: {
    brand: {
      50: "#F0FFF4",  // Lightest brand color
      100: "#38A169",
      200: "#48BB78",
      300: "#38A169",
      400: "#2F855A",
      500: "#276749", // Darkest brand color
    },
    dark: {
      100: "#D7DADC",      // Lightest gray for dark mode
      200: "#818384",
      300: "#343536",
      400: "#272729",
      500: "#1A1A1B",      // Main background color for dark mode
      600: "#030303",      // Almost black
      card: "#1E1F20",     // Card background in dark mode
    },
  },

  // Custom fonts
  fonts: {
    body: "Open Sans, sans-serif",  // Body font family
  },

  // Global styles for the application
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.500" : "gray.200",      // Body background based on color mode
        color: props.colorMode === "dark" ? "dark.100" : "gray.900",   // Body text color based on color mode
      },
      "html, body": {
        bg: props.colorMode === "dark" ? "dark.500" : "gray.200",
        color: props.colorMode === "dark" ? "dark.100" : "gray.900",
      },
    }),
  },

  // Custom component themes
  components: {
    Button, // Custom button styles
    Menu,   // Custom menu styles
    // Input, // Not working for now - needs to be debugged later
  },

  // Semantic tokens for consistent theming across light/dark modes
  semanticTokens: {
    colors: {
      "chakra-body-text": { _light: "gray.900", _dark: "dark.100" },
      "chakra-body-bg": { _light: "gray.200", _dark: "dark.500" },
      "chakra-border-color": { _light: "gray.200", _dark: "dark.300" },
      "chakra-placeholder-color": { _light: "gray.500", _dark: "dark.200" },
    },
  },

  // Layer styles for reusable component style patterns
  layerStyles: {
    card: {
      bg: { _light: "white", _dark: "dark.card" },              // Card background
      border: "1px solid",
      borderColor: { _light: "gray.200", _dark: "dark.300" },   // Card border color
    },
    cardHover: {
      _hover: {
        bg: { _light: "gray.50", _dark: "dark.400" },           // Hover state for cards
      }
    }
  },
});
