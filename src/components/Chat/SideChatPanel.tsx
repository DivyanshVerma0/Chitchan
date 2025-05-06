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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { FaPaperPlane, FaTimes, FaEllipsisV, FaTrash, FaReply, FaSmile } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  replyTo?: string | null;
  replyToText?: string | null;
  replyToSender?: string | null;
}

interface SideChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideChatPanel: React.FC<SideChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

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
        replyTo: replyTo ? replyTo.id : null,
        replyToText: replyTo ? replyTo.text : null,
        replyToSender: replyTo ? replyTo.senderName : null,
      });
      setNewMessage('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await deleteDoc(doc(firestore, 'messages', messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReply = (msg: Message) => {
    setReplyTo(msg);
  };

  const handleReport = (msg: Message) => {
    // Placeholder for report functionality
    alert(`Reported message: ${msg.text}`);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent bg={colorMode === 'dark' ? 'dark.card' : 'white'}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" borderColor={colorMode === 'dark' ? 'dark.300' : 'gray.200'}>
          <Flex align="center">
            <Icon as={FaTimes} mr={2} cursor="pointer" onClick={onClose} />
            <Text fontSize="lg" fontWeight="bold">Global Chat</Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody p={0} overflowX="hidden">
          <VStack
            h="calc(100vh - 140px)"
            overflowY="auto"
            overflowX="hidden"
            p={4}
            spacing={6}
            align="stretch"
          >
            {messages.map((message) => {
              const isOwn = message.senderId === user?.uid;
              return (
                <Flex
                  key={message.id}
                  align="flex-start"
                  gap={3}
                >
                  <Avatar
                    size="sm"
                    name={message.senderName}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderName}`}
                    mt={message.replyTo ? 5 : 0}
                  />
                  <Box flex="1">
                    {message.replyTo && (
                      <Box mb={1} p={1} borderLeft="2px solid" borderColor={"gray.300"} bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'} borderRadius="md" maxW="90%">
                        <Text fontSize="xs" color={colorMode === 'dark' ? 'gray.400' : 'gray.500'} noOfLines={1}>
                          Replying to {message.replyToSender || 'someone'}: {message.replyToText}
                        </Text>
                      </Box>
                    )}
                    <Flex
                      maxW="100%"
                      bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
                      color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}
                      p={2}
                      borderRadius="md"
                      flexDirection="column"
                      alignItems="flex-start"
                      boxShadow={isOwn ? 'md' : undefined}
                      position="relative"
                    >
                      <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}>{message.text}</Text>
                      <Flex mt={1} align="center" gap={2}>
                        <Text fontSize="xs" color={colorMode === 'dark' ? 'gray.500' : 'gray.400'}>{message.senderName}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  {isOwn && (
                    <Flex align="center" gap={1} ml={2}>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FaEllipsisV />}
                          variant="ghost"
                          size="sm"
                          aria-label="Options"
                        />
                        <MenuList>
                          <MenuItem icon={<FaTrash />} onClick={() => deleteMessage(message.id)}>
                            Delete
                          </MenuItem>
                          <MenuItem icon={<FaReply />} onClick={() => handleReport(message)}>
                            Report
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Tooltip label="Reply" placement="top">
                        <IconButton
                          icon={<FaReply />}
                          variant="ghost"
                          size="sm"
                          aria-label="Reply"
                          onClick={() => handleReply(message)}
                        />
                      </Tooltip>
                      <Tooltip label="Emoji (coming soon)" placement="top">
                        <IconButton
                          icon={<FaSmile />}
                          variant="ghost"
                          size="sm"
                          aria-label="Emoji"
                          isDisabled
                        />
                      </Tooltip>
                    </Flex>
                  )}
                </Flex>
              );
            })}
            <div ref={messagesEndRef} />
          </VStack>

          {replyTo && (
            <Box p={2} bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'} borderRadius="md" mb={2} mx={4}>
              <Flex align="center" justify="space-between">
                <Text fontSize="xs" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                  Replying to {replyTo.senderName}: {replyTo.text}
                </Text>
                <IconButton
                  aria-label="Cancel reply"
                  icon={<FaTimes />}
                  size="xs"
                  variant="ghost"
                  onClick={() => setReplyTo(null)}
                />
              </Flex>
            </Box>
          )}

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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideChatPanel; 