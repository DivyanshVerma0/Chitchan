import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
  useColorMode,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const q = query(
      collection(firestore, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(newMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        senderId: user.uid,
        senderName: user.displayName || user.email,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Flex
      direction="column"
      h="600px"
      w="100%"
      maxW="800px"
      bg={colorMode === 'dark' ? 'dark.card' : 'white'}
      borderRadius="md"
      border="1px solid"
      borderColor={colorMode === 'dark' ? 'dark.300' : 'gray.200'}
    >
      <Box
        p={4}
        borderBottom="1px solid"
        borderColor={colorMode === 'dark' ? 'dark.300' : 'gray.200'}
      >
        <Text fontSize="lg" fontWeight="bold">
          Global Chat
        </Text>
      </Box>

      <VStack
        flex={1}
        overflowY="auto"
        p={4}
        spacing={4}
        align="stretch"
      >
        {messages.map((message) => (
          <Flex
            key={message.id}
            justify={message.senderId === user?.uid ? 'flex-end' : 'flex-start'}
          >
            <Flex
              maxW="70%"
              bg={message.senderId === user?.uid ? 'blue.500' : 'gray.100'}
              color={message.senderId === user?.uid ? 'white' : 'black'}
              p={3}
              borderRadius="lg"
            >
              {message.senderId !== user?.uid && (
                <Avatar
                  size="sm"
                  name={message.senderName}
                  mr={2}
                />
              )}
              <Box>
                {message.senderId !== user?.uid && (
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {message.senderName}
                  </Text>
                )}
                <Text>{message.text}</Text>
              </Box>
            </Flex>
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      <Box p={4} borderTop="1px solid" borderColor={colorMode === 'dark' ? 'dark.300' : 'gray.200'}>
        <form onSubmit={sendMessage}>
          <Flex>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              mr={2}
              bg={colorMode === 'dark' ? 'dark.300' : 'gray.50'}
            />
            <Button
              type="submit"
              colorScheme="blue"
              leftIcon={<Icon as={FaPaperPlane} />}
            >
              Send
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default ChatWindow; 