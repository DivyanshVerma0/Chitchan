import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import AuthModal from "../Modal/Auth";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("gray.200", "#1A1A1B");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
