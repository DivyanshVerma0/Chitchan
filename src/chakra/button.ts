import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "brand.100",
      _hover: {
        bg: "brand.200",
      },
      _dark: {
        bg: "dark.200",
        color: "dark.100",
        _hover: {
          bg: "dark.400",
        },
      },
    },
    outline: {
      color: "brand.100",
      border: "1px solid",
      borderColor: "brand.100",
      _hover: {
        bg: "brand.50",
      },
      _dark: {
        color: "dark.200",
        borderColor: "dark.300",
        _hover: {
          bg: "dark.400",
          borderColor: "dark.200",
        },
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
      _dark: {
        borderColor: "dark.300",
        _hover: {
          bg: "dark.400",
        },
      },
    },
    dark: {
      bg: "dark.500",
      color: "dark.100",
      _hover: {
        bg: "dark.400",
      },
    },
    menuItem: {
      height: "auto",
      width: "95%",
      margin: "0 auto",
      fontSize: "10pt",
      justifyContent: "flex-start",
      bg: "transparent",
      color: "gray.500",
      fontWeight: 500,
      padding: "4px 8px",
      _hover: {
        bg: "gray.100",
      },
      _dark: {
        color: "whiteAlpha.700",
        _hover: {
          bg: "dark.400",
        },
      },
    },
  },
};
