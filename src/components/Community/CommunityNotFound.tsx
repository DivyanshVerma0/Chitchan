import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router"; // Import useRouter

const CommunityNotFound: React.FC = () => {
  const router = useRouter(); // Get router instance

  const handleGoHome = () => {
    // Only push if not already on the home page
    if (router.pathname !== "/") {
      router.push("/");
    }
    // If already on home page, clicking the button does nothing
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Sorry, that community does not exist or has been banned
      {/* Replace Link with Button and conditional onClick */}
      <Button mt={4} onClick={handleGoHome}>
        GO HOME
      </Button>
    </Flex>
  );
};
export default CommunityNotFound;
