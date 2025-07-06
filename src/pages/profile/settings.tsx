import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { ProfileSettings } from '../../components/ProfileSettings';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProfileSettingsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box mb={8}>
        <Heading size="lg">Profile Settings</Heading>
        <Text color="gray.500" mt={2}>
          Customize your profile and preferences
        </Text>
      </Box>
      <ProfileSettings />
    </Container>
  );
} 
