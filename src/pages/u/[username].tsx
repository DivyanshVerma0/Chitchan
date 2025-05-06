import React from "react";
import { Box, Flex, Text, Icon, Stack, Button, Image, useColorMode } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { GiCakeSlice } from "react-icons/gi";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { FaRedditAlien } from "react-icons/fa";
import { useUserProfile } from '../../hooks/useUserProfile';

const UserProfilePage: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { username } = router.query;
  const { getUserProfile } = useUserProfile();
  const [profile, setProfile] = React.useState<any>(null);

  // Format the user's join date
  const joinDate = user?.metadata.creationTime 
    ? format(new Date(user.metadata.creationTime), "MMMM d, yyyy")
    : null;

  React.useEffect(() => {
    async function fetchProfile() {
      const p = await getUserProfile();
      setProfile(p);
    }
    if (user) fetchProfile();
  }, [user]);

  return (
    <Flex direction="column" width="100%" maxWidth="975px" mx="auto" pt={3}>
      <Box
        mb={4} 
        p={3} 
        bg={colorMode === "dark" ? "#1A1A1B" : "gray.100"}
        color={colorMode === "dark" ? "#D7DADC" : "gray.800"}
        borderRadius="md" 
        textAlign="center"
        border="none"
      >
        {/* Empty box for spacing, or remove this Box entirely if not needed */}
      </Box>
      <Box
        bg={colorMode === "dark" ? "#1A1A1B" : "white"}
        borderRadius="4px"
        p={6}
        border="1px solid"
        borderColor={colorMode === "dark" ? "#343536" : "gray.200"}
      >
        <Flex alignItems="center" mb={6}>
          <Box
            bg={colorMode === "dark" ? "#1A1A1B" : "white"}
            borderRadius="full"
            overflow="hidden"
            mr={4}
          >
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                boxSize="80px"
                objectFit="cover"
              />
            ) : profile?.avatarURL ? (
              <Image
                src={profile.avatarURL}
                alt="Profile"
                boxSize="80px"
                objectFit="cover"
              />
            ) : (
              <Icon as={FaRedditAlien} boxSize="80px" color={colorMode === "dark" ? "#818384" : "gray.300"} p={2} />
            )}
          </Box>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={colorMode === "dark" ? "#D7DADC" : "inherit"}>
              {user?.displayName || username || user?.email?.split("@")[0]}
            </Text>
            <Flex alignItems="center" mt={1} color={colorMode === "dark" ? "#818384" : "gray.500"}>
              <Icon as={GiCakeSlice} mr={2} />
              <Text fontSize="sm">
                Cake day {joinDate}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Stack direction="row" spacing={4}>
          <Button 
            variant="outline" 
            size="sm"
            color={colorMode === "dark" ? "#D7DADC" : "inherit"}
            borderColor={colorMode === "dark" ? "#343536" : "inherit"}
            _hover={{
              bg: colorMode === "dark" ? "#272729" : "gray.50"
            }}
          >
            New Post
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            color={colorMode === "dark" ? "#D7DADC" : "inherit"}
            borderColor={colorMode === "dark" ? "#343536" : "inherit"}
            _hover={{
              bg: colorMode === "dark" ? "#272729" : "gray.50"
            }}
          >
            Share Profile
          </Button>
          {user && (
            <Button 
              variant="outline" 
              size="sm"
              color={colorMode === "dark" ? "#D7DADC" : "inherit"}
              borderColor={colorMode === "dark" ? "#343536" : "inherit"}
              _hover={{
                bg: colorMode === "dark" ? "#272729" : "gray.50"
              }}
              onClick={() => router.push("/profile/settings")}
            >
              Profile Settings
            </Button>
          )}
        </Stack>

        {/* Karma and Other Stats */}
        <Flex 
          mt={6} 
          gap={8} 
          borderTop="1px solid" 
          borderColor={colorMode === "dark" ? "#343536" : "gray.200"} 
          pt={4}
        >
          <Box>
            <Text fontWeight="bold" color={colorMode === "dark" ? "#D7DADC" : "inherit"}>Karma</Text>
            <Text color={colorMode === "dark" ? "#818384" : "gray.500"}>1</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color={colorMode === "dark" ? "#D7DADC" : "inherit"}>Cake Day</Text>
            <Text color={colorMode === "dark" ? "#818384" : "gray.500"}>{joinDate}</Text>
          </Box>
        </Flex>
      </Box>

      {/* Posts Section  */}
      <Box 
        mt={4} 
        p={4} 
        bg={colorMode === "dark" ? "#1A1A1B" : "white"} 
        borderRadius={4}
        border="1px solid"
        borderColor={colorMode === "dark" ? "#343536" : "gray.200"}
      >
        <Text fontSize="lg" fontWeight="medium" mb={4} color={colorMode === "dark" ? "#D7DADC" : "inherit"}>
          Posts
        </Text>
        <Flex direction="column" alignItems="center" py={8}>
          <Icon as={FaRedditAlien} fontSize={40} color={colorMode === "dark" ? "#818384" : "gray.300"} mb={2} />
          <Text color={colorMode === "dark" ? "#818384" : "gray.500"}>hmm... u/{username} hasn&apos;t posted anything yet</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserProfilePage; 
