import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';


// Define types for navigation params
type RootStackParamList = {
  ChatRoom: {
    name: string;
    receiverId: string;
    image: string;
  };
};

// Define interface for chat item
interface ChatItem {
  _id: string;
  name: string;
  image?: string;
}

// Define interface for message
interface Message {
  message: string;
  // Add other message properties as needed
}

// Define AuthContext type
interface AuthContextType {
  userId: string;
}

const Chat: React.FC<{ item: ChatItem }> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not provided');
  }

  const { userId } = authContext;
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Use environment variable for API URL instead of hardcoded localhost
  const API_URL = 'http://localhost:8000'; // Should come from .env in production

  const fetchMessages = useCallback(async () => {
    if (!userId || !item?._id) return; // Guard clause for undefined values
    
    try {
      const response = await axios.get<Message[]>(`${API_URL}/messages`, {
        params: {
          senderId: userId,
          receiverId: item._id,
        },
      });
      
      setMessages(response.data || []); // Ensure we always set an array
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, [userId, item._id]); // Dependencies for useCallback

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const getLastMessage = useCallback((): Message | undefined => {
    return messages[messages.length - 1];
  }, [messages]);

  // Add loading state or null check for item
  if (!item) return null;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          name: item.name,
          receiverId: item._id,
          image: item.image || '',
        })
      }
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Pressable>
          <Image
            source={{ uri: item.image || 'default_image_url' }} // Fallback image
            style={styles.avatar}
            defaultSource={require('../../assets/default-avatar.png')} // Adjust path as needed
          />
        </Pressable>

        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name || 'Unknown User'}</Text>
          <Text style={styles.message}>
            {messages.length > 0 && getLastMessage()?.message
              ? getLastMessage()!.message
              : `Start chat with ${item.name}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  message: {
    marginTop: 4,
    color: 'gray',
  },
});

export default Chat;