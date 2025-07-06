import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ChatWindow from '../components/Chat/ChatWindow';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/clientApp';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ChatPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Container maxW="container.lg" py={8}>
      <Box>
        <ChatWindow />
      </Box>
    </Container>
  );
};

export default ChatPage; 